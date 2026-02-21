import { Outlet } from "react-router-dom";
import SideBar from "../components/admin/SideBar";
import Header from "../components/admin/Header";

export default function AdminLayout() {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1">
        <Header />
        <section className="p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
