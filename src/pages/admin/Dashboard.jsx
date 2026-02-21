import React from "react";
import { Users, ShieldCheck, FileText, Clock } from "lucide-react";
import { ArrowRight, UserPlus, Briefcase, CheckCircle2 } from 'lucide-react';
import Charts, { ChartsPenyelesaian } from "../../components/admin/Chart";

const StatCard = ({ icon: Icon, label, value, badge, badgeColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-fourth shadow-sm flex flex-col gap-4">
    <div className="flex justify-between items-start">
      {/* Icon Wrapper */}
      <div className="p-3 bg-fourth rounded-xl text-primary">
        <Icon size={24} weight="bold" />
      </div>
      {/* Badge */}
      {badge && (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </div>

    <div>
      <p className="text-third text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-primary mt-1">{value}</h3>
    </div>
  </div>
);

export default function Dashboard() {
  const stats = [
    {
      label: "Total Pengguna Aktif",
      value: "12,450",
      icon: Users,
      badge: "+12%",
      badgeColor: "bg-green-100 text-green-600",
    },
    {
      label: "Status pekerja",
      value: "60%",
      icon: ShieldCheck,
      badge: "Optimal",
      badgeColor: "bg-fourth text-secondary",
    },
    {
      label: "Kuesioner Aktif",
      value: "4",
      icon: FileText,
      badge: "Active",
      badgeColor: "bg-green-100 text-green-600",
    },
    {
      label: "Total Menunggu",
      value: "60",
      icon: Clock,
      badge: "Butuh Akasi",
      badgeColor: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Grid Layout untuk Box/Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            badge={stat.badge}
            badgeColor={stat.badgeColor}
          />
        ))}
      </div>

      {/* Bagian Pendaftaran Alumni yang Menunggu */}
      <div className="bg-white border border-fourth rounded-2xl p-6 shadow-sm">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-bold text-primary">
              Pendaftaran Alumni yang Menunggu
            </h2>
          </div>
          <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline cursor-pointer">
            Lihat Semua <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sisi Kiri: Chart Tingkat Penyelesaian (Progress Ring) */}
          <ChartsPenyelesaian />

          {/* Sisi Kanan: List Tinjauan */}
          <div className="lg:col-span-2 space-y-4">
            {/* Item 1: Pendaftaran Alumni */}
            <div className="p-5 border border-fourth rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 bg-fourth rounded-xl text-third group-hover:text-primary transition-colors">
                  <UserPlus size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-primary">
                      Pendaftaran Alumni Menunggu
                    </h4>
                    <span className="text-2xl font-bold text-primary">42</span>
                  </div>
                  <p className="text-xs text-third mb-3">
                    Permintaan akun baru menunggu verifikasi
                  </p>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary/40 h-full w-[70%] rounded-full"></div>
                  </div>
                </div>
              </div>
              <button className="ml-6 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all cursor-pointer">
                Tinjau
              </button>
            </div>

            {/* Item 2: Lowongan Kerja */}
            <div className="p-5 border border-fourth rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 bg-fourth rounded-xl text-third group-hover:text-primary transition-colors">
                  <Briefcase size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-primary">
                      Persetujuan Lowongan Kerja Menunggu
                    </h4>
                    <span className="text-2xl font-bold text-primary">18</span>
                  </div>
                  <p className="text-xs text-third mb-3">
                    postingan Lowongan kerja yang Menunggu
                  </p>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary/40 h-full w-[45%] rounded-full"></div>
                  </div>
                </div>
              </div>
              <button className="ml-6 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all cursor-pointer">
                Tinjau
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-fourth rounded-2xl p-6 shadow-sm">as</div>
    </div>
  );
}
