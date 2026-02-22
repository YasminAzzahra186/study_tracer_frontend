import React, { useState, useEffect } from "react";
import InputDropdownEdit from "./InputDropdownEdit";

const universityData = {
  "Universitas Indonesia": [
    "Ilmu Komputer",
    "Sastra Jepang",
    "Hukum",
    "Teknik Elektro",
  ],
  "Telkom University": [
    "S1 Informatika",
    "S1 Sistem Informasi",
    "Digital Marketing",
    "DKV",
  ],
  "Politeknik Negeri Malang": [
    "Teknologi Informasi",
    "Teknik Mesin",
    "Akuntansi",
    "Administrasi Niaga",
  ],
  "Institut Teknologi Bandung": [
    "Teknik Informatika",
    "Seni Rupa",
    "Aeronautika",
    "Farmasi",
  ],
};

// Daftar jurusan umum sebagai default jika univ tidak terdaftar
const defaultMajors = [
  "Teknik Informatika",
  "Sistem Informasi",
  "Manajemen",
  "Akuntansi",
  "Ilmu Komunikasi",
  "Teknik Sipil",
  "Hukum",
];

export default function UniversitySelector() {
  const [selectedUniv, setSelectedUniv] = useState("");
  const [availableMajors, setAvailableMajors] = useState([]);

  const universities = Object.keys(universityData);

  useEffect(() => {
    if (selectedUniv) {
      // 1. Cek apakah univ ada di database kita
      const majorsFromData = universityData[selectedUniv];

      if (majorsFromData) {
        // Jika ada, tampilkan jurusan spesifik kampus tersebut
        setAvailableMajors(majorsFromData);
      } else {
        // 2. Jika univ diketik manual (Custom), berikan daftar jurusan umum (Default)
        setAvailableMajors(defaultMajors);
      }
    } else {
      setAvailableMajors([]);
    }
  }, [selectedUniv]);

  console.log(selectedUniv);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 col-span-full">
      {/* Input Universitas */}
      <div className="space-y-1">
        <InputDropdownEdit
          label="Nama Universitas / Kampus"
          options={universities}
          placeholder="Cari atau ketik nama kampus"
          isRequired={true}
          onSelect={(val) => setSelectedUniv(val)}
        />
      </div>

      {/* Input Jurusan */}
      <div
        className={`space-y-1 transition-all duration-300 ${!selectedUniv ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      >
        <InputDropdownEdit
          key={selectedUniv}
          label="Jurusan"
          options={availableMajors}
          placeholder={
            selectedUniv ? "Cari atau ketik jurusan" : "Pilih universitas dulu"
          }
          isRequired={true}
        />
        {selectedUniv && !universityData[selectedUniv] && (
          <p className="text-[9px] text-blue-500 italic mt-1">
            *Menampilkan pilihan jurusan umum untuk kampus kustom
          </p>
        )}
        {!selectedUniv && (
          <p className="text-[9px] text-third italic">
            *Pilih universitas untuk melihat daftar jurusan
          </p>
        )}
      </div>
    </div>
  );
}
