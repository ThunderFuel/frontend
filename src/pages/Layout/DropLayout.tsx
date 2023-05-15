import React from "react";
import Header from "./Header";

interface Props {
  children: React.ReactNode;

  [key: string]: any;
}

const DropLayout = ({ children }: Props) => {
  return (
    <main className={"bg-bg min-h-screen flex flex-col bg-primary-50"}>
      <Header />
      {children}
    </main>
  );
};

export default DropLayout;
