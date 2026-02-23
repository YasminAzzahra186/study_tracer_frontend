import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Download, 
  Check, 
  X, 
  Pencil, 
  Trash2, 
  RotateCcw,
  Briefcase,
  MapPin,
  Clock,
  Layers
} from "lucide-react";

// Mengasumsikan komponen ini sudah ada di folder component/admin Anda
import Header from "../../components/admin/Header";
import SideBar from "../../components/admin/SideBar";
import TambahLowongan from "./TambahLowongan";

const JobCard = ({ job }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "MENUNGGU PERSETUJUAN": return "bg-orange-100 text-orange-600";
      case "AKTIF": return "bg-green-100 text-green-600";
      case "BERAKHIR": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getBorderColor = (status) => {
    switch (status) {
      case "MENUNGGU PERSETUJUAN": return "border-l-4 border-l-orange-400";
      case "AKTIF": return "border-l-4 border-l-green-400";
      case "BERAKHIR": return "border-l-4 border-l-red-400";
      default: return "border-l-4 border-l-gray-400";
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg border border-gray-100 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${getBorderColor(job.status)}`}>
      <div className="flex gap-3 items-start flex-1">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <img src={job.logo} alt={job.company} className="w-6 h-6 object-contain opacity-70" />
        </div>
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold whitespace-nowrap ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
            {job.expiry && <span className="text-[9px] text-gray-400 italic">{job.expiry}</span>}
          </div>
          <h3 className="text-base font-bold text-[#3C5759] truncate">{job.title}</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-1"><Briefcase size={12} /> {job.company}</div>
            <div className="flex items-center gap-1"><MapPin size={12} /> {job.location}</div>
            {job.category && <div className="flex items-center gap-1"><Layers size={12} /> {job.category}</div>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 self-end sm:self-center flex-shrink-0">
        {job.status === "MENUNGGU PERSETUJUAN" ? (
          <>
            <button className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors"><Check size={16} /></button>
            <button className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors"><X size={16} /></button>
            <button className="p-1.5 bg-gray-50 text-gray-400 rounded-md hover:bg-gray-200 transition-colors"><Pencil size={16} /></button>
          </>
        ) : job.status === "BERAKHIR" ? (
          <>
            <button className="p-1.5 bg-gray-50 text-gray-400 rounded-md hover:bg-primary hover:text-white transition-colors"><RotateCcw size={16} /></button>
            <button className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={16} /></button>
          </>
        ) : (
          <>
            <button className="p-1.5 bg-gray-50 text-gray-400 rounded-md hover:bg-gray-200 transition-colors"><Pencil size={16} /></button>
            <button className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={16} /></button>
          </>
        )}
      </div>
    </div>
  );
};

export default function ManajemenPekerjaan() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = ["Technology", "Engineering", "Design", "Marketing", "Finance", "Healthcare"];

  const jobs = [
    { id: 1, title: "Senior UX Designer", company: "Google", location: "New York, NY", type: "Full-time", status: "MENUNGGU PERSETUJUAN", postedBy: "Dipasang hari ini oleh Alumni #4021", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" },
    { id: 2, title: "Product Manager", company: "Spotify", location: "Remote", type: "Technology", status: "AKTIF", expiry: "24 Okt 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
    { id: 3, title: "Frontend Developer", company: "Airbnb", location: "San Francisco", type: "Engineering", status: "AKTIF", expiry: "24 Okt 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg" },
    { id: 4, title: "Backend Engineer", company: "Stripe", location: "Seattle, WA", type: "Engineering", status: "BERAKHIR", expiry: "6 Jan 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="p-4 md:p-6 space-y-4">
        {/* Header Section - Compact */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-extrabold text-[#3C5759] leading-tight">Manajemen Pekerjaan</h1>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Tinjau, setujui, dan kelola postingan lowongan kerja dari alumni</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-gray-300 text-slate-700 font-semibold rounded-lg hover:bg-gray-50 active:scale-95 transition-all shadow-sm text-xs md:text-sm whitespace-nowrap group">
              <Download size={14} className="group-hover:scale-110 transition-transform" /> 
              <span className="hidden sm:inline">Eksport CSV</span>
              <span className="sm:hidden">Eksport</span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 active:scale-95 shadow-md text-xs md:text-sm whitespace-nowrap group transition-all"
            >
              <Plus size={14} className="group-hover:scale-110 transition-transform" /> 
              <span className="hidden sm:inline">Buat Lowongan</span>
              <span className="sm:hidden">Buat</span>
            </button>
          </div>
        </div>

        {/* Responsive Grid - Kategori & Ringkasan appear first on mobile */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
          {/* Sidebar Content - Appears FIRST on mobile, LAST on desktop */}
          <div className="lg:col-span-4 space-y-4 order-first lg:order-last">
            {/* Kategori Pekerjaan */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-3 gap-2">
                <h2 className="font-extrabold text-[#3C5759] text-sm md:text-base">Kategori Pekerjaan</h2>
                <button className="text-[9px] font-bold text-gray-400 tracking-widest hover:text-[#3C5759] hover:underline transition-all">KELOLA</button>
              </div>
              <div className="relative mb-3 group">
                <input 
                  type="text" 
                  placeholder="Kategori baru" 
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all" 
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 bg-slate-700 text-white rounded-md hover:bg-slate-800 active:scale-90 transition-all shadow-sm">
                  <Plus size={14} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span 
                    key={cat} 
                    className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-slate-600 text-xs font-bold rounded-md border border-gray-200 group cursor-pointer hover:border-slate-400 hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    {cat} 
                    <X size={10} className="text-gray-400 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all" />
                  </span>
                ))}
              </div>
            </div>

            {/* Ringkasan - Summary Stats */}
            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="font-extrabold text-[#3C5759] text-sm md:text-base mb-3">Ringkasan</h2>
              <div className="space-y-2">
                {[
                  { label: "Pekerjaan Aktif", value: "24", icon: "📊" },
                  { label: "Menunggu Tinjauan", value: "5", highlight: "text-orange-600", icon: "⏳" },
                  { label: "Baru Minggu Ini", value: "8", icon: "✨" },
                  { label: "Total Tayangan", value: "1.2k", icon: "👁️" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 px-2 rounded-md hover:bg-white/50 transition-colors group">
                    <span className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                      <span className="text-sm">{item.icon}</span>
                      {item.label}
                    </span>
                    <span className={`text-sm font-extrabold font-mono ${item.highlight || "text-[#3C5759]"}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Appears SECOND on mobile, FIRST on desktop */}
          <div className="lg:col-span-8 space-y-4 order-last lg:order-first">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center p-1 bg-gray-100 rounded-lg w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow">
                {["Semua", "Menunggu", "Aktif", "Berakhir"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                      activeTab === tab 
                        ? "bg-slate-700 text-white shadow-md scale-105 hover:shadow-lg" 
                        : "text-gray-500 hover:text-[#3C5759] hover:bg-gray-200 active:scale-95"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 max-w-xs w-full sm:max-w-none sm:w-auto group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-slate-600 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Cari Kerja" 
                  className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all shadow-sm group-hover:shadow-md"
                />
              </div>
            </div>

            {/* Job List */}
            <div className="space-y-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-1 py-3">
              <button className="p-1 text-gray-400 hover:text-[#3C5759] hover:scale-110 active:scale-95 transition-all text-sm">{"<"}</button>
              {[1, 2, 3, "...", 12].map((page, i) => (
                <button 
                  key={i} 
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 ${
                    page === 1 
                      ? "bg-slate-700 text-white shadow-md hover:shadow-lg hover:scale-110 active:scale-95" 
                      : "text-gray-500 hover:bg-gray-200 hover:text-[#3C5759] active:scale-95"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-1 text-gray-400 hover:text-[#3C5759] hover:scale-110 active:scale-95 transition-all text-sm">{">"}</button>
            </div>
          </div>
        </div>
      </div>
      <TambahLowongan isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
