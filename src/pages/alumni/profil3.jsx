import React, { useState } from 'react';
import { 
  Eye, 
  Save, 
  AlertCircle, 
  Mail, 
  Phone, 
  Plus, 
  User, 
  Briefcase, 
  Award, 
  Search, 
  X, 
  ShieldCheck, 
  CheckCircle2,
  Edit // <--- INI YANG SEBELUMNYA TERLEWAT
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
  keahlian: {
    hardSkills: ['React.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Python'],
    softSkills: ['Team Leadership', 'Public Speaking', 'Problem Solving'],
    verifiedSkills: ['Data Structures', 'Algorithms', 'Object Oriented Programming', 'Database Management']
  }
};

export default function Profil3() {
  const navigate = useNavigate();
  const location = useLocation();

  const navUser = {
    nama_alumni: DUMMY_USER.name,
    foto: DUMMY_USER.image,
  };

  // State Keahlian
  const [hardSkills, setHardSkills] = useState(DUMMY_USER.keahlian.hardSkills);
  const [softSkills, setSoftSkills] = useState(DUMMY_USER.keahlian.softSkills);
  const verifiedSkills = DUMMY_USER.keahlian.verifiedSkills;

  const removeHardSkill = (skillToRemove) => {
    setHardSkills(hardSkills.filter(skill => skill !== skillToRemove));
  };
  const removeSoftSkill = (skillToRemove) => {
    setSoftSkills(softSkills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans flex flex-col">
      <Navbar user={navUser} />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-28 pb-16">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#3C5759] tracking-tight mb-1">Profil Saya</h1>
            <p className="text-[#3C5759]/70 text-sm font-medium">Kelola informasi pribadi dan pencapaian karier Anda</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#3C5759]/20 text-[#3C5759] rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all cursor-pointer">
              <Eye size={16} /> Lihat Profil Publik
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#3C5759] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#2A3E3F] transition-all cursor-pointer">
              <Save size={16} /> Simpan Perubahan
            </button>
          </div>
        </div>

        {/* --- ALERT BOX --- */}
        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-3 mb-8 shadow-sm">
          <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-800 mb-0.5">Kebijakan Pembaruan</h3>
            <p className="text-xs text-amber-700/80 font-medium">Pembaruan pada profil Anda memerlukan persetujuan Admin dan tidak akan langsung ditampilkan di direktori publik</p>
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
              <p className="text-sm font-semibold text-[#3C5759]/60 mb-6">Angkatan {DUMMY_USER.angkatan} • {DUMMY_USER.jurusan}</p>
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
              <h3 className="text-base font-black text-[#3C5759] mb-5">Social Links</h3>
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
                <Plus size={16} /> Add Personal Website
              </button>
            </div>
          </div>

          {/* --- KONTEN KANAN --- */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            
            {/* TABS */}
            <div className="flex border-b border-slate-100 px-2 overflow-x-auto hide-scrollbar">
              <button onClick={() => navigate('/profil')} className={`flex items-center gap-2 px-6 py-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${location.pathname === '/profil' ? 'border-[#3C5759] text-[#3C5759]' : 'border-transparent text-slate-400 hover:text-[#3C5759]/70 hover:bg-slate-50'}`}>
                <User size={16} /> Detail Pribadi
              </button>
              <button onClick={() => navigate('/profil2')} className={`flex items-center gap-2 px-6 py-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${location.pathname === '/profil2' ? 'border-[#3C5759] text-[#3C5759]' : 'border-transparent text-slate-400 hover:text-[#3C5759]/70 hover:bg-slate-50'}`}>
                <Briefcase size={16} /> Status Karier
              </button>
              <button onClick={() => navigate('/profil3')} className={`flex items-center gap-2 px-6 py-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${location.pathname === '/profil3' ? 'border-[#3C5759] text-[#3C5759]' : 'border-transparent text-slate-400 hover:text-[#3C5759]/70 hover:bg-slate-50'}`}>
                <Award size={16} /> Keahlian
              </button>
            </div>

            {/* CONTENT KEAHLIAN */}
            <div className="p-8 md:p-10 flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-[#3C5759]">
                  <Award size={22} className="stroke-[2.5]" />
                  <h2 className="text-xl font-black tracking-tight">Keahlian & Keahlian Khusus</h2>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#3C5759] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#2A3E3F] transition-all cursor-pointer">
                  <Plus size={14} /> Tambah Keahlian
                </button>
              </div>

              {/* 1. Keahlian Teknis */}
              <div className="mb-10">
                <h3 className="text-[15px] font-bold text-[#3C5759] mb-1">Keahlian Teknis</h3>
                <p className="text-sm text-[#3C5759]/60 mb-4">Tambahkan kemahiran teknis Anda seperti bahasa pemrograman, kerangka kerja, dan alat.</p>
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Cari atau tambah keahlian teknis (contoh: JavaScript, AWS, Figma)..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3C5759]/20 focus:border-[#3C5759] text-[#3C5759]" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {hardSkills.map((skill, idx) => (
                    <span key={idx} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">
                      {skill}
                      <button onClick={() => removeHardSkill(skill)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Soft Skills */}
              <div className="mb-10">
                <h3 className="text-[15px] font-bold text-[#3C5759] mb-1">Keahlian Interpersonal (Soft Skills)</h3>
                <p className="text-sm text-[#3C5759]/60 mb-4">Soroti atribut interpersonal dan profesional Anda.</p>
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Cari atau tambah soft skill (contoh: Kepemimpinan, Komunikasi)..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3C5759]/20 focus:border-[#3C5759] text-[#3C5759]" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, idx) => (
                    <span key={idx} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">
                      {skill}
                      <button onClick={() => removeSoftSkill(skill)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Keahlian Terverifikasi */}
              <div className="bg-green-50/50 border border-green-100 rounded-[1.5rem] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck size={20} className="text-green-600" />
                  <h3 className="text-[15px] font-bold text-green-800">Keahlian Terverifikasi</h3>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Disertifikasi oleh Institusi</span>
                </div>
                <p className="text-sm text-green-700/70 mb-5">Keahlian ini telah diverifikasi berdasarkan transkrip akademik dan penilaian proyek Anda.</p>
                <div className="flex flex-wrap gap-2">
                  {verifiedSkills.map((skill, idx) => (
                    <span key={idx} className="flex items-center gap-1.5 px-3.5 py-2 bg-green-50 border border-green-200 rounded-xl text-sm font-bold text-green-700 shadow-sm">
                      <CheckCircle2 size={14} className="text-green-600" />
                      {skill}
                    </span>
                  ))}
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