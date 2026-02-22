import React, { useState, useEffect } from "react";
import { Users, ShieldCheck, FileText, Clock } from "lucide-react";
import { ArrowRight, UserPlus, Briefcase, CheckCircle2 } from "lucide-react";
import React from "react";
import {
  Users,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  UserPlus,
  Briefcase,
  Building2,
  Store,
  Factory,
  Landmark,
} from "lucide-react";
import {
  ChartJurusan,
  ChartKarir,
  ChartsPenyelesaian,
} from "../../components/admin/Chart";

import { Building2, Store, Factory, Landmark } from 'lucide-react';
import { adminApi } from '../../api/admin';

const StatCard = ({ icon: Icon, label, value, badge, badgeColor }) => (
  <div className="bg-white p-5 md:p-6 rounded-2xl border border-fourth shadow-sm flex flex-col gap-4">
    <div className="flex flex-col gap-2 xl:flex-row md:justify-between items-start">
      <div className="p-3 bg-fourth rounded-xl text-primary flex-shrink-0">
        <Icon size={24} />
      </div>
      {badge && (
        <span
          className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold ${badgeColor} whitespace-nowrap`}
        >
          {badge}
        </span>
      )}
    </div>
    <div>
      <p className="text-third text-xs md:text-sm font-medium">{label}</p>
      <h3 className="text-xl md:text-2xl font-bold text-primary mt-1">
        {value}
      </h3>
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
      label: "Status Pekerja",
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
      badge: "Butuh Aksi",
      badgeColor: "bg-orange-100 text-orange-600",
    },
  ];

  const topCompanies = [
    {
      name: "Tech Nusantara Ltd.",
      location: "Jakarta, Indonesia",
      count: "124 Alumni",
      icon: Building2,
    },
    {
      name: "Global Innovation Inc.",
      location: "Bandung, Indonesia",
      count: "98 Alumni",
      icon: Building2,
    },
    {
      name: "Creative Digital Agency",
      location: "Remote",
      count: "76 Alumni",
      icon: Store,
    },
    {
      name: "Manufacture Pro",
      location: "Surabaya, Indonesia",
      count: "54 Alumni",
      icon: Factory,
    },
    {
      name: "State Bank Persero",
      location: "Jakarta, Indonesia",
      count: "42 Alumni",
      icon: Landmark,
    },
  ];

const geographicDist = [
  { region: "DKI Jakarta", percentage: 45 },
  { region: "Jawa Barat", percentage: 28 },
  { region: "Banten", percentage: 15 },
  { region: "Jawa Timur", percentage: 8 },
  { region: "Luar Negeri", percentage: 4 },
];

export default function Dashboard() {
  const [dashData, setDashData] = useState(null);

  useEffect(() => {
    adminApi.getDashboardStats()
      .then((res) => {
        setDashData(res.data.data || res.data);
      })
      .catch(() => {});
  }, []);

  const stats = [
    {
      label: "Total Pengguna Aktif",
      value: dashData?.total_users ?? "12,450",
      icon: Users,
      badge: dashData?.users_growth ? `+${dashData.users_growth}%` : "+12%",
      badgeColor: "bg-green-100 text-green-600",
    },
    {
      label: "Status pekerja",
      value: dashData?.worker_percentage ? `${dashData.worker_percentage}%` : "60%",
      icon: ShieldCheck,
      badge: "Optimal",
      badgeColor: "bg-fourth text-secondary",
    },
    {
      label: "Kuesioner Aktif",
      value: dashData?.active_kuesioner ?? "4",
      icon: FileText,
      badge: "Active",
      badgeColor: "bg-green-100 text-green-600",
    },
    {
      label: "Total Menunggu",
      value: dashData?.pending_count ?? "60",
      icon: Clock,
      badge: "Butuh Akasi",
      badgeColor: "bg-orange-100 text-orange-600",
    },
  const geographicDist = [
    { region: "DKI Jakarta", percentage: 45 },
    { region: "Jawa Barat", percentage: 28 },
    { region: "Banten", percentage: 15 },
    { region: "Jawa Timur", percentage: 8 },
    { region: "Luar Negeri", percentage: 4 },
  ];

  return (
    <div className="space-y-6 max-w-full overflow-hidden p-1">
      {/* 1. Stats Grid - 2 kolom di HP, 4 di Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* 2. Section Pendaftaran Alumni */}
      <div className="bg-white border border-fourth rounded-2xl p-4 md:p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-primary leading-tight">
            Pendaftaran Alumni yang Menunggu
          </h2>
          <button className="flex items-center gap-2 text-primary font-semibold text-xs md:text-sm hover:underline cursor-pointer flex-shrink-0">
            Semua <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Chart Penyelesaian - Tengah di HP */}
          <div className="flex justify-center items-center">
            <ChartsPenyelesaian />
          </div>

          {/* List Tinjauan - Responsive Flex */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                title: "Pendaftaran Alumni Menunggu",
                count: 42,
                sub: "Permintaan akun baru menunggu verifikasi",
                icon: UserPlus,
                progress: "w-[70%]",
              },
              {
                title: "Lowongan Kerja Menunggu",
                count: 18,
                sub: "Postingan lowongan kerja yang menunggu",
                icon: Briefcase,
                progress: "w-[45%]",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 md:p-5 border border-fourth rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-primary/30 transition-all"
              >
                <div className="flex items-start md:items-center gap-4 w-full">
                  <div className="p-3 bg-fourth rounded-xl text-third group-hover:text-primary flex-shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-primary text-sm md:text-base truncate mr-2">
                        {item.title}
                      </h4>
                      <span className="text-xl md:text-2xl font-bold text-primary">
                        {item.count}
                      </span>
                    </div>
                    <p className="text-[11px] md:text-xs text-third mb-3 line-clamp-1">
                      {item.sub}
                    </p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`bg-primary/40 h-full ${item.progress} rounded-full`}
                      ></div>
                    </div>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all cursor-pointer">
                  Tinjau
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Profil & Statistik Alumni */}
      {/* --- POTONGAN KODE BAGIAN PROFIL & STATISTIK ALUMNI --- */}

      <div className="bg-white border border-fourth rounded-2xl p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
          <h2 className="text-lg md:text-xl font-bold text-primary">
            Profil & Statistik Alumni
          </h2>
          <div className="px-3 py-1 bg-fourth text-primary rounded-xl border flex-shrink-0">
            <p className="text-[10px] md:text-xs font-medium">
              Perbaruan Hari ini
            </p>
          </div>
        </div>

        {/* Grid Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Status Karir - Tanpa Scroll */}
          <div className="w-full flex flex-col items-center">
            <h1 className="text-primary text-base md:text-lg font-bold mb-4 text-center">
              Status Karir
            </h1>
            {/* Container chart dipastikan responsive tanpa overflow */}
            <div className="w-full max-w-[300px] lg:max-w-full">
              <ChartKarir />
            </div>
          </div>

          {/* Top 5 Alumni - Tanpa Scroll */}
          <div className="w-full lg:col-span-2">
            <h1 className="text-primary text-base md:text-lg font-bold mb-4 text-center lg:text-left">
              Top 5 Alumni Setiap Jurusan
            </h1>
            <div className="w-full">
              <ChartJurusan />
            </div>
          </div>
        </div>

        {/* Footer Stats Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-5">
          {/* 5 Perusahaan Perekrut Teratas */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-primary">
              5 Perusahaan Perekrut Teratas
            </h2>
            <div className="bg-white border border-fourth rounded-2xl overflow-hidden shadow-sm h-fit">
              {topCompanies.map((company, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 hover:bg-fourth/30 transition-colors ${index !== topCompanies.length - 1 ? "border-b border-fourth" : ""}`}
                >
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    <div className="p-2 bg-fourth rounded-lg text-third flex-shrink-0">
                      <company.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-primary text-xs md:text-sm truncate">
                        {company.name}
                      </h4>
                      <p className="text-third text-[10px] truncate">
                        {company.location}
                      </p>
                    </div>
                  </div>
                  <span className="bg-fourth text-primary px-3 py-1 rounded-full text-[9px] font-bold flex-shrink-0 ml-2">
                    {company.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Distribusi Geografis - Diperbaiki agar tidak offset */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-primary">
              Distribusi Geografis
            </h2>
            {/* Hapus h-full dan justify-between, ganti dengan gap-5 */}
            <div className="bg-white border border-fourth rounded-2xl p-5 md:p-8 shadow-sm flex flex-col gap-5 h-fit">
              {geographicDist.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="font-bold text-primary uppercase tracking-wider">
                      {item.region}
                    </span>
                    <span className="text-third font-medium">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-fourth h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
