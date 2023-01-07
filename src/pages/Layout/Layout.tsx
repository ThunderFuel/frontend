import React from "react";

import Checkout from "components/Checkout";
import MyCart from "components/MyCart";

import Footer from "./Footer";
import Header from "./Header";
import ErrorModal from "./ErrorModal";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className={"bg-bg min-h-screen flex flex-col"}>
      <Header />
      <Checkout />
      <MyCart />
      {children}
      <Footer />

      <ErrorModal />
    </main>
  );
};

export default Layout;
