import React, { useState, useEffect } from "react";
import InputDropdownEdit from "./InputDropdownEdit";
import { masterDataApi } from "../api/masterData";

export default function UniversitySelector({ onUnivSelect, onJurusanSelect }) {
  const [universities, setUniversities] = useState([]);
  const [univMap, setUnivMap] = useState({});
  const [selectedUniv, setSelectedUniv] = useState("");
  const [availableMajors, setAvailableMajors] = useState([]);
  const [majorMap, setMajorMap] = useState({});

  // Fetch universities on mount
  useEffect(() => {
    masterDataApi.getUniversitas()
      .then((res) => {
        const data = res.data.data || [];
        setUniversities(data.map((u) => u.nama_universitas || u.nama));
        const map = {};
        data.forEach((u) => { map[u.nama_universitas || u.nama] = u.id; });
        setUnivMap(map);
      })
      .catch(() => {
        setUniversities(["Universitas Indonesia", "Telkom University", "Politeknik Negeri Malang", "Institut Teknologi Bandung"]);
      });
  }, []);

  // Fetch jurusan kuliah (all at once)
  useEffect(() => {
    masterDataApi.getJurusanKuliah()
      .then((res) => {
        const data = res.data.data || [];
        setAvailableMajors(data.map((j) => j.nama_jurusan_kuliah || j.nama));
        const map = {};
        data.forEach((j) => { map[j.nama_jurusan_kuliah || j.nama] = j.id; });
        setMajorMap(map);
      })
      .catch(() => {
        setAvailableMajors(["Teknik Informatika", "Sistem Informasi", "Manajemen", "Akuntansi", "Ilmu Komunikasi"]);
      });
  }, []);

  const handleUnivSelect = (val) => {
    setSelectedUniv(val);
    const univId = univMap[val];
    if (onUnivSelect) onUnivSelect(univId || val);
  };

  const handleJurusanSelect = (val) => {
    const majorId = majorMap[val];
    if (onJurusanSelect) onJurusanSelect(majorId || val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 col-span-full">
      {/* Input Universitas */}
      <div className="space-y-1">
        <InputDropdownEdit
          label="Nama Universitas / Kampus"
          options={universities}
          placeholder="Cari atau ketik nama kampus"
          isRequired={true}
          onSelect={handleUnivSelect}
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
          onSelect={handleJurusanSelect}
        />
        {!selectedUniv && (
          <p className="text-[9px] text-third italic">
            *Pilih universitas untuk melihat daftar jurusan
          </p>
        )}
      </div>
    </div>
  );
}
