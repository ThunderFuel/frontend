import React from "react";
import clsx from "clsx";

const Label = ({ children, className, ...etc }: any) => {
  return (
    <label className={clsx("text-h6 text-white", className)} {...etc}>
      {children}
    </label>
  );
};

export default Label;
