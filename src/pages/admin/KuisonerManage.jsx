import React, { useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  GripVertical,
  EyeOff,
  Archive
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function KuisonerManage() {
  const [filter, setFilter] = useState("Semua");
  const [questions, setQuestions] = useState([
    {
      id: "Q1",
      type: "Pilihan Tunggal",
      status: "TERLIHAT", // Status bisa: TERLIHAT, TERSEMBUNYI, DRAF
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

  const filteredQuestions = questions.filter((q) => {
    if (filter === "Draf") return q.status === "DRAF";
    if (filter === "Semua") return true;
    return filter.includes(q.category);
  });

  const navigate = useNavigate()

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans text-slate-700">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-3">
          <button onClick={() => navigate("/wb-admin/kuisoner/lihat-jawaban")} className="flex items-center cursor-pointer gap-2 p-4 bg-slate-700 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm">
            <Eye size={16} /> Lihat Jawaban Alumni
          </button>
          <button onClick={() => navigate("/wb-admin/kuisoner/tambah-pertanyaan")} className="flex items-center cursor-pointer gap-2 p-4 bg-[#436163] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-sm">
            <Plus size={16} /> Tambah Pertanyaan Baru
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Pertanyaan</p>
          <p className="text-2xl font-bold text-slate-800">{questions.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-green-500 uppercase mb-1">Aktif</p>
          <p className="text-2xl font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-orange-400">
          <p className="text-[10px] font-bold text-orange-400 uppercase mb-1">Draf</p>
          <p className="text-2xl font-bold text-orange-500">{draftCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-slate-400">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Disembunyikan</p>
          <p className="text-2xl font-bold text-slate-600">{hiddenCount}</p>
        </div>
      </div>

      {/* Filter & Draft Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === cat ? "bg-slate-700 text-white shadow-md" : "bg-white text-slate-500 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setFilter("Draf")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
            filter === "Draf" ? "bg-orange-500 text-white border-orange-500" : "bg-white text-orange-500 border-orange-200 hover:bg-orange-50"
          }`}
        >
          <Archive size={14} /> Lihat Draf ({draftCount})
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className={`group bg-white rounded-xl border-l-4 p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-4 ${
              q.status === "TERLIHAT" ? "border-l-[#436163]" : q.status === "DRAF" ? "border-l-orange-400" : "border-l-slate-300 bg-slate-50/50"
            }`}
          >
            <div className="pt-1 cursor-move text-slate-300">
              <GripVertical size={20} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {q.id} • {q.type}
                </span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                  q.status === "TERLIHAT" ? "bg-green-100 text-green-600" : q.status === "DRAF" ? "bg-orange-100 text-orange-600" : "bg-slate-200 text-slate-600"
                }`}>
                  {q.status}
                </span>
              </div>
              <h4 className="font-bold text-slate-700 mb-1">{q.text}</h4>
              <p className="text-xs text-slate-400 italic">{q.options}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* EDIT */}
              <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                <Pencil size={18} />
              </button>

              {/* HIDE / SHOW */}
              <button
                onClick={() => updateStatus(q.id, q.status === "TERSEMBUNYI" ? "TERLIHAT" : "TERSEMBUNYI")}
                className={`p-2 rounded-lg transition-all ${q.status === "TERSEMBUNYI" ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
                title={q.status === "TERSEMBUNYI" ? "Tampilkan" : "Sembunyikan"}
              >
                {q.status === "TERSEMBUNYI" ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {/* DRAFT */}
              <button
                onClick={() => updateStatus(q.id, "DRAF")}
                className={`p-2 rounded-lg transition-all ${q.status === "DRAF" ? "text-orange-600 bg-orange-50" : "text-slate-400 hover:text-orange-500 hover:bg-orange-50"}`}
                title="Pindahkan ke Draf"
              >
                <Archive size={18} />
              </button>

              {/* TRASH */}
              <button
                onClick={() => deleteQuestion(q.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Hapus"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        <button className="w-full py-10 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#436163] hover:text-[#436163] transition-all bg-white/50 group">
          <Plus size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-bold">Tambah Pertanyaan Lain</span>
        </button>
      </div>
    </div>
  );
}
