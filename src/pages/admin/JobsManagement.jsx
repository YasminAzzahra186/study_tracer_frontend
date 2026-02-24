import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  Layers,
  ChartNoAxesCombined,
  Hourglass,
  CalendarClock,
  View,
  Loader2
} from "lucide-react";

import banner from "../../assets/banner.jfif";
import Header from "../../components/admin/Header";
import SideBar from "../../components/admin/SideBar";
import TambahLowongan from "./TambahLowongan";
import { adminApi } from "../../api/admin";
import { STORAGE_BASE_URL } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

// Helper: map backend status fields to display label
const getDisplayStatus = (job) => {
  if (job.approval_status === "pending") return "MENUNGGU PERSETUJUAN";
  if (job.status === "closed") return "BERAKHIR";
  if (job.approval_status === "rejected") return "DITOLAK";
  if (job.status === "published" && job.approval_status === "approved") return "AKTIF";
  if (job.status === "draft") return "DRAFT";
  return job.status?.toUpperCase() || "-";
};

const JobCard = ({ job, onApprove, onReject, onDelete }) => {
  const navigate = useNavigate();
  const displayStatus = getDisplayStatus(job);

  const getStatusColor = (status) => {
    switch (status) {
      case "MENUNGGU PERSETUJUAN": return "bg-orange-100 text-orange-600";
      case "AKTIF": return "bg-green-100 text-green-600";
      case "BERAKHIR": return "bg-red-100 text-red-600";
      case "DITOLAK": return "bg-red-100 text-red-600";
      case "DRAFT": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getBorderColor = (status) => {
    switch (status) {
      case "MENUNGGU PERSETUJUAN": return "border-l-4 border-l-orange-400";
      case "AKTIF": return "border-l-4 border-l-green-400";
      case "BERAKHIR": return "border-l-4 border-l-red-400";
      case "DITOLAK": return "border-l-4 border-l-red-400";
      case "DRAFT": return "border-l-4 border-l-gray-400";
      default: return "border-l-4 border-l-gray-400";
    }
  };

  const fotoUrl = job.foto 
    ? (job.foto.startsWith('http') ? job.foto : `${STORAGE_BASE_URL}/${job.foto}`)
    : banner;

  return (
    <div 
      onClick={() => navigate(`/wb-admin/job-detail/${job.id}`)}
      className={`bg-white p-4 rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group/card ${getBorderColor(displayStatus)}`}
    >
      <div className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0">
        <div className="w-full sm:w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
          <img 
            src={fotoUrl} 
            alt={job.perusahaan?.nama || job.judul} 
            className="w-full h-full object-cover opacity-90 group-hover/card:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.src = banner; }}
          />
        </div>

        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold whitespace-nowrap uppercase ${getStatusColor(displayStatus)}`}>
              {displayStatus}
            </span>
            {job.lowongan_selesai && <span className="text-[9px] text-gray-400 italic font-medium">Berakhir {job.lowongan_selesai}</span>}
          </div>
          <h3 className="text-base font-bold text-[#3C5759] truncate group-hover/card:text-slate-900 transition-colors">
            {job.judul}
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-gray-500 font-medium">
            <div className="flex items-center gap-1.5"><Briefcase size={12} /> {job.perusahaan?.nama || '-'}</div>
            <div className="flex items-center gap-1.5"><MapPin size={12} /> {job.lokasi || job.perusahaan?.kota?.nama || '-'}</div>
            {job.tipe_pekerjaan && <div className="flex items-center gap-1.5"><Layers size={12} /> {job.tipe_pekerjaan}</div>}
          </div>
        </div>
      </div>

      <div 
        className="flex items-center gap-2 self-end sm:self-center flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {displayStatus === "MENUNGGU PERSETUJUAN" ? (
          <>
            <button onClick={() => onApprove(job.id)} title="Setujui" className="cursor-pointer p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all active:scale-90"><Check size={18} /></button>
            <button onClick={() => onReject(job.id)} title="Tolak" className="cursor-pointer p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all active:scale-90"><X size={18} /></button>
            <button title="Edit" className="cursor-pointer p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-[#3C5759] hover:text-white transition-all active:scale-90"><Pencil size={18} /></button>
          </>
        ) : displayStatus === "BERAKHIR" ? (
          <>
            <button title="Posting Ulang" className="cursor-pointer p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-[#3C5759] hover:text-white transition-all active:scale-90"><RotateCcw size={18} /></button>
            <button onClick={() => onDelete(job.id)} title="Hapus" className="cursor-pointer p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all active:scale-90"><Trash2 size={18} /></button>
          </>
        ) : (
          <>
            <button title="Edit" className="cursor-pointer p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-[#3C5759] hover:text-white transition-all active:scale-90"><Pencil size={18} /></button>
            <button onClick={() => onDelete(job.id)} title="Hapus" className="cursor-pointer p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all active:scale-90"><Trash2 size={18} /></button>
          </>
        )}
      </div>
    </div>
  );
};

export default function ManajemenPekerjaan() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [lowonganStats, setLowonganStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabFilterMap = {
    "Semua": {},
    "Menunggu": { approval_status: "pending" },
    "Aktif": { status: "published", approval_status: "approved" },
    "Berakhir": { status: "closed" },
  };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const filters = { ...tabFilterMap[activeTab] };
      if (searchQuery.trim()) filters.search = searchQuery.trim();
      const res = await adminApi.getLowongan(filters, 50);
      const data = res.data?.data?.data || res.data?.data || [];
      setJobs(Array.isArray(data) ? data : []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchQuery]);

  // Client-side category filter (backend doesn't support tipe_pekerjaan param)
  const filteredJobs = useMemo(() => {
    if (!selectedCategory) return jobs;
    return jobs.filter(job => job.tipe_pekerjaan === selectedCategory);
  }, [jobs, selectedCategory]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await adminApi.getLowonganStats();
      const data = res.data?.data || res.data || {};
      setLowonganStats(data);
      setCategories(data.categories || []);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleApprove = async (id) => {
    try {
      await adminApi.approveLowongan(id);
      fetchJobs();
      fetchStats();
    } catch {
      alert("Gagal menyetujui lowongan");
    }
  };

  const handleReject = async (id) => {
    try {
      await adminApi.rejectLowongan(id);
      fetchJobs();
      fetchStats();
    } catch {
      alert("Gagal menolak lowongan");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus lowongan ini?")) return;
    try {
      await adminApi.deleteLowongan(id);
      fetchJobs();
      fetchStats();
    } catch {
      alert("Gagal menghapus lowongan");
    }
  };

  const handleLowonganCreated = () => {
    setIsModalOpen(false);
    fetchJobs();
    fetchStats();
  };

  // CSV Export
  const handleExportCSV = () => {
    if (filteredJobs.length === 0) return;
    const headers = ['Judul', 'Perusahaan', 'Lokasi', 'Tipe Pekerjaan', 'Status', 'Tanggal Berakhir'];
    const rows = filteredJobs.map(job => [
      job.judul || '',
      job.perusahaan?.nama || '',
      job.lokasi || '',
      job.tipe_pekerjaan || '',
      getDisplayStatus(job),
      job.lowongan_selesai || '',
    ]);
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lowongan_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="space-y-6">
        {/* Header Section - Tetap sesuai kode awal Anda */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-2">
          <div className="flex items-center gap-4 flex-shrink-0">
            <button onClick={handleExportCSV} className="cursor-pointer flex items-center gap-1 p-4 bg-white border border-gray-300 text-slate-700 font-semibold rounded-xl hover:bg-gray-50 active:scale-95 transition-all text-xs md:text-sm whitespace-nowrap group">
              <Download size={14} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Eksport CSV</span>
              <span className="sm:hidden">Eksport</span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-4 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 active:scale-95 shadow-md text-xs md:text-sm whitespace-nowrap group transition-all"
            >
              <Plus size={14} className="group-hover:scale-110 transition-transform" /> 
              <span className="hidden sm:inline">Buat Lowongan</span>
              <span className="sm:hidden">Buat</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
          {/* Sidebar - Tetap sesuai kode awal Anda */}
          <div className="lg:col-span-4 space-y-4 order-first lg:order-last">
            {/* Kategori Pekerjaan */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-3 gap-2">
                <h2 className="font-extrabold text-[#3C5759] text-sm md:text-base">Kategori Pekerjaan</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.length > 0 ? (
                  <>
                    <span
                      onClick={() => setSelectedCategory(null)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md border cursor-pointer transition-all ${
                        !selectedCategory ? 'bg-slate-700 text-white border-slate-700' : 'bg-gray-50 text-slate-600 border-gray-200 hover:border-slate-400'
                      }`}
                    >
                      Semua
                    </span>
                    {categories.map((cat) => (
                      <span
                        key={cat.name}
                        onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                        className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md border cursor-pointer transition-all ${
                          selectedCategory === cat.name ? 'bg-slate-700 text-white border-slate-700' : 'bg-gray-50 text-slate-600 border-gray-200 hover:border-slate-400'
                        }`}
                      >
                        {cat.name} <span className={`text-[10px] ${selectedCategory === cat.name ? 'text-gray-300' : 'text-gray-400'}`}>({cat.count})</span>
                      </span>
                    ))}
                  </>
                ) : (
                  <span className="text-gray-400 text-xs">Belum ada kategori</span>
                )}
              </div>
            </div>

            {/* Ringkasan */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-gray-100 shadow-sm">
              <h2 className="font-extrabold text-[#3C5759] text-sm md:text-base mb-3">Ringkasan</h2>
              <div className="space-y-2">
                {[
                  { label: "Pekerjaan Aktif", value: lowonganStats?.active ?? "-", icon: <ChartNoAxesCombined size={18} /> },
                  { label: "Menunggu Tinjauan", value: lowonganStats?.pending ?? "-", highlight: "text-orange-600", icon: <Hourglass size={18}/> },
                  { label: "Baru Minggu Ini", value: lowonganStats?.new_this_week ?? "-", icon: <CalendarClock size={18}/> },
                  { label: "Total Lowongan", value: lowonganStats?.total ?? "-", icon: <View size={18}/>},
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 px-2 rounded-md hover:bg-white/50 transition-colors">
                    <span className="text-xs font-medium text-gray-600 flex items-center gap-1.5">{item.icon} {item.label}</span>
                    <span className={`text-sm font-extrabold ${item.highlight || "text-[#3C5759]"}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content (List Card) */}
          <div className="lg:col-span-8 space-y-4 order-last lg:order-first">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex gap-3 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
                {["Semua", "Menunggu", "Aktif", "Berakhir"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-md text-xs font-bold transition-all ${
                      activeTab === tab ? "bg-slate-700 text-white shadow-md scale-105" : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-slate-600 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Cari Lowongan..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all" 
                />
              </div>
            </div>

            {/* Render List Card */}
            <div className="space-y-3">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin text-gray-400" size={32} />
                </div>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApprove={handleApprove} onReject={handleReject} onDelete={handleDelete} />
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">Tidak ada lowongan ditemukan</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <TambahLowongan isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleLowonganCreated} />
    </div>
  );
}