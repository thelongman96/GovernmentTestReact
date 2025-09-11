import { Route, Routes } from "react-router";
import AdminLayout from "@/layouts/adminLayout";
import Dashboard from "@/pages/admin/Dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="portal" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
