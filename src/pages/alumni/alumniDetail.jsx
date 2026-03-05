import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  MapPin,
  Rocket,
  LineChart,
  Users,
  Building2,
} from 'lucide-react';
import Navbar from '../../components/alumni/Navbar';
import Footer from '../../components/alumni/Footer';
import { useAuth } from '../../context/AuthContext';
import { STORAGE_BASE_URL } from '../../api/axios';

function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${STORAGE_BASE_URL}/${path}`;
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'Kuliah': return <GraduationCap size={18} className="text-[#3C5759]/40" />;
    case 'Wirausaha': return <Rocket size={18} className="text-[#3C5759]/40" />;
    case 'Mencari Pekerjaan':
    case 'Mencari': return <LineChart size={18} className="text-[#3C5759]/40" />;
    case 'Bekerja':
    default: return <Briefcase size={18} className="text-[#3C5759]/40" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Bekerja': return 'bg-emerald-500';
    case 'Kuliah': return 'bg-blue-500';
    case 'Wirausaha': return 'bg-amber-500';
    case 'Mencari Pekerjaan':
    case 'Mencari': return 'bg-orange-500';
    default: return 'bg-slate-500';
  }
};

export default function AlumniDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser } = useAuth();

  // Get alumni data from navigation state (passed from directory)
  const alumni = location.state?.alumni;

  const namaAlumni = authUser?.alumni?.nama_alumni || 'Alumni';
  const navUser = {
    nama_alumni: namaAlumni,
    foto: authUser?.alumni?.foto,
    can_access_all: true,
  };

  // If no data (direct URL access without state), show fallback
  if (!alumni) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] font-sans flex flex-col">
        <Navbar user={navUser} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-6">
            <Users size={56} className="text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-[#3C5759] mb-2">Data Alumni Tidak Tersedia</h2>
            <p className="text-sm text-[#3C5759]/60 font-medium mb-6 max-w-md">
              Silakan akses profil alumni melalui halaman Direktori Alumni untuk melihat detail profil.
            </p>
            <button
              onClick={() => navigate('/alumni')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#3C5759] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#2A3E3F] transition-all cursor-pointer"
            >
              <ArrowLeft size={16} /> Ke Direktori Alumni
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const imageSrc = alumni.foto ? getImageUrl(alumni.foto) : null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans flex flex-col">
      <Navbar user={navUser} />

      {/* --- BACKGROUND HERO --- */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-[#3C5759] via-[#4A6B6D] to-[#2A3E3F] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>
        <svg className="absolute bottom-0 left-0 w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#f8f9fa" d="M0,60L120,55C240,50,480,40,720,42C960,44,1200,58,1320,65L1440,72L1440,100L0,100Z" />
        </svg>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-20 -mt-32 pb-20">

        {/* PROFILE HEADER CARD */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 md:p-10 mb-10">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative shrink-0">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-3xl border-8 border-white shadow-2xl overflow-hidden bg-slate-50">
                {imageSrc ? (
                  <img src={imageSrc} alt={alumni.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-black text-[#3C5759]/20 bg-[#3C5759]/5">
                    {alumni.name?.charAt(0) || 'A'}
                  </div>
                )}
              </div>
              <div className={`absolute -bottom-3 -right-3 ${getStatusColor(alumni.status)} text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border-4 border-white`}>
                {alumni.status || 'Alumni'}
              </div>
            </motion.div>

            <div className="flex-1">
              <motion.button
                whileHover={{ x: -3 }}
                onClick={() => navigate('/alumni')}
                className="flex items-center gap-2 text-[#3C5759]/40 hover:text-[#3C5759] text-xs font-bold uppercase tracking-widest mb-4 transition-all cursor-pointer"
              >
                <ArrowLeft size={14} /> Kembali ke Direktori
              </motion.button>

              <h1 className="text-3xl md:text-5xl font-black text-[#3C5759] tracking-tight leading-none mb-3">
                {alumni.name}
              </h1>
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm font-bold text-[#3C5759]/60">
                {alumni.role && alumni.role !== '-' && (
                  <span className="flex items-center gap-2">
                    {getStatusIcon(alumni.status)} {alumni.role}
                    {alumni.company && alumni.company !== '-' && (
                      <> di <span className="text-[#3C5759]">{alumni.company}</span></>
                    )}
                  </span>
                )}
                {alumni.jurusan && (
                  <span className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-[#3C5759]/30" /> {alumni.jurusan}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#3C5759]/30" /> Angkatan {alumni.angkatan}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* SIDEBAR KIRI */}
          <div className="lg:col-span-4 space-y-8">
            {/* Status Karier Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xs font-black text-[#3C5759]/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                {getStatusIcon(alumni.status)} Status Karier
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(alumni.status)}`} />
                    <span className="text-sm font-bold text-[#3C5759]">{alumni.status || '-'}</span>
                  </div>
                </div>
                {alumni.role && alumni.role !== '-' && (
                  <div>
                    <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-1">Posisi / Peran</p>
                    <span className="text-sm font-bold text-[#3C5759]">{alumni.role}</span>
                  </div>
                )}
                {alumni.company && alumni.company !== '-' && (
                  <div>
                    <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-1">
                      {alumni.status === 'Kuliah' ? 'Universitas' : alumni.status === 'Wirausaha' ? 'Nama Usaha' : 'Perusahaan'}
                    </p>
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-[#3C5759]/40" />
                      <span className="text-sm font-bold text-[#3C5759]">{alumni.company}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Info Akademik */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xs font-black text-[#3C5759]/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <GraduationCap size={14} /> Informasi Akademik
              </h2>
              <div className="space-y-4">
                {alumni.jurusan && (
                  <div>
                    <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-1">Jurusan</p>
                    <span className="text-sm font-bold text-[#3C5759]">{alumni.jurusan}</span>
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-1">Angkatan</p>
                  <span className="text-sm font-bold text-[#3C5759]">{alumni.angkatan}</span>
                </div>
              </div>
            </div>
          </div>

          {/* KONTEN KANAN */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-[#3C5759] tracking-tight flex items-center gap-3 mb-6">
                <Users size={22} /> Profil Alumni
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-2">Nama Lengkap</p>
                  <p className="text-lg font-black text-[#3C5759]">{alumni.name}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-2">Status Karier</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(alumni.status)}`} />
                    <p className="text-lg font-black text-[#3C5759]">{alumni.status || '-'}</p>
                  </div>
                </div>
                {alumni.role && alumni.role !== '-' && (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-2">Posisi / Peran</p>
                    <p className="text-lg font-black text-[#3C5759]">{alumni.role}</p>
                  </div>
                )}
                {alumni.company && alumni.company !== '-' && (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-2">
                      {alumni.status === 'Kuliah' ? 'Universitas' : alumni.status === 'Wirausaha' ? 'Nama Usaha' : 'Perusahaan'}
                    </p>
                    <p className="text-lg font-black text-[#3C5759]">{alumni.company}</p>
                  </div>
                )}
                {alumni.jurusan && (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-2">Jurusan</p>
                    <p className="text-lg font-black text-[#3C5759]">{alumni.jurusan}</p>
                  </div>
                )}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-[10px] font-black text-[#3C5759]/30 uppercase tracking-widest mb-2">Angkatan</p>
                  <p className="text-lg font-black text-[#3C5759]">{alumni.angkatan}</p>
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-[#3C5759]/5 rounded-2xl p-6 border border-[#3C5759]/10">
              <p className="text-sm text-[#3C5759]/60 font-medium text-center">
                Informasi detail seperti riwayat karier, keahlian, dan kontak hanya dapat dilihat oleh pemilik profil.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
