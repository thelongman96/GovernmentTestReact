import { Outlet } from "react-router";
import "./styles/authStyles.scss";
import Footer from "@/components/common/Footer";
import { useState } from "react";
import { AuthLayoutContextType } from "./types/AuthLayoutContext";

const AuthLayout = () => {
  const [showSocials, setShowSocials] = useState<boolean>(false);
  const [documentTitle, setDocumentTitle] = useState<string>("");

  return (
    <div className="authStyles__container">
      <div className="authStyles__backgroundCover" />
      <title>{documentTitle}</title>
      <div className="authStyles__content">
        <div className="authStyles__wrapper">
          <div className="authStyles__outlet">
            <Outlet
              context={
                {
                  showSocials,
                  setShowSocials,
                  documentTitle,
                  setDocumentTitle,
                } satisfies AuthLayoutContextType
              }
            />
          </div>
        </div>
      </div>
      <footer className="authStyles__footer">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLayout;
