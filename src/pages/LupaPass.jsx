import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react'; // Menggunakan Lucide React
import LoginImage from '../assets/login_image.webp';
import Logo from '../assets/icon.png'

export default function LupaPass() {
  return (
    <div className="flex h-screen w-full bg-gray-50 items-center justify-center p-4 overflow-hidden">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden h-[75vh] lg:h-[85vh]">
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
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white h-full font-lexend">
          <div className="max-w-md mx-auto w-full">
            <Link
              to="/login"
              className="flex items-center gap-2 text-third hover:text-primary transition-colors mb-8 text-sm font-medium group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Kembali ke Login
            </Link>

            <h2 className="text-3xl font-bold text-primary mb-2">Lupa Password?</h2>
            <p className="text-third text-sm mb-8 leading-relaxed">
              Masukkan email yang terdaftar pada akun Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
            </p>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Alamat Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-third">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 p-3 bg-fourth border border-third rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:opacity-95 text-white font-bold py-3 rounded-lg transition-all cursor-pointer"
              >
                Kirim Tautan Reset
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-fourth">
              <p className="text-xs text-third text-center">
                Belum menerima email? Periksa folder spam atau <button className="text-primary font-bold hover:underline cursor-pointer">Kirim ulang</button>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
