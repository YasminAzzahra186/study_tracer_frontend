import React, { useState } from 'react';
import { X, Upload, Info, Send } from 'lucide-react';

const TambahLowongan = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-[#3C5759]">Pasang Lowongan Kerja</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <span className="text-sm font-bold text-slate-700">Gambar / Banner <span className="text-gray-400 font-normal">(opsional)</span></span>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-gray-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="m21 15-5-5L5 21"/>
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-500 italic">Silakan unggah gambar, ukuran kurang dari 100KB.</p>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 border border-[#3C5759] text-[#3C5759] font-semibold rounded-lg text-sm hover:bg-[#3C5759]/5 transition-colors">
                    Pilih File
                  </button>
                  <span className="text-sm text-gray-500">Tidak ada file dipilih</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Juduk Pekerjaan<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="Contoh: Senior Product Designer"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C5759]/20 focus:border-[#3C5759] transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Nama Perusahaan <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="Nama Perusahaan"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C5759]/20 focus:border-[#3C5759] transition-all"
              />
            </div>
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Tanggal Lowongan Berakhir <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="mm/dd/yyyy"
                className="w-full md:w-1/2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C5759]/20 focus:border-[#3C5759] transition-all"
              />
            </div>
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Deskripsi Pekerjaan <span className="text-red-500">*</span></label>
              <textarea 
                rows={5}
                placeholder="Deskripsi peran, responsibilitas dan detail rekuirement"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C5759]/20 focus:border-[#3C5759] transition-all resize-none"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
            <Info className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-600" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold">Persetujuan Diperlukan</h4>
              <p className="text-xs opacity-90 leading-relaxed">
                Semua postingan memerlukan persetujuan Admin sebelum dapat dilihat di papan pengumuman. Biasanya diproses dalam waktu 24 jam.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end items-center gap-3 bg-gray-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:bg-gray-200 rounded-xl transition-colors"
          >
            Batal
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#3C5759] text-white font-bold text-sm rounded-xl hover:bg-[#2A3F41] active:scale-95 transition-all shadow-md group">
            Kirim
            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahLowongan;
