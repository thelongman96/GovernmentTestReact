import { Button } from "@mui/material";
import { Outlet } from "react-router";
import useAdminLayout from "./hooks/useAdminLayout";

const AdminLayout = () => {
  const { handleLogoutClick } = useAdminLayout();
  return (
    <div>
      <h1>Admin Layout</h1>
      <Outlet />
      <Button variant="outlined" onClick={handleLogoutClick}>
        Logout
      </Button>
    </div>
  );
};

export default AdminLayout;
