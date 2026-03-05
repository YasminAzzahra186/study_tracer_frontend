import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Image as ImageIcon, Loader2, ChevronDown, Search } from 'lucide-react';
import SmoothDropdown from '../admin/SmoothDropdown'; // Sesuaikan path jika berbeda

export default function TambahLowongan({ isOpen, onClose, onSuccess, editJob = null }) {
  const isEditMode = !!editJob;

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5);
  };

  const [formData, setFormData] = useState({
    judul: '',
    perusahaan: '',
    tanggal_berakhir: '',
    deskripsi: '',
    tipe_pekerjaan: '',
    lokasi: '',
    foto: null,
    id_provinsi: '',
    id_kota: '',
    jam_mulai: '',
    jam_berakhir: '',
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [minDate, setMinDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // --- DATA STATIS (DUMMY) ---
  const [provinsiList] = useState([
    { id: '1', nama: 'Jawa Timur' },
    { id: '2', nama: 'Jawa Tengah' },
    { id: '3', nama: 'DKI Jakarta' }
  ]);
  const [kotaList, setKotaList] = useState([]);
  const [loadingKota, setLoadingKota] = useState(false);

  const [skillsList] = useState([
    { id: 1, nama: 'JavaScript' },
    { id: 2, nama: 'React JS' },
    { id: 3, nama: 'UI/UX Design' },
    { id: 4, nama: 'Laravel' },
    { id: 5, nama: 'Python' }
  ]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillSearch, setSkillSearch] = useState('');
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const skillDropdownRef = useRef(null);

  // Set Minimum Date
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    setMinDate(today.toISOString().split('T')[0]);

    const handleClickOutside = (e) => {
      if (skillDropdownRef.current && !skillDropdownRef.current.contains(e.target)) {
        setShowSkillDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sinkronisasi Form Saat Buka Modal
  useEffect(() => {
    if (editJob && isOpen) {
      setFormData({
        judul: editJob.judul || '',
        perusahaan: editJob.perusahaan?.nama || editJob.nama_perusahaan || '',
        tanggal_berakhir: editJob.lowongan_selesai || '',
        deskripsi: editJob.deskripsi || '',
        tipe_pekerjaan: editJob.tipe_pekerjaan || '',
        lokasi: editJob.lokasi || '',
        foto: null,
        id_provinsi: editJob.id_provinsi ? String(editJob.id_provinsi) : '',
        id_kota: editJob.id_kota ? String(editJob.id_kota) : '',
        jam_mulai: formatTime(editJob.jam_mulai),
        jam_berakhir: formatTime(editJob.jam_berakhir),
      });
      setPreviewUrl(editJob.foto ? `http://localhost:8000/storage/${editJob.foto}` : null); // Asumsi path
      if (editJob.skills && Array.isArray(editJob.skills)) {
        setSelectedSkills(editJob.skills.map(s => ({ id: s.id, nama: s.nama })));
      }
      setErrors({});
    } else if (!editJob && isOpen) {
      setFormData({
        judul: '', perusahaan: '', tanggal_berakhir: '', deskripsi: '',
        tipe_pekerjaan: '', lokasi: '', foto: null, id_provinsi: '', id_kota: '',
        jam_mulai: '', jam_berakhir: '',
      });
      setSelectedSkills([]);
      setPreviewUrl(null);
      setErrors({});
    }
  }, [editJob, isOpen]);

  // Simulasi Ambil Data Kota Berdasarkan Provinsi
  useEffect(() => {
    if (!formData.id_provinsi) {
      setKotaList([]);
      return;
    }
    setLoadingKota(true);
    setTimeout(() => {
      if (formData.id_provinsi === '1') {
        setKotaList([{ id: '101', nama: 'Surabaya' }, { id: '102', nama: 'Malang' }]);
      } else if (formData.id_provinsi === '3') {
        setKotaList([{ id: '301', nama: 'Jakarta Selatan' }, { id: '302', nama: 'Jakarta Pusat' }]);
      } else {
        setKotaList([{ id: '201', nama: 'Semarang' }]);
      }
      setLoadingKota(false);
    }, 500);
  }, [formData.id_provinsi]);

  // Skill Helpers
  const filteredSkills = skillsList.filter(s => 
    s.nama.toLowerCase().includes(skillSearch.toLowerCase()) && 
    !selectedSkills.some(sel => sel.id === s.id)
  );

  const addSkill = (skill) => {
    setSelectedSkills(prev => [...prev, skill]);
    setSkillSearch('');
    setShowSkillDropdown(false);
  };

  const removeSkill = (skillId) => {
    setSelectedSkills(prev => prev.filter(s => s.id !== skillId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData({ ...formData, foto: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else if (file) {
      alert("File terlalu besar (Maks 2MB)");
    }
  };

  // Simulasi Submit
  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      console.log("Data Disimpan (Statis):", formData, "Skills:", selectedSkills);
      setSubmitting(false);
      onSuccess(); // Refresh tabel di belakang
      onClose(); // Tutup modal
      alert(`Lowongan berhasil ${isEditMode ? 'diperbarui' : 'ditambahkan'} (Statis)`);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-black text-[#3C5759] tracking-tight">
            {isEditMode ? 'Edit Lowongan Kerja' : 'Pasang Lowongan Kerja'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors cursor-pointer">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Upload Foto */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-[#3C5759]/40 uppercase tracking-widest">Gambar / Banner (Opsional)</label>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-gray-200 overflow-hidden shadow-sm shrink-0">
                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" /> : <ImageIcon size={32} className="text-gray-300" />}
              </div>
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <p className="text-xs text-gray-500 font-medium">Silakan unggah gambar persegi, ukuran maks 2MB.</p>
                <label className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer hover:bg-slate-50 transition-all text-sm shadow-sm inline-block">
                  Pilih File
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[11px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2 block">Job Title *</label>
              <input name="judul" value={formData.judul} onChange={handleInputChange} placeholder="Contoh: Senior Product Designer" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#3C5759]/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[11px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2 block">Nama Perusahaan *</label>
                <input name="perusahaan" value={formData.perusahaan} onChange={handleInputChange} placeholder="PT. Contoh Sukses" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#3C5759]/20" />
              </div>
              <div>
                <label className="text-[11px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2 block">Tanggal Berakhir</label>
                <input type="date" name="tanggal_berakhir" value={formData.tanggal_berakhir} min={minDate} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#3C5759]/20" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[11px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2 block">Jam Mulai</label>
                <input type="time" name="jam_mulai" value={formData.jam_mulai} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#3C5759]/20" />
              </div>
              <div>
                <label className="text-[11px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2 block">Jam Berakhir</label>
                <input type="time" name="jam_berakhir" value={formData.jam_berakhir} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#3C5759]/20" />
              </div>
            </div>

            <div className="relative z-[60]">
              <label className="text-[11px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2 block">
                Tipe Pekerjaan
              </label>
              {/* Cukup gunakan w-full, hapus bg, border, dan shadow di sini */}
              <div className="w-full">
                <SmoothDropdown
                  isSearchable={false}
                  placeholder="-- Pilih Tipe --"
                  options={['Full-time', 'Part-time', 'Freelance', 'Internship', 'Contract']}
                  value={formData.tipe_pekerjaan}
                  onSelect={(val) => {
                    setFormData(prev => ({ ...prev, tipe_pekerjaan: val }));
                  }}
                />
              </div>
            </div>

            {/* Area Lokasi dengan SmoothDropdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-50">
              <div className="w-full rounded-xl">
                <SmoothDropdown
                  label="Provinsi"
                  isSearchable={true}
                  placeholder="Pilih Provinsi"
                  options={provinsiList.map(p => p.nama)}
                  value={provinsiList.find(p => String(p.id) === String(formData.id_provinsi))?.nama || ""}
                  onSelect={(namaProv) => {
                    const prov = provinsiList.find(p => p.nama === namaProv);
                    if (prov) setFormData({ ...formData, id_provinsi: String(prov.id), id_kota: '' });
                  }}
                />
              </div>
              <div className="w-full rounded-xl">
                <SmoothDropdown
                  label="Kota"
                  isSearchable={true}
                  placeholder={!formData.id_provinsi ? "Pilih provinsi dulu" : loadingKota ? "Memuat..." : "Pilih Kota"}
                  options={kotaList.map(k => k.nama)}
                  value={kotaList.find(k => String(k.id) === String(formData.id_kota))?.nama || ""}
                  onSelect={(namaKota) => {
                    const kota = kotaList.find(k => k.nama === namaKota);
                    if (kota) setFormData({ ...formData, id_kota: String(kota.id) });
                  }}
                />
              </div>
            </div>

            {/* Bagian Skills */}
            <div className="relative z-40" ref={skillDropdownRef}>
              <label className="text-[11px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2 block">
                Skills <span className="normal-case opacity-70">(Opsional)</span>
              </label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedSkills.map(skill => (
                  <span key={skill.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3C5759]/5 text-[#3C5759] text-xs font-bold rounded-lg border border-[#3C5759]/10">
                    {skill.nama}
                    <button type="button" onClick={() => removeSkill(skill.id)} className="hover:text-red-500 cursor-pointer ml-1"><X size={14} /></button>
                  </span>
                ))}
              </div>

              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={skillSearch}
                  onChange={(e) => { setSkillSearch(e.target.value); setShowSkillDropdown(true); }}
                  onFocus={() => setShowSkillDropdown(true)}
                  placeholder="Cari dan pilih skill..."
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#3C5759]/20 outline-none"
                />
                {showSkillDropdown && (
                  <div className="absolute z-50 top-[105%] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto py-2">
                    {filteredSkills.length > 0 ? filteredSkills.map(s => (
                      <div key={s.id} onClick={() => addSkill(s)} className="px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-slate-50 hover:text-[#3C5759]">
                        {s.nama}
                      </div>
                    )) : <div className="px-4 py-3 text-xs text-gray-400 italic text-center">Skill tidak ditemukan</div>}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2 block">Deskripsi & Kualifikasi Pekerjaan</label>
              <textarea name="deskripsi" rows={5} value={formData.deskripsi} onChange={handleInputChange} placeholder="Jelaskan peran, tanggung jawab..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#3C5759]/20 resize-none" />
            </div>

          </div>
        </div>

        {/* Footer Modal / Tombol Aksi */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-4 bg-white sticky bottom-0 z-10 rounded-b-3xl">
          <button onClick={onClose} disabled={submitting} className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm cursor-pointer">
            Batal
          </button>
          <button onClick={handleSubmit} disabled={submitting || !formData.judul || !formData.perusahaan} className="flex items-center gap-2 px-8 py-3 bg-[#3C5759] text-white font-bold rounded-xl hover:bg-[#2A3E3F] transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer text-sm">
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <>{isEditMode ? 'Simpan' : 'Kirim'} <Send size={16} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}