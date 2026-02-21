import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import { ProtectedRoute } from "../utilitis/ProtectedRoute";
import UserManagement from "../pages/admin/UserManagement";
import JobsManagement from "../pages/admin/JobsManagement";
import MasterTable from "../pages/admin/MasterTable";
import KuisonerManage from "../pages/admin/KuisonerManage";

export default function AppRouter() {
  const user = {
    isLoggedIn: true,
    role: "admin"
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
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
