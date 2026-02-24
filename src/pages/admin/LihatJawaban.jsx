import React, { useState } from "react";
import {
  Search,
  FileDown,
  FileSpreadsheet,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ClipboardList,
  Users,
  Menu
} from "lucide-react";
import SmoothDropdown from "../../components/admin/SmoothDropdown";

export default function LihatJawaban() {
  const [searchTerm, setSearchTerm] = useState("");

  const dataAlumni = [
    { id: 1, nama: "Sarah Jenkins", jurusan: "BS Computer Science", tahun: 2022, tanggal: "Oct 24, 2023", status: "Selesai" },
    { id: 2, nama: "Michael Ross", jurusan: "BA Marketing", tahun: 2021, tanggal: "Oct 23, 2023", status: "Selesai" },
    { id: 3, nama: "David Chen", jurusan: "BS Civil Engineering", tahun: 2022, tanggal: "Oct 22, 2023", status: "Belum Selesai" },
    { id: 4, nama: "Emily Kim", jurusan: "BA Graphic Design", tahun: 2023, tanggal: "Oct 21, 2023", status: "Selesai" },
    { id: 5, nama: "Marcus Johnson", jurusan: "BS Information Technology", tahun: 2020, tanggal: "Oct 20, 2023", status: "Selesai" },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans text-slate-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all">
            <FileDown size={18} className="text-slate-600" /> <span className="hidden md:inline">Eksport</span> PDF
          </button>
          <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2.5 bg-[#3D5A5C] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#2D4345] transition-all">
            <FileSpreadsheet size={18} /> <span className="hidden md:inline">Eksport</span> Excel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard icon={<Users size={24} />} label="Total Responden" value="1,240" bgColor="bg-slate-50" iconColor="text-slate-400" />
        <StatCard icon={<TrendingUp size={24} />} label="Baru Minggu Ini" value="+45" bgColor="bg-green-50" iconColor="text-green-500" />
        <StatCard icon={<ClipboardList size={24} />} label="Menunggu Tinjauan" value="12" bgColor="bg-orange-50" iconColor="text-orange-400" className="sm:col-span-2 lg:col-span-1" />
      </div>

      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, id alumni,.."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D5A5C]/10 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48 lg:w-64">
            <SmoothDropdown options={["Semua Jurusan", "Teknik", "Ekonomi"]} placeholder="Semua Jurusan" />
          </div>
          <div className="w-full sm:w-48 lg:w-64">
            <SmoothDropdown options={["2023", "2022", "2021"]} placeholder="Tahun Kelulusan" />
          </div>
        </div>
      </div>


      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5">Nama Alumni</th>
                <th className="px-4 py-5">Jurusan</th>
                <th className="px-4 py-5 text-center">Tahun Lulus</th>
                <th className="px-4 py-5">Tanggal Pengisian</th>
                <th className="px-4 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {dataAlumni.map((alumni) => (
                <tr key={alumni.id} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-gray-200 overflow-hidden flex-shrink-0">
                      <img src={`https://i.pravatar.cc/150?u=${alumni.id}`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-slate-700 truncate">{alumni.nama}</span>
                  </td>
                  <td className="px-4 py-4 text-slate-500 truncate max-w-[200px]">{alumni.jurusan}</td>
                  <td className="px-4 py-4 text-center text-slate-500">{alumni.tahun}</td>
                  <td className="px-4 py-4 text-slate-500">{alumni.tanggal}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                      alumni.status === "Selesai"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                    }`}>
                      {alumni.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-1 md:gap-2">
                      <button className="cursor-pointer p-2 text-slate-400 hover:text-[#3D5A5C] hover:bg-slate-100 rounded-xl transition-all shadow-sm sm:shadow-none" title="Lihat Detail">
                        <Eye size={18} />
                      </button>
                      <button className="cursor-pointer p-2 text-slate-400 hover:text-[#3D5A5C] hover:bg-slate-100 rounded-xl transition-all shadow-sm sm:shadow-none" title="Download PDF">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Responsive */}
        <div className="px-6 py-5 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400">
          <p className="text-center sm:text-left">Tampilan 1 sampai 10 dari 1,240 hasil</p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
              <ChevronLeft size={16} /> <span className="sm:inline">Sebelum</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-xl text-slate-700 hover:bg-gray-50 shadow-sm transition-all">
              <span className="sm:inline">Sesudah</span> <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-komponen StatCard untuk menjaga kerapihan kode
function StatCard({ icon, label, value, bgColor, iconColor, className = "" }) {
  return (
    <div className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 ${className}`}>
      <div className={`p-4 ${bgColor} ${iconColor} rounded-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-xl md:text-2xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}
