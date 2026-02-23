import React, { useState } from "react";
import {
  History,
  Save,
  Plus,
  GraduationCap,
  Briefcase,
  FileText,
  Download,
  Trash2,
  Pencil,
  FileSpreadsheet
} from "lucide-react";

const MasterTable = () => {
  const [selectedFormat, setSelectedFormat] = useState("PDF");

  return (
    <div className="space-y-6">
      {/* HEADER SECTION - Compact & Modern */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="cursor-pointer flex items-center gap-1 p-4 bg-white border border-gray-300 text-slate-700 font-semibold rounded-xl hover:bg-gray-50 active:scale-95 transition-all text-xs md:text-sm whitespace-nowrap group">
            <Download size={14} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Eksport CSV</span>
            <span className="sm:hidden">Eksport</span>
          </button>
          <button className="cursor-pointer flex items-center gap-1 p-4 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-800 active:scale-95  text-xs md:text-sm whitespace-nowrap group transition-all">
            <Save size={14} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Simpan Perubahan</span>
            <span className="sm:hidden">Simpan</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
        {/* KIRI: Manajemen Jurusan & Jenis Pekerjaan (8 Kolom) */}
        <div className="lg:col-span-8 space-y-4 order-last lg:order-first">

          {/* Section Manajemen Jurusan */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="p-1.5 bg-blue-100 rounded-lg text-[#3C5759] flex-shrink-0 hover:scale-110 transition-transform">
                  <GraduationCap size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#3C5759] text-md">Manajemen Jurusan</h3>
                </div>
              </div>
              <button className="text-fourth bg-primary flex items-center gap-1 text-xs font-bold hover:text-white hover:bg-secondary px-2.5 py-2 rounded-lg transition-all whitespace-nowrap ml-2 group cursor-pointer">
                <Plus size={12} className="group-hover:scale-125 transition-transform" />
                <span className="hidden sm:inline">Tambah Jurusan</span>
              </button>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 font-bold text-xs uppercase tracking-widest border-b-2 border-gray-200 bg-gray-50">
                    <th className="pb-4 px-3 py-3">Kode</th>
                    <th className="pb-4 px-3 py-3">Nama Jurusan</th>
                    <th className="pb-4 px-3 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Row Input Baru */}
                  <tr className="hover:bg-blue-50 transition-colors bg-blue-50/30">
                    <td className="py-3 px-3"><input type="text" placeholder="CODE" className="w-20 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C5759] focus:border-transparent transition-all font-medium" /></td>
                    <td className="py-3 px-3"><input type="text" placeholder="Nama Jurusan" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C5759] focus:border-transparent transition-all font-medium" /></td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-300 active:scale-90 transition-all shadow-sm">Batal</button>
                        <button className="px-4 py-2 bg-[#3C5759] text-white rounded-lg text-sm font-bold hover:opacity-90 active:scale-90 transition-all shadow-md">Simpan</button>
                      </div>
                    </td>
                  </tr>
                  {/* Data Rows */}
                  {[
                    { c: "INF-01", n: "Informatics Engineering", f: "Computer Science" },
                    { c: "IS-02", n: "Informatics System", f: "Computer Science" }
                  ].map((item, i) => (
                    <tr key={i} className="group hover:bg-blue-50 transition-colors cursor-pointer">
                      <td className="py-3 px-3 font-bold text-[#3C5759] text-sm">{item.c}</td>
                      <td className="py-3 px-3 font-medium text-gray-700 text-sm group-hover:text-[#3C5759] transition-colors">{item.n}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex justify-center gap-1">
                          <button className="p-2 text-gray-400 hover:text-[#3C5759] hover:bg-blue-100 rounded-lg transition-all active:scale-90 group/btn"><Pencil size={16} className="group-hover/btn:scale-110 transition-transform" /></button>
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-lg transition-all active:scale-90 group/btn"><Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="w-full mt-4 py-2 text-sm font-bold text-[#3C5759] hover:text-white hover:bg-[#3C5759] rounded-lg transition-all">Lihat Semua Jurusan →</button>
            </div>
          </div>

          {/* Section Jenis Pekerjaan */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="p-1.5 bg-teal-100 rounded-lg text-[#3C5759] flex-shrink-0 hover:scale-110 transition-transform">
                  <Briefcase size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#3C5759] text-sm">Jenis Pekerjaan</h3>
                  <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider truncate">Kategorikan jenis pekerjaan untuk statistik</p>
                </div>
              </div>
              <button className="text-[#3C5759] flex items-center gap-1 text-xs font-bold hover:text-white hover:bg-[#3C5759] px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap ml-2 group">
                <Plus size={12} className="group-hover:scale-125 transition-transform" />
                <span className="hidden sm:inline">Tambah Tipe</span>
              </button>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 font-bold text-xs uppercase tracking-widest border-b-2 border-gray-200 bg-gray-50">
                    <th className="pb-4 px-3 py-3">Kode</th>
                    <th className="pb-4 px-3 py-3">Nama Tipe Job</th>
                    <th className="pb-4 px-3 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Row Input Baru */}
                  <tr className="hover:bg-blue-50 transition-colors bg-blue-50/30">
                    <td className="py-3 px-3"><input type="text" placeholder="TYP-01" className="w-20 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C5759] focus:border-transparent transition-all font-medium" /></td>
                    <td className="py-3 px-3"><input type="text" placeholder="e.g. Remote Contractor" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C5759] focus:border-transparent transition-all font-medium" /></td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-300 active:scale-90 transition-all shadow-sm">Batal</button>
                        <button className="px-4 py-2 bg-[#3C5759] text-white rounded-lg text-sm font-bold hover:opacity-90 active:scale-90 transition-all shadow-md">Simpan</button>
                      </div>
                    </td>
                  </tr>
                  {/* Data Rows */}
                  {[
                    { c: "TYP-01", n: "Full-time Employee" },
                    { c: "TYP-02", n: "Part-time / Contract" },
                    { c: "TYP-03", n: "Entrepreneur / Self-employed" },
                    { c: "TYP-04", n: "Freelancer" }
                  ].map((item, i) => (
                    <tr key={i} className="group hover:bg-blue-50 transition-colors cursor-pointer">
                      <td className="py-3 px-3 font-bold text-[#3C5759] text-sm">{item.c}</td>
                      <td className="py-3 px-3 font-medium text-gray-700 text-sm group-hover:text-[#3C5759] transition-colors">{item.n}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="p-2 text-gray-400 hover:text-[#3C5759] hover:bg-blue-100 rounded-lg transition-all active:scale-90 group/btn"><Pencil size={16} className="group-hover/btn:scale-110 transition-transform" /></button>
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-lg transition-all active:scale-90 group/btn"><Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="w-full mt-4 py-2 text-sm font-bold text-[#3C5759] hover:text-white hover:bg-[#3C5759] rounded-lg transition-all">Lihat Semua Tipe Pekerjaan →</button>
            </div>
          </div>
        </div>

        {/* KANAN: Status & Laporan (4 Kolom) */}
        <div className="lg:col-span-4 space-y-4 order-first lg:order-last">

          {/* Status Tracer Study Card */}
          <div className="bg-gradient-to-br from-[#3C5759] to-[#2a3c3e] rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-bold text-base mb-0.5 group-hover:translate-x-1 transition-transform">Status Tracer Study</h3>
              <p className="text-[9px] text-white/60 uppercase font-bold tracking-widest mb-4">Periode 2024</p>

              <div className="space-y-3">
                <div className="group/progress">
                  <div className="flex justify-between text-[9px] font-bold mb-1">
                    <span>TINGKAT RESPON</span>
                    <span className="group-hover/progress:text-yellow-300 transition-colors">78%</span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-white h-full rounded-full transition-all duration-1000 group-hover/progress:shadow-lg group-hover/progress:shadow-white/50" style={{width: '78%'}}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all group/stat">
                    <p className="text-lg font-black leading-none mb-0.5">1,240</p>
                    <p className="text-[8px] font-bold text-white/60 uppercase">Responden</p>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/20 hover:bg-orange-500/20 hover:border-orange-400/50 transition-all group/stat">
                    <p className="text-lg font-black leading-none mb-0.5 group-hover/stat:text-orange-300 transition-colors">345</p>
                    <p className="text-[8px] font-bold text-white/60 uppercase">Menunggu</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Dekorasi lingkaran di background */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-300"></div>
          </div>

          {/* Laporan Sistem Card */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="p-1.5 bg-purple-100 rounded-lg text-[#3C5759] group-hover:scale-110 transition-transform flex-shrink-0">
                <FileText size={16} />
              </div>
              <h3 className="font-bold text-[#3C5759] text-sm">Laporan Sistem</h3>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Jenis Laporan</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#3C5759] focus:border-transparent hover:bg-gray-100 transition-all appearance-none cursor-pointer" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233C5759' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: '28px'}}>
                  <option>Status Pekerjaan Lulusan</option>
                  <option>Data Laporan Alumni</option>
                  <option>Statistik Gaji</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Tahun Lulus</label>
                  <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#3C5759] focus:border-transparent hover:bg-gray-100 transition-all appearance-none cursor-pointer" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233C5759' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: '28px'}}>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Format</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedFormat("PDF")}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${ selectedFormat === "PDF" ? "bg-[#3C5759] text-white shadow-md hover:opacity-90" : "bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200"}`}
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => setSelectedFormat("XLSX")}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${selectedFormat === "XLSX" ? "bg-[#3C5759] text-white shadow-md hover:opacity-90" : "bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200"}`}
                    >
                      XLSX
                    </button>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 bg-[#3C5759] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 shadow-md transition-all group">
                <Download size={14} className="group-hover:scale-125 transition-transform" /> Buat Laporan
              </button>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Laporan Terbaru</p>
              <div className="space-y-2">
                {[
                  { n: "Employment_2023.pdf", d: "Dibuat kemarin", icon: <FileText size={14} className="text-red-400"/> },
                  { n: "Salary_Data_Q3.xlsx", d: "Dibuat kemarin", icon: <FileSpreadsheet size={14} className="text-green-500"/> }
                ].map((file, i) => (
                  <div key={i} className="flex justify-between items-center group hover:bg-gray-50 p-2 rounded-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="p-1.5 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">{file.icon}</div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-700 truncate">{file.n}</p>
                        <p className="text-[9px] text-gray-400">{file.d}</p>
                      </div>
                    </div>
                    <Download size={12} className="text-gray-400 group-hover:text-[#3C5759] group-hover:scale-125 flex-shrink-0 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterTable;
