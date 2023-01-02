import React, { useState } from "react";

import Checkout from "components/Checkout";
import MyCart from "components/MyCart";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [showCartModal, setShowCartModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  return (
    <main className={"bg-bg min-h-screen flex flex-col"}>
      <Header />
      {showCheckoutModal && <Checkout showModal={showCheckoutModal} setShowModal={setShowCheckoutModal} />}
      {/* <InsufficentFunds showModal={showCheckoutModal} setShowModal={setShowCheckoutModal} /> */}
      {showCartModal && <MyCart showModal={showCartModal} setShowModal={setShowCartModal} setShowCheckoutModal={setShowCheckoutModal} />}
      <div className="">{children}</div>
      <Footer />

      <MyCart showModal={showCartModal} setShowModal={setShowCartModal} setShowCheckoutModal={setShowCheckoutModal} />
    </main>
  );
};

export default Layout;
