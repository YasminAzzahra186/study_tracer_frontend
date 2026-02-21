import React from 'react';
import LoginImage from '../assets/login_image.webp'
import Logo from '../assets/icon.png'
import { MoveRight } from 'lucide-react';

export default function Login() {
  return (
    <div className="flex h-screen w-full bg-fourtd items-center justify-center p-4 overflow-hidden">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden h-[85vh]">

        {/* Bagian Kiri: Banner Gambar */}
        <div className='hidden lg:block lg:w-1/2 h-full relative'>
          <img
            src={LoginImage}
            alt="Login Visual"
            className='w-full h-full object-cover'
          />
          <div className='bg-black/30 absolute top-0 w-full h-full'></div>
          <div className='absolute bottom-0 z-10 p-5'>
            <div className='flex items-center gap-3'>
              <img src={Logo} alt="" className='w-15' />
              <h1 className='font-extrabold text-fourth'>Alumni Tracer Study</h1>
            </div>
            <p className='text-fourth text-medium'>Masuk dan terhubung kembali dengan SMKN 1 Gondang. Pantau peluang kerja dan tetap dekat dengan sesama alumni.</p>
          </div>
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white h-full">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-secondary mb-6">Selamat Datang</h2>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <p className='text-secondary' >Masukan email dan password untuk mengakses akun anda</p>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-secondary" />
                  Ingatkan saya
                </label>
                <a href="#" className="text-blue-600 hover:underline font-semibold">Lupa password?</a>
              </div>

              <button className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors mt-2 cursor-pointer">
                <span>Masuk</span>
                <MoveRight width={20} />
              </button>
            </form>

            <p className="mt-8 text-sm text-gray-500 text-center">
              Belum punya akun? <a href="#" className="text-blue-600 hover:underline font-bold">Daftar</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
