import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <main className={"bg-bg-default min-h-screen flex flex-col"}>{children}</main>;
};

export default Layout;
