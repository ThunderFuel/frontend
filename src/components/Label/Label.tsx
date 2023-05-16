import React from "react";
import { IconInfo } from "icons";
import clsx from "clsx";

const LabelHelperText = ({ children }: any) => {
  return (
    <div className="flex gap-2 items-center body-small text-gray-light">
      <IconInfo className="h-5 w-5" />
      <span className="flex-1">{children}</span>
    </div>
  );
};
const Label = ({ children, helperText, className }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <label className={clsx("text-h6", className)}>{children}</label>
      {helperText && <LabelHelperText>{helperText}</LabelHelperText>}
    </div>
  );
};

export default Label;
