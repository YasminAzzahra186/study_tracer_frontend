import React from 'react';
import { 
  Eye, Edit, AlertCircle, Mail, Phone, Plus, User, Briefcase, Award, ChevronDown
} from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

import Navbar from '../../components/alumni/Navbar';
import Footer from '../../components/alumni/Footer';

// --- FULL DUMMY DATA ---
const DUMMY_USER = {
  name: "Alex Morgan",
  angkatan: "2019",
  jurusan: "Akuntansi",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 123-4567",
  image: "https://i.pravatar.cc/300?u=alex",
  sosial: {
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexm"
  },
  detail: {
    namaLengkap: "Alex Morgan",
    nis: "12345678",
    nisn: "0012345678",
    tempatLahir: "San Francisco",
    tanggalLahir: "05/15/1996",
    jenisKelamin: "Male",
    alamat: "Dusun Sambong, Desa Purwosari, Kec. Purwosari, Kab. Bojonegoro, Jawa Timur"
  }
};

export default function Profil() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Data Navbar
  const navUser = {
    nama_alumni: DUMMY_USER.name,
    foto: DUMMY_USER.image,
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans flex flex-col">
      <Navbar user={navUser} />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-28 pb-16">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#3C5759] tracking-tight mb-1">
              Profil Saya
            </h1>
            <p className="text-[#3C5759]/70 text-sm font-medium">
              Kelola informasi pribadi dan pencapaian karier Anda
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#3C5759]/20 text-[#3C5759] rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all cursor-pointer">
              <Eye size={16} /> Lihat Profil Publik
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#3C5759] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#2A3E3F] transition-all cursor-pointer">
              <Edit size={16} /> Perbarui Profil
            </button>
          </div>
        </div>

        {/* --- ALERT BOX --- */}
        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-3 mb-8 shadow-sm">
          <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-800 mb-0.5">Kebijakan Pembaruan</h3>
            <p className="text-xs text-amber-700/80 font-medium">
              Pembaruan pada profil Anda memerlukan persetujuan Admin dan tidak akan langsung ditampilkan di direktori publik
            </p>
          </div>
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- SIDEBAR KIRI --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm text-center">
              <div className="relative w-32 h-32 mx-auto mb-5">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-50 shadow-inner">
                  <img src={DUMMY_USER.image} alt={DUMMY_USER.name} className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#3C5759] rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-[#2A3E3F] transition-colors cursor-pointer shadow-md">
                  <Edit size={14} />
                </button>
              </div>

              <h2 className="text-xl font-black text-[#3C5759] mb-1">{DUMMY_USER.name}</h2>
              <p className="text-sm font-semibold text-[#3C5759]/60 mb-6">
                Angkatan {DUMMY_USER.angkatan} • {DUMMY_USER.jurusan}
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-100 text-left">
                <div className="flex items-center gap-3 text-[#3C5759]/70">
                  <Mail size={16} className="shrink-0" />
                  <span className="text-sm font-medium truncate">{DUMMY_USER.email}</span>
                </div>
                <div className="flex items-center gap-3 text-[#3C5759]/70">
                  <Phone size={16} className="shrink-0" />
                  <span className="text-sm font-medium">{DUMMY_USER.phone}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-base font-black text-[#3C5759] mb-5">Tautan Sosial</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-[#3C5759]/70 truncate pr-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <FaLinkedin size={16} />
                    </div>
                    <span className="text-sm font-medium truncate">{DUMMY_USER.sosial.linkedin}</span>
                  </div>
                  <button className="text-slate-300 hover:text-[#3C5759] transition-colors cursor-pointer">
                    <Edit size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-[#3C5759]/70 truncate pr-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <FaGithub size={16} />
                    </div>
                    <span className="text-sm font-medium truncate">{DUMMY_USER.sosial.github}</span>
                  </div>
                  <button className="text-slate-300 hover:text-[#3C5759] transition-colors cursor-pointer">
                    <Edit size={14} />
                  </button>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold text-[#3C5759]/60 hover:text-[#3C5759] transition-colors cursor-pointer">
                <Plus size={16} /> Tambahkan tautan sosial
              </button>
            </div>
          </div>

          {/* --- KONTEN KANAN --- */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            
            {/* TABS */}
            <div className="flex border-b border-slate-100 px-2 overflow-x-auto hide-scrollbar">
              <button 
                onClick={() => navigate('/profil')}
                className={`flex items-center gap-2 px-6 py-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  location.pathname === '/profil' ? 'border-[#3C5759] text-[#3C5759]' : 'border-transparent text-slate-400 hover:text-[#3C5759]/70 hover:bg-slate-50'
                }`}
              >
                <User size={16} /> Detail Pribadi
              </button>
              <button 
                onClick={() => navigate('/profil2')}
                className={`flex items-center gap-2 px-6 py-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  location.pathname === '/profil2' ? 'border-[#3C5759] text-[#3C5759]' : 'border-transparent text-slate-400 hover:text-[#3C5759]/70 hover:bg-slate-50'
                }`}
              >
                <Briefcase size={16} /> Status Karier
              </button>
              <button 
                onClick={() => navigate('/profil3')}
                className={`flex items-center gap-2 px-6 py-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  location.pathname === '/profil3' ? 'border-[#3C5759] text-[#3C5759]' : 'border-transparent text-slate-400 hover:text-[#3C5759]/70 hover:bg-slate-50'
                }`}
              >
                <Award size={16} /> Keahlian
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-8 md:p-10 flex-1">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2">Nama Lengkap</label>
                  <input type="text" readOnly value={DUMMY_USER.detail.namaLengkap} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-[#3C5759] focus:outline-none" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2">NIS</label>
                    <input type="text" readOnly value={DUMMY_USER.detail.nis} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-[#3C5759] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2">NISN</label>
                    <input type="text" readOnly value={DUMMY_USER.detail.nisn} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-[#3C5759] focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2">Tempat Lahir</label>
                    <input type="text" readOnly value={DUMMY_USER.detail.tempatLahir} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-[#3C5759] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2">Tanggal Lahir</label>
                    <input type="text" readOnly value={DUMMY_USER.detail.tanggalLahir} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-[#3C5759] focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2">Jenis Kelamin</label>
                  <div className="relative">
                    <select disabled className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-[#3C5759] appearance-none focus:outline-none" defaultValue={DUMMY_USER.detail.jenisKelamin}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3C5759]/50 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#3C5759]/40 uppercase tracking-widest mb-2">Alamat</label>
                  <textarea readOnly rows="3" value={DUMMY_USER.detail.alamat} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-[#3C5759] focus:outline-none resize-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />
    </div>
  );
}