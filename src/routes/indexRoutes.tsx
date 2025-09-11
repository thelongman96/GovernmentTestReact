import { CookiesProvider, useCookies } from "react-cookie";
import AdminRoutes from "./adminRoutes";
import AuthRoutes from "./authRoutes";
import { useEffect, useState } from "react";

const IndexRouter = () => {
  const [cookies] = useCookies(["loginToken"]);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (cookies.loginToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [cookies]);
  return (
    <CookiesProvider>
      {loggedIn ? <AdminRoutes /> : <AuthRoutes />}
    </CookiesProvider>
  );
};

export default IndexRouter;
