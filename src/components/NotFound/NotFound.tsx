import React from "react";
import { IconNotFound } from "icons";

const NotFound = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="m-auto flex flex-col text-gray-light items-center gap-9 py-20">
      <IconNotFound className="" />
      <div className="body-large">{children ?? "Nothing found."}</div>
    </div>
  );
};

export default NotFound;
