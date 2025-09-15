import { CookiesProvider, useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import AdminRoutes from "@/routes/adminRoutes";
import { useCallback, useEffect, useState } from "react";
import AuthRoutes from "@/routes/authRoutes";
import { validateSessionToken } from "@/services/api";
import { useUserStore } from "@/stores/UserStore";
import { useAuthHandler } from "@/services/authHandler";

const App = () => {
  const [cookies] = useCookies(["loginToken"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const storeProfileData = useUserStore((state) => state.storeProfileData);

  const fetchUserData = useCallback(
    async ({ loginToken }: { loginToken: string }) => {
      const result = await validateSessionToken({ loginToken });
      if (result.code === 200 && result.result.user) {
        const { user } = result.result;
        storeProfileData({ profileData: user });
        setLoggedIn(true);
      }
    },
    [storeProfileData]
  );

  useEffect(() => {
    if (cookies.loginToken) {
      fetchUserData({ loginToken: cookies.loginToken });
    } else {
      setLoggedIn(false);
    }
  }, [cookies, fetchUserData]);

  useAuthHandler();

  return (
    <CookiesProvider>
      {loggedIn ? <AdminRoutes /> : <AuthRoutes />}
      <ToastContainer />
    </CookiesProvider>
  );
};

export default App;
