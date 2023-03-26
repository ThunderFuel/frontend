import React from "react";
import { IconInfo } from "icons";

const HelperText = ({ children }: any) => {
  return (
    <span className="flex items-center body-small text-gray-light gap-[5px]">
      <IconInfo className="w-4 h-4" />
      {children}
    </span>
  );
};

export default HelperText;
