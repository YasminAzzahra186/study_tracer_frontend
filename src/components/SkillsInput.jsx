import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus, X } from 'lucide-react';
import { masterDataApi } from '../api/masterData';

const fallbackSkills = [
  "JavaScript", "React JS", "Node.js", "Python",
  "UI/UX Design", "Graphic Design", "Digital Marketing",
  "Public Speaking", "Data Analysis", "Laravel"
];

export default function SkillInput({ onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [skillMap, setSkillMap] = useState({}); // name -> id
  const dropdownRef = useRef(null);

  // Fetch skills from API on mount
  useEffect(() => {
    masterDataApi.getSkills()
      .then((res) => {
        const data = res.data.data || [];
        setAllSkills(data.map((s) => s.nama_skill || s.nama));
        const map = {};
        data.forEach((s) => { map[s.nama_skill || s.nama] = s.id; });
        setSkillMap(map);
      })
      .catch(() => {
        setAllSkills(fallbackSkills);
      });
  }, []);

  // Filter skill berdasarkan apa yang diketik user
  const filteredSkills = allSkills.filter(skill =>
    skill.toLowerCase().includes(query.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  // Fungsi tambah skill (baik dari list atau custom)
  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !selectedSkills.includes(trimmedSkill)) {
      const updated = [...selectedSkills, trimmedSkill];
      setSelectedSkills(updated);
      if (onChange) {
        const ids = updated.map(s => skillMap[s]).filter(Boolean);
        onChange(ids);
      }
    }
    setQuery("");
    setIsOpen(false);
  };

  const removeSkill = (skillToRemove) => {
    const updated = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(updated);
    if (onChange) {
      const ids = updated.map(s => skillMap[s]).filter(Boolean);
      onChange(ids);
    }
  };

  return (
    <div className="space-y-1 w-full relative" ref={dropdownRef}>
      <label className="text-[11px] font-bold text-secondary tracking-wider">
        <span className='uppercase'>Skill / Keahlian  </span><span className="text-xs text-third italic">(opsional)</span>
      </label>

      {/* Container Input & Tags */}
      <div className={`mt-3.5 flex flex-wrap gap-2 p-2 bg-white border-2 rounded-xl transition-all duration-300
        ${isOpen ? 'border-primary ring-2 ring-primary/10' : 'border-fourth hover:border-primary/50'}`}>

        {/* Tags Skill yang sudah dipilih */}
        {selectedSkills.map(skill => (
          <span key={skill} className="flex items-center gap-1 px-2 py-1 bg-fourth text-primary text-xs font-bold rounded-lg animate-in zoom-in duration-200">
            {skill}
            <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 cursor-pointer">
              <X size={12} />
            </button>
          </span>
        ))}

        {/* Input Pencarian / Custom */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query) {
              e.preventDefault();
              addSkill(query);
            }
          }}
          placeholder={selectedSkills.length === 0 ? "Ketik atau pilih skill..." : ""}
          className="flex-1 min-w-30 p-1 text-sm outline-none bg-transparent text-secondary"
        />

        <ChevronDown
          size={18}
          className={`text-third mt-1 transition-transform duration-300 cursor-pointer ${isOpen ? 'rotate-180 text-primary' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Dropdown Menu */}
      <div className={`absolute z-20 w-full mt-2 bg-white border border-fourth rounded-xl shadow-xl overflow-hidden transition-all duration-200 origin-top
        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>

        <ul className="max-h-52 overflow-y-auto py-1">
          {filteredSkills.map((skill) => (
            <li
              key={skill}
              onClick={() => addSkill(skill)}
              className="flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-fourth text-secondary hover:text-primary transition-colors"
            >
              {skill}
              <Check size={14} className="opacity-0 group-hover:opacity-100" />
            </li>
          ))}

          {/* Opsi Tambah Skill Custom jika tidak ada di list */}
          {query && !allSkills.some(s => s.toLowerCase() === query.toLowerCase()) && (
            <li
              onClick={() => addSkill(query)}
              className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer bg-primary/5 text-primary font-bold hover:bg-primary/10"
            >
              <Plus size={14} /> Tambah "{query}"
            </li>
          )}

          {filteredSkills.length === 0 && !query && (
            <li className="px-4 py-3 text-xs text-third italic text-center">Tidak ada skill tersedia</li>
          )}
        </ul>
      </div>

      {/* Overlay Close */}
      {isOpen && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
