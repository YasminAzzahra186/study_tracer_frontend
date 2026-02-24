import React, { useState } from 'react';
import {
  UserPlus, FileEdit, Users, Search,
  Filter, Check, X, Image as ImageIcon, Clock,
  Download, ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';

// --- Components ---

const ManagementStatCard = ({ title, value, trend, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-start justify-between group">
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-black text-slate-800 group-hover:text-primary transition-colors">{value}</h3>
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1">
          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
            {trend}
          </span>
        </div>
      )}
    </div>
    <div className={`p-3 rounded-xl ${iconBg} ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
      <Icon size={24} />
    </div>
  </div>
);

const UpdateRequestCard = ({ user, time, fields }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
    <div className="space-y-5 flex-1">
      <div className="flex justify-between items-start pl-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            {user.initials}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{user.name}</h4>
            <p className="text-[11px] text-slate-500 font-medium">ID: {user.idNum} • Angkatan {user.batch}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
          <Clock size={12} />
          <span className="text-[10px] font-bold">{time}</span>
        </div>
      </div>
      <div className="space-y-3 pl-2">
        {fields.map((field, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{field.label}</p>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-red-400 line-through font-medium decoration-2 decoration-red-200">{field.oldValue}</span>
              <ArrowRight size={14} className="text-slate-300" />
              <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{field.newValue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex gap-3 mt-6 pl-2 border-t border-slate-50 pt-4">
      <button className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
        Tolak
      </button>
      <button className="flex-1 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20">
        Setujui
      </button>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('Semua');
  
  // State untuk Filter Tahun
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('Semua');

  const stats = [
    { title: "Registrasi Baru", value: "12", trend: "+2 Hari ini", icon: UserPlus, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { title: "Permintaan Update", value: "5", trend: "Perlu Tinjauan", icon: FileEdit, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { title: "Total Alumni", value: "1,240", trend: "Aktif", icon: Users, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  ];

  const tabs = ['Semua', 'Menunggu', 'Aktif', 'Ditolak'];
  const years = ['Semua', '2024', '2023', '2022', '2021', '2020'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="space-y-8">

        {/* --- STATS ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => <ManagementStatCard key={i} {...s} />)}
        </div>

        {/* ======================= BAGIAN 1: TABEL REGISTRASI (FULL WIDTH) ======================= */}
        <div className="space-y-6">
          
          {/* Table Controls */}
          <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-3">
            
            {/* Tabs */}
            <div className="flex bg-slate-50 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar border border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap
                    ${activeTab === tab 
                      ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search - CSV - Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative group flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Cari alumni..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 hover:border-slate-200 focus:border-primary rounded-xl text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Tombol CSV (Kecil) */}
              <button 
                className="flex items-center gap-2 px-5 py-2.5 bg-[#3C5759] text-white font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all text-xs shadow-md shadow-[#3C5759]/20 whitespace-nowrap"
                title="Eksport Data CSV"
              >
                <Download size={16} />
                <span>Eksport CSV</span>
              </button>

              {/* Tombol Filter */}
              <div className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`p-2.5 rounded-xl transition-all border
                    ${isFilterOpen || selectedYear !== 'Semua' 
                      ? 'bg-primary/10 text-primary border-primary/20' 
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                >
                  <Filter size={18} />
                </button>

                {/* Dropdown Menu Tahun */}
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter Tahun</span>
                      {selectedYear !== 'Semua' && (
                        <button onClick={() => setSelectedYear('Semua')} className="text-[10px] text-primary font-bold hover:underline">Reset</button>
                      )}
                    </div>
                    <div className="p-1 max-h-60 overflow-y-auto">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors flex justify-between items-center
                            ${selectedYear === year 
                              ? 'bg-[#3C5759] text-white shadow-sm' 
                              : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                          {year}
                          {selectedYear === year && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Alumni</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pendidikan</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Bukti Lulus</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-slate-700 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20">JD</div>
                          <div>
                            <p className="font-bold text-slate-700 text-sm group-hover:text-primary transition-colors">John Doe</p>
                            <p className="text-[11px] text-slate-400">202400{i + 1}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-600">Teknik Informatika</span>
                          <span className="text-[10px] text-slate-400 bg-slate-100 w-fit px-1.5 py-0.5 rounded mt-1">2024</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-xs font-medium text-slate-500 hover:text-primary hover:underline flex items-center justify-center gap-1 mx-auto">
                          <ImageIcon size={14} /> Lihat Foto
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100">
                          Menunggu
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button title="Tolak" className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><X size={18} /></button>
                          <button title="Setujui" className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"><Check size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Hal. 1 dari 5</span>
              <div className="flex gap-2">
                <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-50"><ChevronLeft size={16}/></button>
                <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-500"><ChevronRight size={16}/></button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================= BAGIAN 2: PERMINTAAN UPDATE (DI BAWAH) ======================= */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-black text-xl text-primary">Permintaan Update Profil</h2>
              <p className="text-sm text-slate-500">Daftar alumni yang mengajukan perubahan data diri.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
                5 Menunggu
              </span>
              <button className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 text-xs font-bold hover:border-primary hover:text-primary transition-all">
                Lihat Semua
              </button>
            </div>
          </div>

          {/* Grid Layout untuk Card Update */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UpdateRequestCard
              user={{ name: "David Chen", batch: "2020", idNum: "8912", initials: "DC" }}
              time="2j"
              fields={[
                { label: "Status Pekerjaan", oldValue: "Menganggur", newValue: "Bekerja Full-time" },
                { label: "Perusahaan", oldValue: "-", newValue: "Tech Solutions" }
              ]}
            />
            <UpdateRequestCard
              user={{ name: "Sarah Miller", batch: "2021", idNum: "4451", initials: "SM" }}
              time="5j"
              fields={[
                { label: "Email Kontak", oldValue: "s.miller@univ.ac.id", newValue: "sarah.work@gmail.com" }
              ]}
            />
            <UpdateRequestCard
              user={{ name: "Budi Santoso", batch: "2019", idNum: "2231", initials: "BS" }}
              time="1h"
              fields={[
                { label: "Nomor Telepon", oldValue: "0812345678", newValue: "0819876543" }
              ]}
            />
          </div>
        </div>

      </div>
    </div>
  );
}