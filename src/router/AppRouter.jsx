import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import { ProtectedRoute } from "../utilitis/ProtectedRoute";
import UserManagement from "../pages/admin/UserManagement";
import JobsManagement from "../pages/admin/JobsManagement";
import MasterTable from "../pages/admin/MasterTable";
import KuisonerManage from "../pages/admin/KuisonerManage";
import LupaPass from "../pages/LupaPass";
import Register from "../pages/register/Register";

export default function AppRouter() {
  const user = {
    isLoggedIn: true,
    role: "uss"
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/reset-password" element={<LupaPass />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/wb-admin" element={
        <ProtectedRoute isAllowed={user.isLoggedIn && user.role === 'admin'} redirectTo={"/login"}  />
      }>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-user" element={ <UserManagement /> } />
          <Route path="jobs" element={ <JobsManagement /> } />
          <Route path="master" element={ <MasterTable /> } />
          <Route path="kuisoner" element={ <KuisonerManage /> } />
       </Route>
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1> } />
    </Routes>
  );
}
