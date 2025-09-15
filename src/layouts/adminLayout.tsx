import { Button } from "@mui/material";
import { Outlet } from "react-router";
import useAdminLayout from "./hooks/useAdminLayout";

const AdminLayout = () => {
  const { handleLogoutClick } = useAdminLayout();
  return (
    // <div>
    //   <div>
    //     <h1>Admin Layout</h1>
    //     <Button variant="outlined" onClick={handleLogoutClick}>
    //       Logout
    //     </Button>
    //   </div>

    <Outlet />
    // {/* </div> */}
  );
};

export default AdminLayout;
