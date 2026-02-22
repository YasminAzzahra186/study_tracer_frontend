import React from 'react';
import { Mail, Lock, ShieldCheck, ArrowRight, LockKeyhole } from 'lucide-react';

export default function Step1Account({ onNext }) {
  return (
    <div className="space-y-6 max-w-2x mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-fourth rounded-lg text-primary"><LockKeyhole size={20} /></div>
        <h3 className="font-bold text-primary">Pengaturan akun</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-secondary">Email</label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-third" size={16} />
            <input type="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 bg-white border border-fourth rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary">Password <span className="text-red-500">*</span></label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-third" size={16} />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-white border border-fourth rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <p className="text-[10px] text-third italic">minimal 8 karakter dengan huruf dan angka</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary">Konfirmasi Password <span className="text-red-500">*</span></label>
            <div className="relative mt-2">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-third" size={16} />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-white border border-fourth rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
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
