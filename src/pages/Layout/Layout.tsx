import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className={"bg-bg min-h-screen flex flex-col"}>
      <Header />
      <div className="">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
