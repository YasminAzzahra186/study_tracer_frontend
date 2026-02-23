import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Store, Search, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import SmoothDropdown from '../../components/admin/SmoothDropdown';
import InputDropdownEdit from '../../components/InputDropdownEdit';
import YearsInput from '../../components/YearsInput';
import LocationSelector from '../../components/LocationSelector';
import UniversitySelector from '../../components/UniversitasSelector';
import { masterDataApi } from '../../api/masterData';

export default function Step3Status({ onBack, formData, updateFormData, onSubmit, loading }) {
  const [selectedStatus, setSelectedStatus] = useState('Bekerja');
  const [statusList, setStatusList] = useState([]);
  const [bidangUsahaList, setBidangUsahaList] = useState([]);
  const [bidangUsahaMap, setBidangUsahaMap] = useState({});

  // Local state for career sub-forms
  const [pekerjaan, setPekerjaan] = useState({ posisi: '', nama_perusahaan: '', id_kota: '', jalan: '' });
  const [universitas, setUniversitas] = useState({ nama_universitas: '', id_jurusanKuliah: '', jalur_masuk: '', jenjang: '' });
  const [wirausaha, setWirausaha] = useState({ id_bidang: '', nama_usaha: '' });
  const [tahunMulai, setTahunMulai] = useState('');
  const [tahunSelesai, setTahunSelesai] = useState('');

  // Fetch status and bidang usaha from API
  useEffect(() => {
    masterDataApi.getStatus()
      .then((res) => setStatusList(res.data.data || []))
      .catch(() => {});
    masterDataApi.getBidangUsaha()
      .then((res) => {
        const data = res.data.data || [];
        setBidangUsahaList(data.map((b) => b.nama_bidang || b.nama));
        const map = {};
        data.forEach((b) => { map[b.nama_bidang || b.nama] = b.id; });
        setBidangUsahaMap(map);
      })
      .catch(() => {});
  }, []);

  const statusOptions = [
    { id: 'Bekerja', label: 'Bekerja', sub: '(Working)', icon: Briefcase },
    { id: 'Kuliah', label: 'Kuliah', sub: '(Studying)', icon: GraduationCap },
    { id: 'Wirausaha', label: 'Wirausaha', sub: '(Entrepreneur)', icon: Store },
    { id: 'Mencari Kerja', label: 'Mencari Kerja', sub: '(Unemployed)', icon: Search },
  ];

  const handleFinish = () => {
    // Find the matching status id from API data
    const matched = statusList.find((s) => (s.nama_status || s.nama) === selectedStatus);
    const id_status = matched?.id || '';

    const updates = {
      id_status,
      tahun_mulai: tahunMulai,
      tahun_selesai: tahunSelesai,
      pekerjaan: null,
      universitas: null,
      wirausaha: null,
    };

    if (selectedStatus === 'Bekerja') {
      updates.pekerjaan = pekerjaan;
    } else if (selectedStatus === 'Kuliah') {
      updates.universitas = universitas;
    } else if (selectedStatus === 'Wirausaha') {
      updates.wirausaha = wirausaha;
    }

    updateFormData(updates);
    // Use setTimeout to allow state to propagate before submit
    setTimeout(() => onSubmit(), 0);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h3 className="font-bold text-primary mb-1">Seperti apa karir anda sekarang? <span className="text-red-500">*</span></h3>
      </div>

      {/* Cards Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedStatus(option.id)}
            className={`relative p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedStatus === option.id
              ? 'border-primary bg-fourth/20 border-dashed'
              : 'border-fourth border-dashed hover:border-primary/40'
            }`}
          >
            {selectedStatus === option.id && (
              <div className="absolute top-2 right-2 text-primary">
                <CheckCircle size={16} fill="currentColor" className="text-white fill-primary" />
              </div>
            )}
            <option.icon size={28} className={selectedStatus === option.id ? 'text-primary' : 'text-third'} />
            <div className="text-center">
              <p className={`text-sm font-bold ${selectedStatus === option.id ? 'text-primary' : 'text-secondary'}`}>{option.label}</p>
              <p className="text-[10px] text-third">{option.sub}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Dynamic Form based on Selection */}
      <div className="p-4 md:p-8 border border-third border-dashed rounded-2xl bg-gray-50/50">
        {selectedStatus === 'Bekerja' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

            {/* Nama Pekerjaan*/}
            <div className="space-y-1">
              <InputDropdownEdit
                label="Pekerjaan Sekarang"
                options={["UI/UX", "DevOps", "Cloud Engginering", "Karyawan"]}
                placeholder="Masukkan nama pekerjaan anda"
                isRequired={true}
                onSelect={(val) => setPekerjaan((p) => ({ ...p, posisi: val }))}
              />
            </div>

            {/* Nama Perusahaan*/}
            <div className="space-y-1">
              <InputDropdownEdit
                label="Nama Perusahaan"
                options={["Hummatech", "Pertamina", "Telkom", "PT. Ardhi Jaya"]}
                placeholder="Masukkan nama perusahaan "
                isRequired={true}
                onSelect={(val) => setPekerjaan((p) => ({ ...p, nama_perusahaan: val }))}
              />
            </div>

            {/* Tahun Mulai*/}
            <div className="space-y-1">
              <YearsInput label={"Tahun Masuk"} isRequired={ true } onSelect={(val) => setTahunMulai(val)} />
            </div>

            {/* Tahun Selesai */}
            <div className="space-y-1 ">
              <YearsInput label={"Tahun Selesai"} text='(opsional jika sudah selesai)' onSelect={(val) => setTahunSelesai(val)} />
            </div>

            {/* Nama Provinsi */}
            <div className='space-y-1 md:col-span-2'>
              <LocationSelector onCitySelect={(cityId) => setPekerjaan((p) => ({ ...p, id_kota: cityId }))} />
            </div>

            {/* Nama Kota*/}
            <div className='space-y-1'></div>
          </div>
        )}

        {selectedStatus === 'Kuliah' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Univ dan jurusan*/}
            <div className="space-y-1 md:col-span-2">
              <UniversitySelector
                onUnivSelect={(val) => setUniversitas((u) => ({ ...u, nama_universitas: val }))}
                onJurusanSelect={(val) => setUniversitas((u) => ({ ...u, id_jurusanKuliah: val }))}
              />
            </div>

            {/* Jalur Masuk */}
            <div className="space-y-1">
              <SmoothDropdown
                label="Jalur Masuk Kuliah"
                options={["SNBP", "SNBT", "Mandiri", "Beasiswa", "lainnya"]}
                placeholder="Masukan jalur masuk kuliah anda"
                isRequired={true}
                onSelect={(val) => setUniversitas((u) => ({ ...u, jalur_masuk: val }))}
              />
            </div>

            {/* Jenjang*/}
            <div className="space-y-1">
              <SmoothDropdown
                label="Jenjang Kuliah"
                options={["D3", "D4", "S1", "S2", "S3"]}
                placeholder="Masukan jenjang kuliah anda"
                isRequired={true}
                onSelect={(val) => setUniversitas((u) => ({ ...u, jenjang: val }))}
              />
            </div>

            {/* Tahun Mulai*/}
            <div className="space-y-1">
              <YearsInput label={"Tahun Masuk"} isRequired={ true } onSelect={(val) => setTahunMulai(val)} />
            </div>

            {/* Tahun Selesai */}
            <div className="space-y-1 ">
              <YearsInput label={"Tahun Lulus"} text='(opsional jika sudah lulus)' onSelect={(val) => setTahunSelesai(val)} />
            </div>
          </div>
        )}

        {selectedStatus === 'Wirausaha' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Nama Usaha */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-secondary uppercase">
                Nama Usaha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukan nama usaha anda"
                value={wirausaha.nama_usaha}
                onChange={(e) => setWirausaha((w) => ({ ...w, nama_usaha: e.target.value }))}
                className="mt-2 w-full p-3 bg-white border border-fourth rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Bidang Usaha */}
            <div className="space-y-1">
              <SmoothDropdown
                label="Bidang Usaha"
                options={bidangUsahaList.length > 0 ? bidangUsahaList : ["Perdagangan", "Kuliner", "Digital/Teknologi", "Produksi/Manufaktur", "Lainnya"]}
                placeholder="Masukan bidang usaha anda"
                isRequired={true}
                onSelect={(val) => setWirausaha((w) => ({ ...w, id_bidang: bidangUsahaMap[val] || val }))}
              />
            </div>

            {/* Tahun Mulai*/}
            <div className="space-y-1">
              <YearsInput label={"Tahun Mulai"} isRequired={ true } onSelect={(val) => setTahunMulai(val)} />
            </div>

            {/* Tahun Selesai */}
            <div className="space-y-1 ">
              <YearsInput label={"Tahun Berakhir"} text='(opsional jika sudah berakhir)' onSelect={(val) => setTahunSelesai(val)} />
            </div>
          </div>
        )}

        {selectedStatus === 'Mencari Kerja' && (
          <p className="text-center text-sm text-third py-4 italic">Semangat! Tetaplah berusaha dan tingkatkan skill Anda.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 md:px-6 py-2 border border-fourth rounded-xl text-xs md:text-sm font-bold text-secondary hover:bg-fourth transition-all cursor-pointer"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
        <button
          disabled={loading}
          onClick={handleFinish}
          className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-xs md:text-sm font-bold hover:opacity-90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Memproses...
            </>
          ) : (
            <>
              <CheckCircle size={18} /> Selesai
            </>
          )}
        </button>
      </div>
    </div>
  );
}
