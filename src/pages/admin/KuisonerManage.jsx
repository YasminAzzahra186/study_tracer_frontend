import React from "react";
import { 
  Eye, 
  PlusCircle, 
  Pencil, 
  Trash2, 
  EyeOff, 
  GripVertical,
  ChevronDown,
  Plus
} from "lucide-react";

// Sub-komponen Card untuk setiap pertanyaan
const QuestionCard = ({ data }) => {
  const isHidden = data.status === "TERSEMBUNYI";

  return (
    <div className={`bg-white p-4 md:p-6 rounded-2xl border-l-4 border border-gray-100 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-gray-200 group ${isHidden ? 'border-l-gray-300 opacity-80 hover:opacity-90' : 'border-l-[#3C5759] hover:bg-blue-50/30'}`}>
      {/* Handle untuk Drag (Visual Only) */}
      <div className="cursor-grab text-gray-300 group-hover:text-gray-400">
        <GripVertical size={20} />
      </div>

      {/* Konten Pertanyaan */}
      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-gray-100 text-[#3C5759] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {data.id} • {data.type}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isHidden ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-600'}`}>
            {data.status}
          </span>
        </div>
        <h3 className="font-bold text-slate-700 text-sm md:text-base leading-tight truncate">
          {data.text}
        </h3>
        <p className="text-xs text-gray-400 italic font-medium">
          {data.sub}
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="flex items-center gap-1 md:gap-2">
        <button className="p-2 text-gray-400 hover:bg-[#3C5759]/10 hover:text-[#3C5759] rounded-lg transition-colors">
          <Pencil size={18} />
        </button>
        <button className="p-2 text-gray-400 hover:bg-[#3C5759]/10 hover:text-[#3C5759] rounded-lg transition-colors">
          {isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        <button className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const KuisonerManage = () => {
  const [activeTab, setActiveTab] = React.useState("Semua");

  const stats = [
    { label: "TOTAL PERTANYAAN", value: "12", color: "text-[#3C5759]" },
    { label: "AKTIF", value: "10", color: "text-green-600" },
    { label: "DRAF", value: "2", color: "text-orange-500" },
  ];

  const tabs = ["Semua", "Kuisoner Bekerja", "Kuisoner Kuliah", "Kuisoner Wirusaha", "Kuisoner Pencari Kerja"];

  const questions = [
    { id: "Q1", type: "Pilihan Tunggal", status: "TERLIHAT", text: "Apa status pekerjaan Anda saat ini?", sub: "Opsi: Bekerja Paruh Waktu, Bekerja Penuh Waktu..." },
    { id: "Q2", type: "Pilihan Ganda", status: "TERLIHAT", text: "Manakah dari keterampilan berikut yang paling relevan dengan pekerjaan Anda saat ini?", sub: "Opsi: Berpikir Kritis, Komunikasi, Teknologi..." },
    { id: "Q3", type: "Skala (1-5)", status: "TERSEMBUNYI", text: "Nilai relevansi program studi Anda dengan karier Anda saat ini", sub: "Skala: 1 (Tidak Relevan) hingga 5 (Sangat Relevan)" },
    { id: "Q4", type: "Teks Pendek", status: "TERLIHAT", text: "Please specify your job title.", sub: "Open ended response" },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#3C5759]">Kuesioner</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola dan atur kuesioner untuk Studi Penelusuran Lulusan (Tracer Study)</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#3C5759] text-white rounded-lg text-sm font-semibold hover:bg-[#2e4344] hover:shadow-md transition-all">
            <Eye size={18} /> Lihat Jawaban Alumni
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#3C5759] text-white rounded-lg text-sm font-semibold hover:bg-[#2e4344] hover:shadow-md transition-all">
            <PlusCircle size={18} /> Tambah Pertanyaan Baru
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center min-h-[100px] hover:shadow-md hover:border-gray-200 transition-all">
            <p className="text-[10px] font-black text-gray-400 tracking-widest mb-1">{stat.label}</p>
            <h2 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h2>
          </div>
        ))}
        {/* Dropdown Mode Tampilan dengan Tab Filter */}
        <div className="relative group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[100px] cursor-pointer hover:shadow-md hover:border-gray-200 transition-all">
          <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Mode Tampilan</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-[#3C5759] text-sm">Detail Lengkap</span>
            <ChevronDown size={18} className="text-gray-400 group-hover:text-[#3C5759] transition-colors" />
          </div>
          {/* Hidden Dropdown Tabs */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#3C5759] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LIST PERTANYAAN */}
      <div className="space-y-4">
        {questions.map((q) => (
          <QuestionCard key={q.id} data={q} />
        ))}
        
        {/* Tombol Tambah yang putus-putus (Dashed) */}
        <button className="w-full py-10 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#3C5759] hover:text-[#3C5759] hover:bg-blue-50/30 transition-all group">
          <div className="p-2 bg-gray-50 rounded-full group-hover:bg-[#3C5759]/10 transition-colors">
             <Plus size={24} />
          </div>
          <span className="font-bold text-sm">Tambah Pertanyaan Lain</span>
        </button>
      </div>
    </div>
  );
};

export default KuisonerManage;