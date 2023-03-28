import React from "react";
import Header from "./Header";

interface Props {
  children: React.ReactNode;

  [key: string]: any;
}

const DropLayout = ({ children, ...etc }: Props) => {
  console.log(etc);

  return (
    <main className={"bg-bg min-h-screen flex flex-col bg-gray-dark"}>
      <Header className={"bg-gray-dark"} />

      {children}
    </main>
  );
};

export default DropLayout;
