import { Route, Routes } from "react-router";
import AuthLayout from "@/layouts/authLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
