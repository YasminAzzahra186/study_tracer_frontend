import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';

export default function DateOfBirthInput({ isRequired = false }) {
  const dateInputRef = useRef(null);

  // Fungsi untuk memicu kalender muncul saat area input diklik
  const handleDivClick = () => {
    if (dateInputRef.current) {
      // .showPicker() adalah cara standar modern untuk memicu kalender muncul
      try {
        dateInputRef.current.showPicker();
      } catch (error) {
        // Fallback jika browser sangat lama: fokus ke input
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <div className="space-y-1 w-full">
      <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
        Tanggal Lahir {isRequired && <span className="text-red-500">*</span>}
      </label>

      {/* Container utama diberi onClick agar user bisa klik dimana saja */}
      <div
        onClick={handleDivClick}
        className="relative mt-2 flex items-center bg-white border-2 border-fourth rounded-xl cursor-pointer
                   hover:border-primary/50 transition-all duration-300 group focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"
      >
        {/* Ikon Section */}
        <div className="pl-3 flex items-center pointer-events-none border-r border-fourth pr-2">
          <Calendar
            size={18}
            className="text-third group-focus-within:text-primary transition-colors"
          />
        </div>

        {/* Input Date */}
        <input
          ref={dateInputRef}
          type="date"
          required={isRequired}
          className="w-full p-3 bg-transparent text-sm outline-none text-secondary cursor-pointer
                     appearance-none placeholder-transparent"
          style={{
            // Menghilangkan ikon kalender bawaan browser agar tidak double dengan ikon Lucide kita
            WebkitAppearance: 'none'
          }}
        />

        {/* CSS tambahan untuk merapikan tampilan input date di beberapa browser */}
        <style dangerouslySetInnerHTML={{ __html: `
          input[type="date"]::-webkit-calendar-picker-indicator {
            background: transparent;
            bottom: 0;
            color: transparent;
            cursor: pointer;
            height: auto;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: auto;
          }
        `}} />
      </div>
    </div>
  );
}
