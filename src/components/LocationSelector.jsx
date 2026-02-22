import React, { useState, useEffect } from 'react';
import SmoothDropdown from './admin/SmoothDropdown';
// Menggunakan dropdown reusable yang kita buat sebelumnya

const locationData = {
  "Jawa Timur": ["Batu", "Malang", "Surabaya", "Sidoarjo", "Blitar"],
  "Jawa Barat": ["Bandung", "Bogor", "Depok", "Bekasi", "Cimahi"],
  "DKI Jakarta": ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur"],
  "Jawa Tengah": ["Semarang", "Solo", "Magelang", "Tegal"],
};

export default function LocationSelector() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // Ambil daftar nama provinsi untuk dropdown pertama
  const provinces = Object.keys(locationData);

  // Efek untuk mengupdate daftar kota saat provinsi berubah
  useEffect(() => {
    if (selectedProvince) {
      setAvailableCities(locationData[selectedProvince] || []);
      setSelectedCity(null); // Reset kota jika provinsi diganti
    } else {
      setAvailableCities([]);
    }
  }, [selectedProvince]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-full">
      {/* Dropdown Provinsi */}
      <SmoothDropdown
        label="Provinsi"
        options={provinces}
        placeholder="Pilih Provinsi"
        isRequired={true}
        onSelect={(value) => setSelectedProvince(value)}
      />

      {/* Dropdown Kota - Akan menyesuaikan berdasarkan provinsi */}
      <div className={`transition-all duration-500 ${!selectedProvince ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <SmoothDropdown
          label="Kota / Kabupaten"
          options={availableCities}
          placeholder={selectedProvince ? "Pilih Kota" : "Pilih provinsi dulu"}
          isRequired={true}
          onSelect={(value) => setSelectedCity(value)}
          key={selectedProvince} // Key penting agar state internal dropdown reset saat provinsi ganti
        />
      </div>
    </div>
  );
}
