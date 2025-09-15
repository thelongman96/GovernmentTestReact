import { Route, Routes } from "react-router";
import AdminLayout from "@/layouts/adminLayout";
import DashboardPage from "@/pages/admin/Dashboard/Dashboard";
import ViewCase from "@/pages/admin/Cases/ViewCase";
import AddCase from "@/pages/admin/Cases/AddCase";
import EditCase from "@/pages/admin/Cases/EditCase";
import EditTask from "@/pages/admin/Tasks/EditTask";
import AddTask from "@/pages/admin/Tasks/AddTask";
// import GlassComponentsDemo from "@/pages/admin/Dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="cases/:caseId" element={<ViewCase />} />
        <Route path="cases/new" element={<AddCase />} />
        <Route path="cases/:caseId/edit" element={<EditCase />} />
        <Route path="task/new" element={<AddTask />} />
        <Route path="task/:taskId/edit" element={<EditTask />} />
        {/* <Route path="glass-demo" element={<GlassComponentsDemo />} /> */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
