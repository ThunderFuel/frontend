import React from "react";

import MyCart from "components/MyCart";

import Footer from "./Footer";
import Header from "./Header";
import ErrorModal from "./ErrorModal";
import CheckoutModal from "./CheckoutModal";
import ManageFunds from "components/ManageFunds";
import Wallet from "components/Wallet";
import ClosedBetaModal from "components/ClosedBetaModal";

interface Props {
  children: React.ReactNode;

  [key: string]: any;
}

const Layout = ({ children, ...etc }: Props) => {
  return (
    <main className={"bg-bg min-h-screen flex flex-col"}>
      <Header />
      <MyCart />
      <Wallet />
      <ManageFunds />
      <ClosedBetaModal />
      {children}
      {etc?.hiddenFooter ? null : <Footer />}

      <ErrorModal />
      <CheckoutModal />
    </main>
  );
};

export default Layout;
