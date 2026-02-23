import React, { useState } from 'react';
import {
  UserPlus, FileEdit, Users, Search,
  Filter, Check, X, Image as ImageIcon, Clock,
  Download,
  Plus,
  CircleCheck
} from 'lucide-react';

// --- Components ---
const ManagementStatCard = ({ title, value, trend, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white p-5 rounded-2xl border border-fourth shadow-sm flex items-center justify-between">
    <div className="space-y-1">
      <p className="text-third text-[13px] font-medium">{title}</p>
      <div className="flex items-center gap-3">
        <h3 className="text-2xl font-bold text-primary">{value}</h3>
        {trend && (
          <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-lg border border-green-100">
            {trend}
          </span>
        )}
      </div>
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}>
      <Icon size={22} />
    </div>
  </div>
);

const UpdateRequestCard = ({ user, time, fields }) => (
  <div className="bg-white border border-fourth rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
    <div className="space-y-6">
      {/* User Info Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {user.image ? (
            <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
              {user.initials}
            </div>
          )}
          <div>
            <h4 className="font-bold text-primary text-sm">{user.name}</h4>
            <p className="text-[11px] text-third font-medium tracking-tight">Angkatan {user.batch} • ID: {user.idNum}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-third bg-fourth/30 px-2 py-1 rounded-lg">
          <Clock size={12} />
          <span className="text-[10px] font-semibold">{time}</span>
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="space-y-5">
        {fields.map((field, idx) => (
          <div key={idx} className="space-y-2">
            <p className="text-[10px] font-bold text-third uppercase tracking-widest px-1">Bidang: {field.label}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-fourth/20 p-3 rounded-xl border border-fourth/50 relative overflow-hidden">
                <p className="text-[8px] font-bold text-third/60 uppercase mb-1.5">Nilai Saat Ini</p>
                <p className="text-xs text-red-500/80 font-medium line-through decoration-red-300 decoration-2">{field.oldValue}</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 relative overflow-hidden">
                <p className="text-[8px] font-bold text-emerald-500 uppercase mb-1.5">Usulan Perubahan</p>
                <p className="text-xs text-emerald-700 font-bold">{field.newValue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-3 mt-8">
      <button className="flex-1 py-3 border border-fourth text-secondary text-xs font-bold rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all cursor-pointer">
        Hapus
      </button>
      <button className="flex-1 py-3 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-primary/10 cursor-pointer">
        Terima Perubahan
      </button>
    </div>
  </div>
);

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('Semua');

  const stats = [
    { title: "Registrasi Menunggu", value: "12", trend: "+2 hari ini", icon: UserPlus, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { title: "Profile Diperbarui", value: "5", trend: "+1 hari ini", icon: FileEdit, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { title: "Total Alumni", value: "1,240", trend: "+15 minggu ini", icon: Users, iconBg: "bg-gray-50", iconColor: "text-secondary" },
  ];

  const tabs = ['Semua', 'Menunggu', 'Aktif', 'Ditolak'];

  return (
    <div className="space-y-10 pb-10">

      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-2">
        <div className="flex items-center gap-4 flex-shrink-0">
          <button className="cursor-pointer flex items-center gap-1 p-4 bg-white border border-gray-300 text-slate-700 font-semibold rounded-xl hover:bg-gray-50 active:scale-95 transition-all text-xs md:text-sm whitespace-nowrap group">
            <Download size={18} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Eksport CSV</span>
            <span className="sm:hidden">Eksport</span>
          </button>
        </div>
      </div>

      {/* 1. Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => <ManagementStatCard key={i} {...s} />)}
      </div>

      {/* 2. Main Registration Table Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex bg-fourth/50 p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer
                  ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-third hover:text-primary'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-third group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Cari berdasarkan nama.."
                className="pl-10 pr-4 py-2.5 bg-white border border-fourth rounded-xl text-sm w-full md:w-64 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <button className="p-2.5 bg-white border border-fourth rounded-xl text-third hover:text-primary transition-all cursor-pointer">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="bg-white border border-fourth rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-fourth/30 border-b border-fourth">
                <tr>
                  <th className="p-5 w-10"><input type="checkbox" className="rounded-md border-fourth" /></th>
                  <th className="p-5 text-sm font-bold text-third uppercase tracking-wider">Nama & Email</th>
                  <th className="p-5 text-sm font-bold text-third uppercase tracking-wider">Lulusan</th>
                  <th className="p-5 text-sm font-bold text-third uppercase tracking-wider">Foto</th>
                  <th className="p-5 text-sm font-bold text-third uppercase tracking-wider text-center">Status</th>
                  <th className="p-5 text-sm font-bold text-third uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fourth">
                {[1, 2, 3].map((_, i) => (
                  <tr key={i} className="hover:bg-fourth/10 transition-colors">
                    <td className="p-5"><input type="checkbox" className="rounded-md border-fourth" /></td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">JD</div>
                        <div>
                          <p className="font-bold text-primary text-sm">John Doe</p>
                          <p className="text-xs text-third">john.doe@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <p className="text-sm font-medium text-secondary">BS Computer Science</p>
                      <p className="text-xs text-third">Batch 2023</p>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-secondary text-sm">
                        <ImageIcon size={16} className="text-third" />
                        <span>John_Do.jpg</span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold border border-orange-100 shadow-sm">
                        Menunggu
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-third hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"><X size={20} /></button>
                        <button className="p-2 text-third hover:text-green-500 hover:bg-green-50 rounded-lg transition-all cursor-pointer"><Check size={20} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 border-t border-fourth flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium text-third">Menampilkan 1 sampai 3 dari 12 antrian</p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-fourth rounded-lg text-sm font-semibold text-third hover:bg-fourth transition-colors">Sebelum</button>
              <button className="w-10 h-10 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-transform active:scale-95">1</button>
              <button className="w-10 h-10 border border-fourth rounded-lg text-sm font-semibold text-third hover:bg-fourth">2</button>
              <button className="px-4 py-2 border border-fourth rounded-lg text-sm font-semibold text-third hover:bg-fourth transition-colors">Selanjutnya</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- NEW SECTION: APPROVAL USER UPDATE PROFILE --- */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-primary tracking-tight">Permintaan Pembaruan Profil</h2>
          <span className="bg-fourth/60 text-secondary px-3 py-1 rounded-full text-[11px] font-bold border border-fourth/50 shadow-sm">
            5 Pembaharuan
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpdateRequestCard
            user={{ name: "David Chen", batch: "2020", idNum: "2020-8912", initials: "DC" }}
            time="2 jam lalu"
            fields={[
              { label: "Status Pengerjaan", oldValue: "Unemployed", newValue: "Employed Full-time" },
              { label: "Perusahaan", oldValue: "N/A", newValue: "TechSolutions Inc." }
            ]}
          />
          <UpdateRequestCard
            user={{ name: "Emily Martinez", batch: "2019", idNum: "2019-4451", initials: "EM" }}
            time="5 jam lalu"
            fields={[
              { label: "Alamat Email", oldValue: "emily.m@university.edu", newValue: "emily.work@gmail.com" }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
