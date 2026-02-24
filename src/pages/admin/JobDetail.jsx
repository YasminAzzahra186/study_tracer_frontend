import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Briefcase, 
  Clock, 
  Calendar, 
  Building2, 
  Share2, 
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { STORAGE_BASE_URL } from '../../api/axios';
import banner from '../../assets/banner.jfif';

const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/lowongan/${id}`);
        setJob(res.data?.data || res.data);
      } catch (err) {
        setError('Lowongan tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#3C5759]" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4">
        <AlertCircle size={48} className="text-gray-400" />
        <p className="text-gray-500 font-medium">{error || 'Lowongan tidak ditemukan'}</p>
        <button onClick={() => navigate(-1)} className="text-[#3C5759] font-semibold hover:underline">
          Kembali
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-600';
      case 'draft': return 'bg-gray-100 text-gray-600';
      case 'closed': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getApprovalLabel = (status) => {
    switch (status) {
      case 'approved': return 'DISETUJUI';
      case 'pending': return 'MENUNGGU';
      case 'rejected': return 'DITOLAK';
      default: return status?.toUpperCase();
    }
  };

  const fotoUrl = job.foto 
    ? (job.foto.startsWith('http') ? job.foto : `${STORAGE_BASE_URL}/${job.foto}`)
    : banner;

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
              <img src={fotoUrl} alt="Lowongan" className="w-full h-full object-cover" onError={(e) => { e.target.src = banner; }} />
            </div>
            <div className="p-8 -mt-12 relative">
              <div className="bg-white p-4 rounded-2xl shadow-md inline-block border border-gray-100 mb-4">
                <Building2 size={40} className="text-[#3C5759]" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-[#3C5759]">{job.judul}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-500 font-medium">
                    <Building2 size={18} />
                    <span>{job.perusahaan?.nama || '-'}</span>
                    <span className="mx-1">•</span>
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${getStatusColor(job.status)}`}>
                      {job.status?.toUpperCase()}
                    </span>
                    {job.approval_status && (
                      <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${
                        job.approval_status === 'approved' ? 'bg-green-100 text-green-600' :
                        job.approval_status === 'pending' ? 'bg-orange-100 text-orange-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {getApprovalLabel(job.approval_status)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi Pekerjaan */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
            <section>
              <h2 className="text-xl font-black text-[#3C5759] mb-4">Deskripsi Pekerjaan</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.deskripsi || 'Tidak ada deskripsi.'}</p>
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
                  <p className="text-sm font-bold">{job.lokasi || job.perusahaan?.kota?.nama || '-'}</p>
                </div>
              </div>
              {job.tipe_pekerjaan && (
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-3 bg-gray-50 rounded-xl text-[#3C5759]"><Clock size={20} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Tipe Pekerjaan</p>
                    <p className="text-sm font-bold">{job.tipe_pekerjaan}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 text-gray-600">
                <div className="p-3 bg-gray-50 rounded-xl text-[#3C5759]"><Calendar size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Batas Melamar</p>
                  <p className="text-sm font-bold">{job.lowongan_selesai || '-'}</p>
                </div>
              </div>
              {job.perusahaan?.nama && (
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-3 bg-gray-50 rounded-xl text-[#3C5759]"><Briefcase size={20} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Perusahaan</p>
                    <p className="text-sm font-bold">{job.perusahaan.nama}</p>
                  </div>
                </div>
              )}
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