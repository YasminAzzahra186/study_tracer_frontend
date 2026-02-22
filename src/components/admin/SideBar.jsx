import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Database,
  FileText,
  LogOut
} from 'lucide-react';
import Logo from '../../assets/icon.png';
import { Link, useNavigate  } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SideBar() {
  const [activeMenu, setActiveMenu] = useState('Beranda');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
      { name: 'Beranda', icon: <LayoutDashboard size={20} />, path: '/wb-admin' },
      { name: 'Manajemen Pengguna', icon: <Users size={20} />, path: '/wb-admin/manage-user' },
      { name: 'Manajemen Pekerjaan', icon: <Briefcase size={20} />, path: '/wb-admin/jobs' },
      { name: 'Data Master', icon: <Database size={20} />, path: '/wb-admin/master' },
      { name: 'Kuesioner', icon: <FileText size={20} />, path: '/wb-admin/kuisoner' },
    ];

  function handleactive(name) {
    setActiveMenu(name)
  }

  return (
    <div className="hidden md:flex w-65 h-screen bg-white border-r border-fourth flex-col p-4 shadow-sm">

      {/* Header Logo */}
      <div className="flex items-center gap-3 mb-10 px-2 mt-2">
        <img src={Logo} alt="Logo" className='w-13'/>
        <div>
          <h1 className="text-primary font-bold leading-tight text-sm">Alumni Tracer Study</h1>
          <p className="text-third text-xs">Admin Portal</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = activeMenu === item.name;

          return (
            <Link
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
                ${isActive
                  ? 'bg-fourth text-primary font-semibold'
                  : 'text-third hover:bg-fourth/50 hover:text-secondary'
                }`}
              to={item.path}
              onClick={() => handleactive(item.name)}
            >
              <span className={isActive ? 'text-primary' : 'text-third'}>
                {item.icon}
              </span>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="pt-4 border-t border-fourth">
        <button
          onClick={async () => {
            await logout();
            navigate('/login');
          }}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl hover:opacity-90 transition-all shadow-md shadow-primary/20 cursor-pointer"
        >
          <LogOut size={18} />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>

    </div>
  );
}
