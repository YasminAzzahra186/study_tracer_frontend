import React from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Briefcase, 
  Clock, 
  Calendar, 
  Building2, 
  Share2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDetail = () => {
  const navigate = useNavigate();

  // Data dummy untuk detail lowongan
  const job = {
    title: "Senior UX Designer",
    company: "Google",
    location: "New York, NY (Remote Friendly)",
    type: "Full-time",
    category: "Design",
    postedDate: "20 Feb 2026",
    expiryDate: "24 Okt 2026",
    status: "AKTIF",
    salary: "Competitive",
    description: "Kami mencari Senior UX Designer yang berpengalaman untuk bergabung dengan tim desain kami. Anda akan bertanggung jawab untuk menciptakan pengalaman pengguna yang luar biasa bagi jutaan pengguna di seluruh dunia.",
    requirements: [
      "Minimal 5 tahun pengalaman di bidang UI/UX Design.",
      "Portofolio yang menunjukkan kemampuan pemecahan masalah desain.",
      "Mahir menggunakan Figma, Adobe Creative Suite, dan tools prototyping lainnya.",
      "Memahami dasar-dasar HTML/CSS adalah nilai tambah.",
      "Kemampuan komunikasi yang baik dalam bahasa Inggris."
    ],
    benefits: [
      "Gaji kompetitif dan bonus tahunan.",
      "Asuransi kesehatan menyeluruh.",
      "Lingkungan kerja fleksibel (Remote/Hybrid).",
      "Anggaran pengembangan profesional."
    ],
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    banner: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2070&auto=format&fit=crop"
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Tombol Kembali */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#3C5759] font-semibold transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar
        </button>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: Informasi Utama (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card Header Detail */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-48 w-full overflow-hidden">
              <img src={job.banner} alt="Office" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 -mt-12 relative">
              <div className="bg-white p-4 rounded-2xl shadow-md inline-block border border-gray-100 mb-4">
                <img src={job.logo} alt={job.company} className="w-16 h-16 object-contain" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-[#3C5759]">{job.title}</h1>
                  <div className="flex items-center gap-2 mt-2 text-gray-500 font-medium">
                    <Building2 size={18} />
                    <span>{job.company}</span>
                    <span className="mx-1">•</span>
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                      {job.status}
                    </span>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3C5759] text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-[#3C5759]/20">
                  Lamar Sekarang
                </button>
              </div>
            </div>
          </div>

          {/* Deskripsi Pekerjaan */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
            <section>
              <h2 className="text-xl font-black text-[#3C5759] mb-4">Deskripsi Pekerjaan</h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#3C5759] mb-4">Kualifikasi / Persyaratan</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 size={20} className="text-[#3C5759] mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#3C5759] mb-4">Keuntungan (Benefits)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 font-medium">
                    <div className="w-2 h-2 rounded-full bg-[#3C5759]"></div>
                    {benefit}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* KOLOM KANAN: Ringkasan & Sidebar (1/3) */}
        <div className="space-y-6">
          
          {/* Ringkasan Pekerjaan */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-black text-[#3C5759] uppercase tracking-widest text-xs">Ringkasan Pekerjaan</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="p-3 bg-gray-50 rounded-xl text-[#3C5759]"><MapPin size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Lokasi</p>
                  <p className="text-sm font-bold">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="p-3 bg-gray-50 rounded-xl text-[#3C5759]"><Clock size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Tipe Pekerjaan</p>
                  <p className="text-sm font-bold">{job.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="p-3 bg-gray-50 rounded-xl text-[#3C5759]"><Calendar size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Batas Melamar</p>
                  <p className="text-sm font-bold">{job.expiryDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="p-3 bg-gray-50 rounded-xl text-[#3C5759]"><Briefcase size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Kategori</p>
                  <p className="text-sm font-bold">{job.category}</p>
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all">
              <Share2 size={18} /> Bagikan Lowongan
            </button>
          </div>

          {/* Info Tambahan Card */}
          <div className="bg-[#3C5759] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <AlertCircle size={32} className="mb-4 text-white/40" />
              <h3 className="font-bold text-lg mb-2">Tips Melamar</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Pastikan CV dan Portofolio Anda diperbarui sebelum melamar. Sesuaikan kualifikasi Anda dengan kebutuhan perusahaan untuk hasil maksimal.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default JobDetail;