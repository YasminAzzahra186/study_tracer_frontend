import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/wb-admin":
        return {
          title: "Beranda Admin",
          text: "Selamat datang kembali, Admin",
        };
      case "/wb-admin/manage-user":
        return {
          title: "Manajemen Pengguna",
          text: "Kelola pendaftaran alumni tertunda dan permintaan pembaruan profil",
        };
      case "/wb-admin/jobs":
        return {
          title: "Manajemen Pekerjaan",
          text: "Tinjau, setujui, dan kelola postingan lowongan kerja dari alumni",
        };

      case "/wb-admin/master":
        return {
          title: "Manajemen Data Master & Laporan",
          text: "Kelola konfigurasi sistem, jurusan, jenis pekerjaa, dan buat laporan studi penelusuran (tracer study).",
        };

      case "/wb-admin/kuisoner":
        return {
          title: "Manajemen Kuesioner",
          text: "Kelola dan atur kuesioner untuk Studi Penelusuran Lulusan (Tracer Study)",
        };
      default:
        return "Alumni Tracer";
    }
  };

  const contentTitle = getTitle()

  return (
    <header className="h-20 bg-white border-b border-fourth shadow-md flex items-center w-full p-8 justify-between">
      <div>
        <h2 className="text-xl font-bold text-primary">{contentTitle.title}</h2>
        <p className="text-sm text-third">{contentTitle.text}</p>
      </div>
    </header>
  );
}
