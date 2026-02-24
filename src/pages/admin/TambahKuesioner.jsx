import React, { useState } from "react";
import {
  Eye,
  Save,
  X,
  Plus,
  FileQuestionMark,
  ArrowLeft,
} from "lucide-react";
import SmoothDropdown from "../../components/admin/SmoothDropdown";
import { Link } from "react-router-dom";

export default function TambahPertanyaan() {
  // 1. State untuk kategori yang dipilih (Default: Bekerja)
  const [selectedCategory, setSelectedCategory] = useState("Bekerja");

  const [options, setOptions] = useState([
    "Bekerja Penuh Waktu",
    "Tidak Bekerja"
  ]);

  // Data mapping untuk judul pertanyaan berdasarkan kategori
  const structureData = {
    "Bekerja": [
      { id: 1, label: "Status Pekerjaan", active: true },
      { id: 2, label: "Relevansi Pekerjaan", active: false },
      { id: 3, label: "Rentang Gaji", active: false },
    ],
    "Kuliah": [
      { id: 1, label: "Nama Perguruan Tinggi", active: true },
      { id: 2, label: "Program Studi", active: false },
      { id: 3, label: "Linearitas Studi", active: false },
    ],
    "Wirausaha": [
      { id: 1, label: "Bidang Usaha", active: true },
      { id: 2, label: "Omzet Bulanan", active: false },
      { id: 3, label: "Jumlah Karyawan", active: false },
    ],
    "Cari Kerja": [
      { id: 1, label: "Lama Mencari Kerja", active: true },
      { id: 2, label: "Kendala Utama", active: false },
    ]
  };

  const addOption = () => setOptions([...options, ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  console.log(selectedCategory)

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans text-slate-700">
      <div>
        <Link
          to="/wb-admin/kuisoner"
          className="flex items-center gap-2 text-third hover:text-primary transition-colors mb-8 text-sm font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Kembali
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-[#3D5A5C] font-bold">
            <FileQuestionMark size={20} />
            <h2>Pembuatan Kuesioner</h2>
          </div>
          <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Mode Draft
          </span>
        </div>

        <div className="grid grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="col-span-8 space-y-6">
            <div>
              {/* Tambahkan onChange pada SmoothDropdown */}
              <SmoothDropdown
                label="Kategori Status Karier"
                options={Object.keys(structureData)}
                placeholder="Pilih status karier"
                isRequired={true}
                value={selectedCategory}
                onSelect={(val) => setSelectedCategory(val)}
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-secondary uppercase">
                Pertanyaan <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="masukan pertanyaan kuisoner.."
                rows={4}
                className="mt-2 w-full p-3 bg-white border border-fourth rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <SmoothDropdown
                label="Judul Pertanyaan"
                options={["Riwayat Pekerjaan", "Identitas Diri"]}
                placeholder="Pilih judul bagian"
                isRequired={true}
              />
            </div>

            <div className="bg-slate-50/50 border border-dashed border-gray-200 rounded-2xl p-6">
              <label className="block text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.15em]">
                Opsi Jawaban
              </label>
              <div className="space-y-3">
                {options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-3 group animate-in fade-in slide-in-from-top-1">
                    <div className="w-5 h-5 border-2 border-slate-300 rounded-full flex-shrink-0" />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Opsi ${idx + 1}`}
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:border-[#3D5A5C] focus:outline-none transition-colors"
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(idx)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addOption}
                className="mt-6 flex items-center gap-2 text-[#3D5A5C] font-bold text-xs hover:bg-[#3D5A5C] hover:text-white px-3 py-2 rounded-lg border border-[#3D5A5C] transition-all"
              >
                <Plus size={16} /> Tambahkan Opsi
              </button>
            </div>
          </div>

          {/* Right Column: Structure (Dinamis berdasarkan selectedCategory) */}
          <div className="col-span-4 border-l border-gray-100 pl-8">
            <h3 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-wider">
              Structure: {selectedCategory}
            </h3>
            <div className="space-y-3">
              {/* Merender data berdasarkan kategori yang dipilih */}
              {(structureData[selectedCategory] || []).map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    item.active
                    ? "bg-slate-50 border-[#3D5A5C]/20 shadow-sm"
                    : "bg-white border-gray-100 opacity-60"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    item.active ? "bg-[#3D5A5C] text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                    {item.id}
                  </span>
                  <span className={`text-sm font-bold ${item.active ? "text-[#3D5A5C]" : "text-slate-500"}`}>
                    {item.label}
                  </span>
                </div>
              ))}

              <button className="w-full mt-4 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold text-xs hover:border-[#3D5A5C] hover:text-[#3D5A5C] transition-all group">
                <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                Tambah Pertanyaan Baru
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all">
              <Eye size={18} /> Pratinjau
            </button>
            <button className="flex items-center gap-2 px-8 py-2.5 bg-[#3D5A5C] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#2D4345] transition-all">
              <Save size={18} /> Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
