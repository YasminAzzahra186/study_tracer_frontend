import React, { useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  GripVertical,
  EyeOff,
  Archive,
  ListChecks,
  Ghost // Ikon untuk hidden
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function KuisonerManage() {
  const [filter, setFilter] = useState("Semua");
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    {
      id: "Q1",
      type: "Pilihan Tunggal",
      status: "TERLIHAT",
      text: "Apa status pekerjaan Anda saat ini?",
      options: "Opsi: Bekerja Paruh Waktu, Bekerja Penuh Waktu...",
      category: "Bekerja",
    },
    {
      id: "Q2",
      type: "Pilihan Ganda",
      status: "TERLIHAT",
      text: "Manakah dari keterampilan berikut yang paling relevan dengan pekerjaan Anda saat ini?",
      options: "Opsi: Berpikir Kritis, Komunikasi, Teknologi...",
      category: "Bekerja",
    },
    {
      id: "Q3",
      type: "TERSEMBUNYI",
      status: "TERSEMBUNYI",
      text: "Nilai relevansi program studi Anda dengan karier Anda saat ini",
      options: "Skala: 1 (Tidak Relevan) hingga 5 (Sangat Relevan)",
      category: "Kuliah",
    },
    {
      id: "Q4",
      type: "Teks Pendek",
      status: "DRAF",
      text: "Please specify your job title.",
      options: "Open ended response",
      category: "Bekerja",
    },
  ]);

  // Fungsi Aksi
  const updateStatus = (id, newStatus) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Statistik
  const hiddenCount = questions.filter((q) => q.status === "TERSEMBUNYI").length;
  const draftCount = questions.filter((q) => q.status === "DRAF").length;
  const activeCount = questions.filter((q) => q.status === "TERLIHAT").length;

  const categories = ["Semua", "Kuisoner Bekerja", "Kuisoner Kuliah", "Kuisoner Wirausaha", "Kuisoner Pencari Kerja"];

  // LOGIKA FILTER DIPERBARUI
  const filteredQuestions = questions.filter((q) => {
    if (filter === "Draf") return q.status === "DRAF";
    if (filter === "Tersembunyi") return q.status === "TERSEMBUNYI"; // Tambahan Logika
    if (filter === "Semua") return true;
    return filter.includes(q.category);
  });

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen font-sans text-slate-700">
      
      {/* HEADER SECTION (POSISI KIRI) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
        <button 
          onClick={() => navigate("/wb-admin/kuisoner/tambah-pertanyaan")} 
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#3C5759] text-white rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#3C5759]/20"
        >
          <Plus size={18} /> Tambah Pertanyaan
        </button>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
          <Eye size={18} /> Lihat Jawaban
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Total Pertanyaan</p>
          <p className="text-3xl font-black text-slate-800">{questions.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm border-b-4 border-b-green-500">
          <p className="text-[10px] font-black text-green-600 uppercase tracking-wider mb-1">Aktif</p>
          <p className="text-3xl font-black text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm border-b-4 border-b-orange-400">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-wider mb-1">Draf</p>
          <p className="text-3xl font-black text-orange-500">{draftCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm border-b-4 border-b-slate-400">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Disembunyikan</p>
          <p className="text-3xl font-black text-slate-600">{hiddenCount}</p>
        </div>
      </div>

      {/* Filter & Action Buttons Group */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        
        {/* Kategori Filter (Scrollable) */}
        <div className="flex gap-2 overflow-x-auto pb-2 w-full lg:w-auto no-scrollbar mask-gradient">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                filter === cat 
                  ? "bg-[#3C5759] text-white border-[#3C5759] shadow-md" 
                  : "bg-white text-slate-500 border-gray-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Tombol Draf & Tersembunyi */}
        <div className="flex gap-2 self-end lg:self-auto w-full sm:w-auto overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          {/* Tombol Lihat Tersembunyi */}
          <button
            onClick={() => setFilter("Tersembunyi")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${
              filter === "Tersembunyi" 
                ? "bg-slate-600 text-white border-slate-600 shadow-md" 
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <EyeOff size={14} /> Tersembunyi ({hiddenCount})
          </button>

          {/* Tombol Lihat Draf */}
          <button
            onClick={() => setFilter("Draf")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${
              filter === "Draf" 
                ? "bg-orange-500 text-white border-orange-500 shadow-md" 
                : "bg-white text-orange-600 border-orange-200 hover:bg-orange-50"
            }`}
          >
            <Archive size={14} /> Draf ({draftCount})
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div
              key={q.id}
              className={`group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-4 relative overflow-hidden ${
                q.status === "TERLIHAT" ? "border-l-4 border-l-[#3C5759]" : q.status === "DRAF" ? "border-l-4 border-l-orange-400" : "border-l-4 border-l-slate-300 bg-slate-50/50"
              }`}
            >
              <div className="hidden sm:block pt-1 cursor-grab text-slate-300 hover:text-slate-500">
                <GripVertical size={20} />
              </div>

              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                    <ListChecks size={12} />
                    {q.type}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                    q.status === "TERLIHAT" ? "bg-green-100 text-green-700" : q.status === "DRAF" ? "bg-orange-100 text-orange-700" : "bg-slate-200 text-slate-600"
                  }`}>
                    {q.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-base mb-1">{q.text}</h4>
                <p className="text-xs text-slate-500 font-medium bg-slate-50 inline-block px-2 py-1 rounded border border-slate-100">{q.options}</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0 mt-2 sm:mt-0">
                <button className="p-2 text-slate-400 hover:text-[#3C5759] hover:bg-[#3C5759]/10 rounded-lg transition-all" title="Edit">
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => updateStatus(q.id, q.status === "TERSEMBUNYI" ? "TERLIHAT" : "TERSEMBUNYI")}
                  className={`p-2 rounded-lg transition-all ${q.status === "TERSEMBUNYI" ? "text-blue-600 bg-blue-50 hover:bg-blue-100" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
                  title={q.status === "TERSEMBUNYI" ? "Tampilkan" : "Sembunyikan"}
                >
                  {q.status === "TERSEMBUNYI" ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty State jika tidak ada data */
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <Ghost size={48} className="mx-auto text-slate-200 mb-3" />
            <p className="text-slate-400 font-medium text-sm">Tidak ada pertanyaan dalam kategori ini.</p>
          </div>
        )}

        <button 
            onClick={() => navigate("/wb-admin/kuisoner/tambah-pertanyaan")}
            className="w-full py-8 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-[#3C5759] hover:text-[#3C5759] hover:bg-white transition-all group"
        >
          <div className="p-3 bg-slate-100 rounded-full group-hover:bg-[#3C5759] group-hover:text-white transition-colors">
             <Plus size={24} />
          </div>
          <span className="text-sm font-bold">Tambah Pertanyaan Lain</span>
        </button>
      </div>
    </div>
  );
}