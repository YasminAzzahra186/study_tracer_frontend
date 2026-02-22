import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/icon.png';
import Step1Account from './Step1Account';
import Step2Profile from './Step2Profile';
import Step3Status from './Step3Status';
import { LogIn } from 'lucide-react';

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [presentase, setPresentase] = useState(0)

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
    setPresentase((prev) => prev + 50)
  };
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    setPresentase((prev) => prev - 50)
  };

  const steps = [
    { id: 1, label: 'Informasi Akun' },
    { id: 2, label: 'Informasi lanjut' },
    { id: 3, label: 'Status Karir' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-lexend flex flex-col">
      {/* Navbar Minimalis */}
      <header className="bg-white border-b border-fourth px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-10" />
          <div>
            <h1 className="text-primary font-bold text-sm leading-tight">Alumni Tracer Study</h1>
            <p className="text-[10px] text-third">SMK Negeri 1 Gondang</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-third hidden md:block">Sudah punya akun?</span>
          <Link to="/login" className="p-2 border border-fourth rounded-lg text-xs font-bold text-primary flex items-center gap-2 hover:bg-fourth transition-all">
            <LogIn width={15}/>
            <span>Masuk</span>
          </Link>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 max-w-4xl mx-auto w-full py-10 px-6">
        {/* Stepper Header */}
        <div className="mb-10">
          <div className='w-full gap-10 flex items-center justify-between'>
            <div>
              <h2 className="text-xl md:text-2xl  font-bold text-primary mb-1">Step {currentStep} dari 3 : {steps[currentStep-1].label}</h2>
            </div>
            <div className="px-3 py-1 bg-fourth text-third rounded-xl border">
              <p className="text-xs">{ presentase }% Progres</p>
            </div>
          </div>

          {/* Stepper UI */}
          <div className="relative flex justify-between mt-8 mx-auto">
            <div className="absolute top-4.5 rounded-2xl left-0 w-full h-2 bg-fourth -translate-y-1/2 z-0"></div>
            <div
              className="absolute top-4.5 left-0 h-2 rounded-2xl bg-primary -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${(currentStep - 1) * 50}%` }}
            ></div>

            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep >= step.id ? 'bg-primary text-white' : 'bg-fourth text-third'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <span className={`text-[10px] mt-2 font-semibold ${currentStep >= step.id ? 'text-primary' : 'text-third'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Render Form Berdasarkan Step */}
        <div className="bg-white border border-fourth rounded-2xl p-8 shadow-sm transition-all duration-600">
          {currentStep === 1 && <Step1Account onNext={nextStep} />}
          {currentStep === 2 && <Step2Profile onNext={nextStep} onBack={prevStep} />}
          {currentStep === 3 && <Step3Status onBack={prevStep} />}
        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="py-8 md:py-6 px-6 md:px-10 border-t border-fourth flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-[10px] text-third uppercase tracking-wider">
        {/* Teks Copyright - Rata tengah di HP, Rata kiri di Laptop */}
        <p className="text-center md:text-left leading-relaxed">
          © 2026 Alumni Tracer. Hak cipta dilindungi undang-undang
        </p>

        {/* Group Link - Grid di HP (biar rapi), Flex di Laptop */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-6">
          <button className="hover:text-primary transition-colors cursor-pointer"> Kebijakan Privasi </button>
          <button className="hover:text-primary transition-colors cursor-pointer"> Ketentuan Layanan </button>
          <button className="hover:text-primary transition-colors cursor-pointer"> Kontak Dukungan </button>
        </div>
      </footer>
    </div>
  );
}
