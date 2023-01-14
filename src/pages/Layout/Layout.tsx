import React from "react";

import MyCart from "components/MyCart";

import Footer from "./Footer";
import Header from "./Header";
import ErrorModal from "./ErrorModal";
import CheckoutModal from "./CheckoutModal";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className={"bg-bg min-h-screen flex flex-col"}>
      <Header />
      <MyCart />
      {children}
      <Footer />

      <ErrorModal />
      <CheckoutModal />
    </main>
  );
};

export default Layout;
