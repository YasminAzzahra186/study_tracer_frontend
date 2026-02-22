import React, { useState, useRef, useEffect } from "react";
import {
  User,
  ArrowLeft,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  MapPin
} from "lucide-react";
import SmoothDropdown from "../../components/admin/SmoothDropdown";
import YearsInput from "../../components/YearsInput";
import SosmedInput from "../../components/SosmedInput";
import SkillInput from "../../components/SkillsInput";
import DateOfBirthInput from "../../components/DateOfBirthInput";
import { masterDataApi } from "../../api/masterData";

export default function Step2Profile({ onNext, onBack, formData, updateFormData }) {
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const [jurusanOptions, setJurusanOptions] = useState([]);
  const [jurusanMap, setJurusanMap] = useState({});

  // Fetch jurusan from API
  useEffect(() => {
    masterDataApi.getJurusan()
      .then((res) => {
        const data = res.data.data || [];
        const options = data.map((j) => j.nama_jurusan || j.nama);
        const map = {};
        data.forEach((j) => { map[j.nama_jurusan || j.nama] = j.id; });
        setJurusanOptions(options);
        setJurusanMap(map);
      })
      .catch(() => {
        // Fallback
        setJurusanOptions(["Rekayasa Perangkat Lunak", "Teknik Komputer Jaringan", "Multi Media"]);
      });
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(file);
    setPreview(url);
    updateFormData({ foto: file });
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    updateFormData({ foto: null });
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-6 ">
      <div className="flex flex-col gap-5 md:flex-row md:items-center justify-between mb-6">
        <div className="flex order-2 md:order-1 items-center gap-3">
          <div className="p-2 bg-fourth rounded-lg text-primary">
            <User size={20} />
          </div>
          <h3 className="font-bold text-primary">Personal Information</h3>
        </div>

        <span className="text-[10px] order-1 md:order-2 bg-fourth w-42 px-3 py-1 rounded-full text-secondary font-bold uppercase">
          Database Verification
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Nama */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-secondary uppercase">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nama lengkap"
            value={formData.nama_alumni}
            onChange={(e) => updateFormData({ nama_alumni: e.target.value })}
            className="mt-2 w-full p-3 bg-white border border-fourth rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-1">
          <SmoothDropdown
            label="Jurusan"
            options={jurusanOptions}
            placeholder="Pilih jurusan"
            isRequired={true}
            onSelect={(val) => updateFormData({ id_jurusan: jurusanMap[val] || val })}
          />
        </div>

        {/* Jenis Kelamin */}
        <div className="space-y-1">
          <SmoothDropdown
            label="Jenis Kelamin"
            options={["Laki-laki", "Perempuan"]}
            placeholder="Pilih jenis kelamin"
            isRequired={true}
            onSelect={(val) => updateFormData({ jenis_kelamin: val })}
          />
        </div>

        {/* No HP */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-secondary uppercase">
            Nomor HP <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="08..."
            value={formData.no_hp}
            onChange={(e) => updateFormData({ no_hp: e.target.value })}
            className="mt-2 w-full p-3 bg-white border border-fourth rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* NIS */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-secondary uppercase">
            NIS <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nomor induk sekolah"
            value={formData.nis}
            onChange={(e) => updateFormData({ nis: e.target.value })}
            className="mt-2 w-full p-3 bg-white border border-fourth rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* NISN */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-secondary uppercase">
            NISN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nomor induk nasional"
            value={formData.nisn}
            onChange={(e) => updateFormData({ nisn: e.target.value })}
            className="mt-2 w-full p-3 bg-white border border-fourth rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Tahun Masuk */}
        <div className="space-y-1">
          <YearsInput label={"Tahun Masuk"} onSelect={(val) => updateFormData({ tahun_masuk: val })} />
        </div>

        {/* Tahun Lulus */}
        <div className="space-y-1">
          <YearsInput label={"Tahun Lulus"} onSelect={(val) => updateFormData({ tahun_lulus: val })} />
        </div>

        {/* Alamat*/}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-secondary uppercase">
            Alamat <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Alamat lengkap rumah..."
            rows="6"
            value={formData.alamat}
            onChange={(e) => updateFormData({ alamat: e.target.value })}
            className="mt-2 w-full h-38 p-3 bg-white border border-fourth rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
          ></textarea>
        </div>

        {/* Foto*/}
        <div className="space-y-1 transition-all duration-300">
          <label className="text-[11px] font-bold text-secondary uppercase">
            Foto <span className="text-red-500">*</span>
          </label>

          <label className="mt-2 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-fourth rounded-xl p-5 cursor-pointer hover:border-primary transition-all duration-600 ease-in-out">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg border"
              />
            ) : (
              <div className="flex flex-col items-center text-third">
                <ImageIcon size={32} />
                <span className="text-xs">Upload foto</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs bg-fourth px-3 py-2 rounded-lg text-primary font-semibold">
              <Upload size={14} />
              Pilih Gambar
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>

          {preview && (
            <button
              type="button"
              onClick={removeImage}
              className="text-xs text-red-500 hover:underline cursor-pointer"
            >
              Hapus Foto
            </button>
          )}

          <p className="text-[10px] text-third">PNG / JPG maksimal 2MB</p>
        </div>

        {/* Tempat Lahir*/}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
            Tempat Lahir <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-2 group">
            {/* Icon Section */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-fourth pr-2">
              <MapPin
                size={18}
                className="text-third group-focus-within:text-primary transition-colors"
              />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Kota kelahiran (Contoh: Bandung)"
              value={formData.tempat_lahir}
              onChange={(e) => updateFormData({ tempat_lahir: e.target.value })}
              className="w-full pl-14 p-3 bg-white border border-fourth rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-third/50"
            />
          </div>
        </div>

        {/* Tanggal Lahir */}
        <div className="space-y-1">
          <DateOfBirthInput isRequired={true} onChange={(val) => updateFormData({ tanggal_lahir: val })} />
        </div>

        {/* Sosmed*/}
        <div className="space-y-1">
          <SosmedInput onChange={(val) => updateFormData({ social_media: val })} />
        </div>

        {/* Skills*/}
        <div className="space-y-1">
          <SkillInput onChange={(val) => updateFormData({ skills: val })} />
        </div>
      </div>

      <div className="pt-8 flex justify-between border-t border-fourth mt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 md:px-6 py-2 border border-fourth rounded-xl text-xs md:text-sm font-bold text-secondary hover:bg-fourth transition-all cursor-pointer"
        >
          <ArrowLeft size={16} /> Kembali
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 md:px-8 py-3 bg-primary text-white rounded-xl text-xs md:text-sm font-bold hover:opacity-90 transition-all cursor-pointer"
        >
          Selanjutnya <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
