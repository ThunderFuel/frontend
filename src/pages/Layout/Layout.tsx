import React from "react";
import Footer from "./Footer";
import MarketplaceHeader from "./MarketplaceHeader";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className={"bg-bg min-h-screen flex flex-col"}>
      <MarketplaceHeader />
      <div className="">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
