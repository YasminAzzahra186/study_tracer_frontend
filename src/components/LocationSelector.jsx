import React, { useState, useEffect } from 'react';
import SmoothDropdown from './admin/SmoothDropdown';
import { masterDataApi } from '../api/masterData';

export default function LocationSelector({ onCitySelect }) {
  const [provinces, setProvinces] = useState([]);
  const [provinceMap, setProvinceMap] = useState({});
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const [cityMap, setCityMap] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);

  // Fetch provinces on mount
  useEffect(() => {
    masterDataApi.getProvinsi()
      .then((res) => {
        const data = res.data.data || [];
        setProvinces(data.map((p) => p.nama_provinsi || p.nama));
        const map = {};
        data.forEach((p) => { map[p.nama_provinsi || p.nama] = p.id; });
        setProvinceMap(map);
      })
      .catch(() => {
        setProvinces(["Jawa Timur", "Jawa Barat", "DKI Jakarta", "Jawa Tengah"]);
      });
  }, []);

  // Fetch cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      const provinceId = provinceMap[selectedProvince];
      if (provinceId) {
        masterDataApi.getKota(provinceId)
          .then((res) => {
            const data = res.data.data || [];
            setAvailableCities(data.map((k) => k.nama_kota || k.nama));
            const map = {};
            data.forEach((k) => { map[k.nama_kota || k.nama] = k.id; });
            setCityMap(map);
          })
          .catch(() => setAvailableCities([]));
      }
      setSelectedCity(null);
    } else {
      setAvailableCities([]);
    }
  }, [selectedProvince, provinceMap]);

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    const cityId = cityMap[cityName];
    if (onCitySelect) onCitySelect(cityId || cityName);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-full">
      <SmoothDropdown
        label="Provinsi"
        options={provinces}
        placeholder="Pilih Provinsi"
        isRequired={true}
        onSelect={(value) => setSelectedProvince(value)}
      />

      <div className={`transition-all duration-500 ${!selectedProvince ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <SmoothDropdown
          label="Kota / Kabupaten"
          options={availableCities}
          placeholder={selectedProvince ? "Pilih Kota" : "Pilih provinsi dulu"}
          isRequired={true}
          onSelect={handleCitySelect}
          key={selectedProvince}
        />
      </div>
    </div>
  );
}
