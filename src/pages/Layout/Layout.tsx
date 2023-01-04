/* eslint-disable prettier/prettier */
import React from "react";

import Checkout from "components/Checkout";
import MyCart from "components/MyCart";
import Footer from "./Footer";
import Header from "./Header";

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
    </main>
  );
};

export default Layout;
