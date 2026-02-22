import React, { useState } from 'react';
import { ChevronDown, Instagram, Linkedin, Facebook, Twitter, Check, Trash2, Plus } from 'lucide-react';

const allPlatforms = [
  { id: 'instagram', label: 'Instagram', icon: <Instagram size={18} className="text-pink-500" /> },
  { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={18} className="text-blue-600" /> },
  { id: 'facebook', label: 'Facebook', icon: <Facebook size={18} className="text-blue-500" /> },
  { id: 'twitter', label: 'Twitter', icon: <Twitter size={18} className="text-sky-400" /> },
];

export default function SosmedInput() {
  const [socials, setSocials] = useState([{ platform: 'instagram', url: '' }]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // Fungsi Tambah Baris
  const addSocial = () => {
    const usedIds = socials.map(s => s.platform);
    const nextAvailable = allPlatforms.find(p => !usedIds.includes(p.id));
    if (nextAvailable && socials.length < allPlatforms.length) {
      setSocials([...socials, { platform: nextAvailable.id, url: '' }]);
    }
  };

  // Fungsi Hapus Baris
  const removeSocial = (index) => {
    if (socials.length > 1) {
      setSocials(socials.filter((_, i) => i !== index));
    }
  };

  // Fungsi Update Data
  const updateSocial = (index, field, value) => {
    const updated = [...socials];
    updated[index][field] = value;
    setSocials(updated);
  };

  return (
    <div className="space-y-3 col-span-full">
      {/* Header Label + Button Plus */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-secondary  tracking-wider">
          <span className='uppercase'>Sosial Media </span><span className="text-xs text-third italic">(opsional)</span>
        </label>

        {socials.length < allPlatforms.length && (
          <button
            type="button"
            onClick={addSocial}
            className="flex items-center gap-1 text-[10px] font-bold text-primary bg-fourth px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
          >
            <Plus size={14} /> TAMBAH
          </button>
        )}
      </div>

      {/* List Inputan */}
      <div className="space-y-3">
        {socials.map((item, index) => {
          const selectedPlatform = allPlatforms.find(p => p.id === item.platform);
          const usedIds = socials.map(s => s.platform).filter(id => id !== item.platform);
          const availablePlatforms = allPlatforms.filter(p => !usedIds.includes(p.id));

          return (
            <div key={index} className="flex items-center gap-2 group animate-in fade-in slide-in-from-top-1 duration-300">
              <div className={`flex-1 flex items-center bg-white border-2 rounded-xl transition-all duration-300
                ${openDropdownIndex === index ? 'border-primary ring-2 ring-primary/10' : 'border-fourth hover:border-primary/50'}`}>

                {/* Dropdown Custom */}
                <div className="relative border-r border-fourth">
                  <button
                    type="button"
                    onClick={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)}
                    className="flex items-center gap-2 px-3 py-3 cursor-pointer outline-none"
                  >
                    {selectedPlatform?.icon}
                    <ChevronDown size={14} className={`text-third transition-transform duration-300 ${openDropdownIndex === index ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Menu Dropdown */}
                  <div className={`absolute left-0 top-full z-20 mt-2 w-48 bg-white border border-fourth rounded-xl shadow-xl transition-all duration-200 origin-top-left
                    ${openDropdownIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <ul className="py-1">
                      {availablePlatforms.map((p) => (
                        <li
                          key={p.id}
                          onClick={() => {
                            updateSocial(index, 'platform', p.id);
                            setOpenDropdownIndex(null);
                          }}
                          className="flex items-center justify-between px-4 py-3 hover:bg-fourth cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {p.icon}
                            <span className={`text-sm ${item.platform === p.id ? 'font-bold text-primary' : 'text-secondary'}`}>{p.label}</span>
                          </div>
                          {item.platform === p.id && <Check size={14} className="text-primary" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => updateSocial(index, 'url', e.target.value)}
                  placeholder={`Url ${selectedPlatform?.label}`}
                  className="flex-1 p-3 text-sm outline-none bg-transparent text-secondary placeholder:text-third/50"
                />
              </div>

              {/* Tombol Hapus */}
              {socials.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSocial(index)}
                  className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Overlay Close Dropdown */}
      {openDropdownIndex !== null && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownIndex(null)} />
      )}
    </div>
  );
}
