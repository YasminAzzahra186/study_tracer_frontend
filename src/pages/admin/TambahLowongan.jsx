import React, { useState, useEffect } from 'react';
import { X, Send, Image as ImageIcon } from 'lucide-react';

const TambahLowongan = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    judul: '',
    perusahaan: '',
    tanggal_berakhir: '',
    deskripsi: '',
    foto: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [minDate, setMinDate] = useState('');

  // Set minimal tanggal adalah besok
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    setMinDate(today.toISOString().split('T')[0]);
  }, []);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData({ ...formData, foto: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else if (file) {
      alert("File terlalu besar (Maks 2MB)");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-[#3C5759]">Pasang Lowongan Kerja</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          
          {/* Section Upload Foto - Responsif Stacked on Mobile */}
          <div className="space-y-3">
            <span className="text-sm font-bold text-slate-700">Gambar / Banner <span className="text-gray-400 font-normal">(opsional)</span></span>
            
            {/* Flex-col untuk mobile (stack), sm:flex-row untuk desktop (menyamping) */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/30">
              
              {/* Box Preview - Paling Atas di Mobile */}
              <div className="w-32 h-32 sm:w-24 sm:h-24 bg-white rounded-xl flex items-center justify-center border border-gray-200 overflow-hidden shadow-sm shrink-0">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-gray-300" />
                )}
              </div>

              {/* Input File - Di bawah preview pada mobile */}
              <div className="flex-1 flex flex-col items-center sm:items-start space-y-3 text-center sm:text-left">
                <p className="text-xs text-gray-500 italic">Silakan unggah gambar persegi, ukuran kurang dari 2MB.</p>
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <label className="px-6 py-2 border-2 border-[#3C5759] text-[#3C5759] font-bold rounded-xl cursor-pointer hover:bg-[#3C5759] hover:text-white transition-all text-sm">
                    Pilih File
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                  <span className="text-[11px] text-gray-400 truncate max-w-[200px]">
                    {formData.foto ? formData.foto.name : "Tidak ada file dipilih"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Job Title <span className="text-red-500">*</span></label>
              <input 
                name="judul"
                type="text" 
                placeholder="Contoh: Senior Product Designer"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3C5759]/20 focus:border-[#3C5759] outline-none transition-all"
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nama Perusahaan <span className="text-red-500">*</span></label>
                <input 
                  name="perusahaan"
                  type="text" 
                  placeholder="Nama Perusahaan"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3C5759]/20 outline-none transition-all"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tanggal Lowongan Berakhir <span className="text-red-500">*</span></label>
                <input 
                  name="tanggal_berakhir"
                  type="date" 
                  min={minDate}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3C5759]/20 outline-none transition-all text-gray-600"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Deskripsi Pekerjaan <span className="text-red-500">*</span></label>
              <textarea 
                name="deskripsi"
                rows={4}
                placeholder="Deskripsi peran, responsibilitas dan detail rekuirement"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3C5759]/20 outline-none transition-all resize-none min-h-[120px]"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end items-center gap-4 bg-gray-50/50">
          <button onClick={onClose} className="text-sm font-bold text-gray-500 hover:text-gray-700 px-4">Batal</button>
          <button className="flex items-center gap-2 px-8 py-3 bg-[#3C5759] text-white font-bold rounded-2xl hover:bg-[#2e4344] transition-all shadow-lg shadow-[#3C5759]/20 active:scale-95">
            Kirim <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahLowongan;