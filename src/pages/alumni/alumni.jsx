import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  LineChart, 
  MoreVertical, 
  ArrowRight,
  Building2
} from 'lucide-react';
import Navbar from '../../components/alumni/Navbar';
import Pagination from '../../components/admin/Pagination';
import SmoothDropdown from '../../components/admin/SmoothDropdown';

// --- MOCK DATA ---
const ALUMNI_DATA = [
  { id: 1, name: 'Jane Doe', angkatan: '2019', role: 'Software Engineer', company: 'TechCorp Inc.', status: 'Bekerja', image: 'https://i.pravatar.cc/150?u=jane', isOnline: true },
  { id: 2, name: 'John Smith', angkatan: '2022', role: 'MBA Candidate', company: 'Harvard University', status: 'Kuliah', image: 'https://i.pravatar.cc/150?u=john', isOnline: false },
  { id: 3, name: 'Alice Johnson', angkatan: '2020', role: 'Founder & CEO', company: 'NextGen Solutions', status: 'Wirausaha', image: 'https://i.pravatar.cc/150?u=alice', isOnline: true },
  { id: 4, name: 'Bob Brown', angkatan: '2018', role: 'Product Manager', company: 'Innovate LLC', status: 'Bekerja', image: null, isOnline: false },
  { id: 5, name: 'Charlie Davis', angkatan: '2021', role: 'Data Analyst', company: 'Mencari Pekerjaan', status: 'Mencari', image: 'https://i.pravatar.cc/150?u=charlie', isOnline: true },
  { id: 6, name: 'Sarah Lee', angkatan: '2017', role: 'Product Designer', company: 'Creative Studio', status: 'Bekerja', image: 'https://i.pravatar.cc/150?u=sarah', isOnline: false },
];

// Helper warna & ikon status
const getStatusStyle = (status) => {
  switch (status) {
    case 'Bekerja': return { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: <Briefcase size={16} /> };
    case 'Kuliah': return { bg: 'bg-blue-100', text: 'text-blue-700', icon: <GraduationCap size={16} /> };
    case 'Wirausaha': return { bg: 'bg-purple-100', text: 'text-purple-700', icon: <Rocket size={16} /> };
    case 'Mencari Pekerjaan': 
    case 'Mencari': return { bg: 'bg-amber-100', text: 'text-amber-700', icon: <LineChart size={16} /> };
    default: return { bg: 'bg-slate-100', text: 'text-slate-700', icon: <Briefcase size={16} /> };
  }
};

// --- OPSI DROPDOWN (Hanya String Array sesuai struktur SmoothDropdown) ---
const tahunOptions = ['Semua Tahun', '2023', '2022', '2021', '2020'];
const statusOptions = ['Semua Status', 'Bekerja', 'Kuliah', 'Wirausaha', 'Mencari Pekerjaan'];
const univOptions = ['Semua Universitas', 'Universitas Indonesia', 'Institut Teknologi Bandung', 'Universitas Gadjah Mada'];

export default function Alumni() {
  const user = { nama_alumni: 'User Test' }; 
  const [viewMode, setViewMode] = useState('grid');
  
  // State untuk Filter Dropdown
  const [selectedTahun, setSelectedTahun] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedUniv, setSelectedUniv] = useState('');

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Fungsi Reset Filter
  const handleResetFilters = () => {
    setSelectedTahun('');
    setSelectedStatus('');
    setSelectedUniv('');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar user={user} />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 pb-16">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Direktori Alumni</h1>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl">
              Terhubung dengan para lulusan dan perluas jaringan profesional Anda.
            </p>
          </div>

          <div className="flex bg-slate-200/60 p-1 rounded-xl shrink-0">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <List size={18} /> <span className="hidden sm:inline">Daftar</span>
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'grid' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid size={18} /> <span className="hidden sm:inline">Kotak</span>
            </button>
          </div>
        </div>

        {/* --- FILTER & SEARCH SECTION --- */}
        <div className="flex flex-col xl:flex-row gap-4 mb-10 z-10 relative">
          
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="cari berdasarkan nama, perusahaan, atau peran..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3C5759]/20 focus:border-[#3C5759] transition-all h-[52px]"
            />
          </div>

          {/* MENGGUNAKAN SMOOTHDROPDOWN ASLI */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <div className="w-44">
              <SmoothDropdown 
                options={tahunOptions} 
                value={selectedTahun} 
                onSelect={(val) => setSelectedTahun(val === 'Semua Tahun' ? '' : val)}
                placeholder="Tahun Kelulusan"
              />
            </div>
            
            <div className="w-48">
              <SmoothDropdown 
                options={statusOptions} 
                value={selectedStatus} 
                onSelect={(val) => setSelectedStatus(val === 'Semua Status' ? '' : val)}
                placeholder="Status Pekerjaan"
              />
            </div>

            <div className="w-52">
              <SmoothDropdown 
                options={univOptions} 
                value={selectedUniv} 
                onSelect={(val) => setSelectedUniv(val === 'Semua Universitas' ? '' : val)}
                placeholder="Universitas"
                isSearchable={true} // Karena di komponenmu ada fitur ini
              />
            </div>

            <button 
              onClick={handleResetFilters}
              className="w-[52px] h-[52px] flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shrink-0" 
              title="Reset Filters"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* --- ALUMNI CARDS GRID --- */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {ALUMNI_DATA.map((alumni) => {
            const statusStyle = getStatusStyle(alumni.status);
            
            return (
              <div key={alumni.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {alumni.image ? (
                        <img src={alumni.image} alt={alumni.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-50" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg border-2 border-slate-50">
                          {alumni.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      {alumni.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{alumni.name}</h3>
                      <p className="text-xs font-medium text-slate-400">Angkatan {alumni.angkatan}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="space-y-3 mb-8 pl-1">
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="text-slate-400">{statusStyle.icon}</div>
                    <p className="text-sm font-bold">{alumni.role}</p>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="text-slate-400"><Building2 size={16} /></div>
                    <p className="text-sm">{alumni.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${statusStyle.bg} ${statusStyle.text}`}>
                    {alumni.status}
                  </span>
                  
                  <button className="flex items-center gap-1.5 text-sm font-bold text-slate-500 group-hover:text-[#3C5759] transition-colors cursor-pointer">
                    Lihat Profil <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- PAGINATION ASLI --- */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

      </main>
    </div>
  );
}