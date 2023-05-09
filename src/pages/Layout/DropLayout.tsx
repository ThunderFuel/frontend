import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;

  [key: string]: any;
}

const DropLayout = ({ children }: Props) => {
  return (
    <main className={"bg-bg min-h-screen flex flex-col bg-primary-50"}>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default DropLayout;
