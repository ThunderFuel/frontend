import React from "react";
import { useIsMobile } from "hooks/useIsMobile";
import MobileWarning from "components/MobileWarning";
import Header from "../pages/Landing/Header";

const MobileWarningPage = ({ children }: any) => {
  if (useIsMobile()) {
    return (
      <main className="bg-bg min-h-screen flex flex-col">
        <Header />
        <MobileWarning />;
      </main>
    );
  }

  return children;
};

export default MobileWarningPage;
