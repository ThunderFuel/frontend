import React from "react";
import { IconInfo } from "icons";

const Alert = ({ children }: any) => {
  return (
    <div className="p-4 bg-gray rounded-md flex gap-5 items-start">
      <IconInfo className="text-white w-6 h-6" />
      <span className="body-medium text-gray-light flex-1">{children}</span>
    </div>
  );
};

export default Alert;
