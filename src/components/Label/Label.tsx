import React from "react";
import { IconInfo } from "icons";

const LabelHelperText = ({ children }: any) => {
  return (
    <div className="flex gap-2 items-center body-small text-gray-light">
      <IconInfo className="h-5 w-5" />
      <span className="flex-1">{children}</span>
    </div>
  );
};
const Label = ({ children, helperText }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-h6">{children}</label>
      {helperText && <LabelHelperText>{helperText}</LabelHelperText>}
    </div>
  );
};

export default Label;
