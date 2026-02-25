import React from "react";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  Printer, 
  Download,
  Quote
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function LihatJawabanDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // --- MOCK DATA ---
  const alumniProfile = {
    id: id || "1",
    nama: "Sarah Jenkins",
    nim: "2019004512",
    jurusan: "Teknik Informatika",
    tahunLulus: "2023",
    tanggalIsi: "24 Oktober 2023",
    status: "Bekerja Full Time",
    avatar: "https://i.pravatar.cc/150?u=1"
  };

  const surveyData = [
    {
      id: 1,
      pertanyaan: "Apakah pekerjaan Anda saat ini sesuai dengan jurusan saat di SMK?",
      tipe: "pilihan",
      jawabanUser: "Sangat sesuai",
      opsi: ["Sangat sesuai", "Cukup sesuai", "Kurang sesuai", "Tidak sesuai"]
    },
    {
      id: 2,
      pertanyaan: "Berapa lama waktu Anda mendapatkan pekerjaan pertama setelah lulus?",
      tipe: "pilihan",
      jawabanUser: "Kurang dari 3 bulan",
      opsi: ["Kurang dari 3 bulan", "3 - 6 Bulan", "6 - 12 Bulan", "Lebih dari 1 tahun"]
    },
    {
      id: 3,
      pertanyaan: "Bagaimana cara Anda mendapatkan pekerjaan saat ini?",
      tipe: "pilihan",
      jawabanUser: "Job portal (Jobstreet, Indeed, dll)",
      opsi: ["Melamar sendiri", "Rekomendasi dari teman/alumni", "Bursa Kerja Khusus (BKK) Sekolah", "Media Sosial", "Job portal (Jobstreet, Indeed, dll)", "Lainnya"]
    },
    {
      id: 4,
      pertanyaan: "Sebutkan nama perusahaan tempat Anda bekerja saat ini:",
      tipe: "isian",
      jawabanUser: "PT. Teknologi Nusantara Jaya",
    },
    {
      id: 5,
      pertanyaan: "Apakah perusahaan memberikan pelatihan/pengembangan skill?",
      tipe: "pilihan",
      jawabanUser: "Ya, rutin",
      opsi: ["Ya, rutin", "Ya, tetapi jarang", "Tidak pernah"]
    }
  ];

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen font-sans text-slate-700 pb-20">
      
      {/* --- HEADER NAVIGASI (KEMBALI SEPERTI SEBELUMNYA) --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar
        </button>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:text-primary hover:border-primary/30 shadow-sm transition-all">
            <Printer size={16} /> Cetak
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:opacity-90 shadow-md shadow-primary/20 transition-all">
            <Download size={16} /> Unduh PDF
          </button>
        </div>
      </div>

      {/* --- KONTEN UTAMA --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- KOLOM KIRI: Profile Alumni --- */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-8">
            {/* Header Dekoratif */}
            <div className="h-24 bg-gradient-to-r from-primary to-slate-700 relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full border-[3px] border-white shadow-md overflow-hidden bg-white">
                  <img src={alumniProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Konten Profil */}
            <div className="pt-12 pb-6 px-6 text-center">
              <h2 className="text-lg font-black text-slate-800">{alumniProfile.nama}</h2>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">NIM: {alumniProfile.nim}</p>
              
              <div className="mt-4 flex justify-center">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {alumniProfile.status}
                </span>
              </div>

              <div className="mt-6 space-y-4 text-left border-t border-slate-100 pt-6">
                <InfoItem icon={<BookOpen size={16} />} label="Jurusan" value={alumniProfile.jurusan} />
                <InfoItem icon={<Calendar size={16} />} label="Tahun Lulus" value={alumniProfile.tahunLulus} />
                <InfoItem icon={<MapPin size={16} />} label="Tanggal Pengisian" value={alumniProfile.tanggalIsi} />
              </div>
            </div>
          </div>
        </div>

        {/* --- KOLOM KANAN: Detail Jawaban --- */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-slate-800">Lembar Jawaban</h1>
              <p className="text-sm text-slate-500 mt-1">Detail respon kuesioner alumni.</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Quote size={20} />
            </div>
          </div>

          <div className="space-y-4">
            {surveyData.map((item, index) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                
                {/* Pertanyaan */}
                <div className="flex gap-4 mb-5">
                  <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full text-xs font-black border border-slate-200">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 leading-snug pt-0.5">
                    {item.pertanyaan}
                  </h3>
                </div>

                {/* Jawaban */}
                <div className="pl-11">
                  {item.tipe === "pilihan" ? (
                    <div className="grid grid-cols-1 gap-2.5">
                      {item.opsi.map((opsi, idx) => {
                        const isSelected = opsi === item.jawabanUser;
                        return (
                          <div 
                            key={idx}
                            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                              isSelected 
                                ? "bg-primary/5 border-primary shadow-sm" 
                                : "bg-white border-slate-100 text-slate-500"
                            }`}
                          >
                            {/* Custom Radio Button */}
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                              isSelected ? "border-primary bg-primary" : "border-slate-300 bg-transparent"
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                            
                            <span className={`font-medium ${isSelected ? "text-primary font-bold" : ""}`}>
                              {opsi}
                            </span>

                            {isSelected && (
                              <div className="ml-auto text-primary">
                                <CheckCircle2 size={18} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // Tampilan Isian (Textarea look)
                    <div className="relative">
                      <div className="absolute top-3 left-3 text-slate-400">
                        <Quote size={16} className="rotate-180" />
                      </div>
                      <div className="w-full p-4 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-sm leading-relaxed">
                        {item.jawabanUser}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div className="flex justify-end pt-4">
             <button 
               onClick={() => navigate(-1)} 
               className="px-6 py-2.5 bg-white border border-slate-300 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all"
             >
                Tutup Halaman
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// Komponen Kecil untuk Info Profile
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-slate-50 text-slate-400 rounded-lg shrink-0 mt-0.5">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-bold text-slate-700 leading-tight">{value}</p>
    </div>
  </div>
);