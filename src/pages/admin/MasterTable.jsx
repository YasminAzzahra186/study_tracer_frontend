import React, { useState } from "react";
import {
  Plus,
  GraduationCap,
  Briefcase,
  FileText,
  Download,
  Trash2,
  Pencil,
  Search,
  Building2 // Import icon baru untuk perusahaan
} from "lucide-react";
import SmoothDropdown from "../../components/admin/SmoothDropdown";
import { Link } from "react-router-dom";

// --- SUB-KOMPONEN REUSABLE TABLE (Tidak Berubah) ---
const ManagedTable = ({ title, icon: Icon, data, placeholder, onAddLabel, viewAllLink }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="p-1.5 bg-blue-100 rounded-lg text-primary flex-shrink-0 hover:scale-110 transition-transform">
            <Icon size={16} />
          </div>
          <h3 className="font-bold text-primary text-md truncate">{title}</h3>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="text-fourth bg-primary flex items-center gap-1 text-xs font-bold hover:text-white hover:bg-secondary px-2.5 py-2 rounded-lg transition-all group cursor-pointer"
        >
          <Plus size={12} className="group-hover:scale-125 transition-transform" />
          <span className="hidden sm:inline">{onAddLabel}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder={`Cari ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 font-bold text-[12px] uppercase tracking-widest border-b-2 border-gray-200 bg-gray-50">
              <th className="px-3 py-3 w-24">Kode</th>
              <th className="px-3 py-3">Nama</th>
              <th className="px-3 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Input Row (Conditional) */}
            {isAdding && (
              <tr className="bg-blue-50/50 animate-in fade-in duration-300">
                <td className="py-3 px-3">
                  <input type="text" placeholder="KODE" className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-primary outline-none" />
                </td>
                <td className="py-3 px-3">
                  <input type="text" placeholder={placeholder} className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-primary outline-none" />
                </td>
                <td className="py-3 px-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsAdding(false)} className="cursor-pointer px-3 py-1.5 text-[12px] font-bold text-gray-500 hover:bg-gray-200 rounded transition-colors">Batal</button>
                    <button className="cursor-pointer px-3 py-1.5 text-[12px] font-bold bg-primary text-white rounded shadow-sm hover:opacity-90">Simpan</button>
                  </div>
                </td>
              </tr>
            )}

            {/* Data Rows */}
            {data
              .filter(item => item.n.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item, i) => (
                <tr key={i} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="py-3 px-3 font-bold text-primary text-sm">{item.c}</td>
                  <td className="py-3 px-3 font-medium text-gray-700 text-sm group-hover:text-primary transition-colors">{item.n}</td>
                  <td className="py-3 px-3">
                    <div className="flex justify-end gap-1 transition-opacity">
                      <button className="cursor-pointer p-2 text-gray-400 hover:text-[#3C5759] hover:bg-blue-100 rounded-lg transition-all active:scale-90 group/btn"><Pencil size={16} className="group-hover/btn:scale-110 transition-transform" /></button>
                      <button className="cursor-pointer p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-lg transition-all active:scale-90 group/btn"><Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" /></button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Link to={viewAllLink} className="w-full mt-4 py-2 flex justify-center text-xs font-bold text-primary hover:text-secondary transition-all italic border-t border-dashed border-gray-100">
          Lihat Semua {title} →
        </Link>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const MasterTable = () => {
  const [selectedFormat, setSelectedFormat] = useState("PDF");

  // Data Array
  const dataJurusan = [
    { c: "INF-01", n: "Informatics Engineering" },
    { c: "IS-02", n: "Informatics System" }
  ];

  const dataPekerjaan = [
    { c: "TYP-01", n: "Full-time Employee" },
    { c: "TYP-02", n: "Part-time / Contract" },
    { c: "TYP-03", n: "Entrepreneur" }
  ];

  // Data baru untuk perusahaan
  const dataPerusahaan = [
    { c: "CMP-01", n: "Tech Nusantara Ltd." },
    { c: "CMP-02", n: "Global Innovation Inc." },
    { c: "CMP-03", n: "Creative Digital Agency" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">

        {/* KIRI: 8 Kolom */}
        <div className="lg:col-span-8 space-y-4 order-last lg:order-first">
          <ManagedTable
            title="Manajemen Jurusan"
            icon={GraduationCap}
            data={dataJurusan}
            placeholder="Contoh: Teknik Mesin"
            onAddLabel="Tambah Jurusan"
            viewAllLink="/admin/jurusan"
          />

          {/* Tabel Baru: Manajemen Perusahaan */}
          <ManagedTable
            title="Manajemen Perusahaan"
            icon={Building2}
            data={dataPerusahaan}
            placeholder="Contoh: PT. Maju Jaya"
            onAddLabel="Tambah Perusahaan"
            viewAllLink="/admin/companies"
          />

          <ManagedTable
            title="Tipe Pekerjaan"
            icon={Briefcase}
            data={dataPekerjaan}
            placeholder="Contoh: Freelance"
            onAddLabel="Tambah Tipe"
            viewAllLink="/admin/job-types"
          />
        </div>

        {/* Kolom Bagian Kanan */}
        <div className="lg:col-span-4 space-y-4 order-first lg:order-last">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 rounded-lg text-primary"><FileText size={16} /></div>
              <h3 className="font-bold text-primary text-sm">Laporan Sistem</h3>
            </div>

            <div className="space-y-4">
              <SmoothDropdown 
                label="JENIS LAPORAN" 
                options={["Data Jurusan", "Data Tipe Pekerjaan", "Data Perusahaan"]} 
              />
              
              {/* Tambahkan mt-2 agar lebih kebawah, dan tracking-wider agar font mirip label diatas */}
              <div className="space-y-2 mt-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Format Laporan
                </label>
                <div className="flex gap-3">
                  {["PDF", "XLSX"].map(fmt => (
                    <button 
                      key={fmt} 
                      onClick={() => setSelectedFormat(fmt)} 
                      className={`cursor-pointer flex-1 py-2.5 rounded-lg text-xs font-bold transition-all hover:opacity-90 ${selectedFormat === fmt ? "bg-primary text-white shadow-md" : "bg-gray-50 text-gray-400 border border-gray-200"}`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <button className="cursor-pointer w-full py-2.5 bg-primary text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md mt-2">
                <Download size={14} /> Buat Laporan
              </button>
            </div>

            {/* Laporan Terbaru Section */}
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Laporan Terbaru</p>
              {[
                { n: "Employment_2023.pdf", icon: <FileText size={14} className="text-red-400"/> },
              ].map((file, i) => (
                <div key={i} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer group">
                  <div className="flex items-center gap-2 truncate">
                    <div className="p-1 bg-gray-50 rounded group-hover:bg-white">{file.icon}</div>
                    <p className="text-xs font-bold text-gray-700 truncate">{file.n}</p>
                  </div>
                  <Download size={12} className="text-gray-300 group-hover:text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MasterTable;