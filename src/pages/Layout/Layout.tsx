import React from "react";

import MyCart from "components/MyCart";

import Footer from "./Footer";
import Header from "./Header";
import ErrorModal from "./ErrorModal";
import CheckoutModal from "./CheckoutModal";
import ManageFunds from "components/ManageFunds";
import Wallet from "components/Wallet";
import ClosedBetaModal from "components/ClosedBetaModal";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { THUNDER_THEME_NAME } from "../../global-constants";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props {
  children: React.ReactNode;

  [key: string]: any;
}

const Layout = ({ children, ...etc }: Props) => {
  React.useEffect(() => {
    const theme = useLocalStorage().getItem(THUNDER_THEME_NAME);
    if (theme === "dark" || (!(THUNDER_THEME_NAME in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const isMobile = useIsMobile();

  return (
    <main className="bg-bg min-h-screen flex flex-col">
      <Header />
      <MyCart />
      <Wallet />
      <ManageFunds />
      <ClosedBetaModal />
      {children}
      {etc?.hiddenFooter && !isMobile ? null : <Footer />}

      <ErrorModal />
      <CheckoutModal />
    </main>
  );
};

export default Layout;
