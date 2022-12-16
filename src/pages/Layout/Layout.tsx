import MyCart from "components/MyCart";
import React, { useState } from "react";
import Footer from "./Footer";
import MarketplaceHeader from "./MarketplaceHeader";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <main className={"bg-bg min-h-screen flex flex-col"}>
      <MarketplaceHeader showCartModal={setShowCartModal} />
      <MyCart showModal={showCartModal} setShowModal={setShowCartModal} />
      <div className="">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
