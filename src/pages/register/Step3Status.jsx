import React, { useState } from 'react';
import { Briefcase, GraduationCap, Store, Search, CheckCircle, ArrowLeft } from 'lucide-react';
import SmoothDropdown from '../../components/admin/SmoothDropdown';
import InputDropdownEdit from '../../components/InputDropdownEdit';
import YearsInput from '../../components/YearsInput';
import LocationSelector from '../../components/LocationSelector';
import UniversitySelector from '../../components/UniversitasSelector';

export default function Step3Status({ onBack }) {
  const [selectedStatus, setSelectedStatus] = useState('Bekerja');

  const options = [
    { id: 'Bekerja', label: 'Bekerja', sub: '(Working)', icon: Briefcase },
    { id: 'Kuliah', label: 'Kuliah', sub: '(Studying)', icon: GraduationCap },
    { id: 'Wirausaha', label: 'Wirausaha', sub: '(Entrepreneur)', icon: Store },
    { id: 'Mencari Kerja', label: 'Mencari Kerja', sub: '(Unemployed)', icon: Search },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h3 className="font-bold text-primary mb-1">Seperti apa karir anda sekarang? <span className="text-red-500">*</span></h3>
      </div>

      {/* Cards Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedStatus(option.id)}
            className={`relative p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedStatus === option.id
              ? 'border-primary bg-fourth/20 border-dashed'
              : 'border-fourth border-dashed hover:border-primary/40'
            }`}
          >
            {selectedStatus === option.id && (
              <div className="absolute top-2 right-2 text-primary">
                <CheckCircle size={16} fill="currentColor" className="text-white fill-primary" />
              </div>
            )}
            <option.icon size={28} className={selectedStatus === option.id ? 'text-primary' : 'text-third'} />
            <div className="text-center">
              <p className={`text-sm font-bold ${selectedStatus === option.id ? 'text-primary' : 'text-secondary'}`}>{option.label}</p>
              <p className="text-[10px] text-third">{option.sub}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Dynamic Form based on Selection */}
      <div className="p-4 md:p-8 border border-third border-dashed rounded-2xl bg-gray-50/50">
        {selectedStatus === 'Bekerja' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

            {/* Nama Pekerjaan*/}
            <div className="space-y-1">
              <InputDropdownEdit
                label="Pekerjaan Sekarang"
                options={["UI/UX", "DevOps", "Cloud Engginering", "Karyawan"]}
                placeholder="Masukkan nama pekerjaan anda"
                isRequired={true}
              />
            </div>

            {/* Nama Perusahaan*/}
            <div className="space-y-1">
              <InputDropdownEdit
                label="Nama Perusahaan"
                options={["Hummatech", "Pertamina", "Telkom", "PT. Ardhi Jaya"]}
                placeholder="Masukkan nama perusahaan "
                isRequired={true}
              />
            </div>

            {/* Tahun Mulai*/}
            <div className="space-y-1">
              <YearsInput label={"Tahun Masuk"} isRequired={ true } />
            </div>

            {/* Tahun Selesai */}
            <div className="space-y-1 ">
              <YearsInput label={"Tahun Selesai"} text='(opsional jika sudah selesai)'/>
            </div>

            {/* Nama Provinsi */}
            <div className='space-y-1 md:col-span-2'>
              <LocationSelector />
            </div>

            {/* Nama Kota*/}
            <div className='space-y-1'></div>
          </div>
        )}

        {selectedStatus === 'Kuliah' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Univ dan jurusan*/}
            <div className="space-y-1 md:col-span-2">
              <UniversitySelector />
            </div>

            {/* Jalur Masuk */}
            <div className="space-y-1">
              <SmoothDropdown
                label="Jalur Masuk Kuliah"
                options={["SNBP", "SNBT", "Mandiri", "Beasiswa", "Lainnya"]}
                placeholder="Masukan jalur masuk kuliah anda"
                isRequired={true}
              />
            </div>

            {/* Jenjang*/}
            <div className="space-y-1">
              <SmoothDropdown
                label="Jenjang Kuliah"
                options={["D3", "D4", "S1", "S2", "S3", "Lainnya"]}
                placeholder="Masukan jenjang kuliah anda"
                isRequired={true}
              />
            </div>

            {/* Tahun Mulai*/}
            <div className="space-y-1">
              <YearsInput label={"Tahun Masuk"} isRequired={ true } />
            </div>

            {/* Tahun Selesai */}
            <div className="space-y-1 ">
              <YearsInput label={"Tahun Lulus"} text='(opsional jika sudah lulus)'/>
            </div>
          </div>
        )}

        {selectedStatus === 'Wirausaha' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Univ dan jurusan*/}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-secondary uppercase">
                Nama Usaha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukan nama usaha anda"
                className="mt-2 w-full p-3 bg-white border border-fourth rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Jalur Masuk */}
            <div className="space-y-1">
              <SmoothDropdown
                label="Bidang Usaha"
                options={["Perdagangan", "Kuliner", "Digital/Teknologi", "Produksi/Manufaktur", "Lainnya"]}
                placeholder="Masukan bidang usaha anda"
                isRequired={true}
              />
            </div>

            {/* Tahun Mulai*/}
            <div className="space-y-1">
              <YearsInput label={"Tahun Mulai"} isRequired={ true } />
            </div>

            {/* Tahun Selesai */}
            <div className="space-y-1 ">
              <YearsInput label={"Tahun Berakhir"} text='(opsional jika sudah berakhir)'/>
            </div>
          </div>
        )}

        {selectedStatus === 'Mencari Kerja' && (
          <p className="text-center text-sm text-third py-4 italic">Semangat! Tetaplah berusaha dan tingkatkan skill Anda.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 md:px-6 py-2 border border-fourth rounded-xl text-xs md:text-sm font-bold text-secondary hover:bg-fourth transition-all cursor-pointer"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
        <button className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-xs md:text-sm font-bold hover:opacity-90 transition-all  cursor-pointer">
          <CheckCircle size={18} /> Selesai
        </button>
      </div>
    </div>
  );
}
