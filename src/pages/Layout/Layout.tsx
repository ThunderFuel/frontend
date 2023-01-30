import React from "react";

import MyCart from "components/MyCart";

import Footer from "./Footer";
import Header from "./Header";
import ErrorModal from "./ErrorModal";
import CheckoutModal from "./CheckoutModal";
import ManageFunds from "components/ManageFunds";
import Wallet from "components/Wallet";

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
      {children}
      {etc?.hiddenFooter ? null : <Footer />}

      <ErrorModal />
      <CheckoutModal />
    </main>
  );
};

export default Layout;
