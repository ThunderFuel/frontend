import React from "react";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className={"bg-bg min-h-screen flex flex-col"}>
      <Header />
      <div className="container">{children}</div>
    </main>
  );
};

export default Layout;
