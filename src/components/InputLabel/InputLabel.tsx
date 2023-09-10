import React from "react";
import Input from "../Input";
import Label from "../Label";

const InputLabel = ({ label, helperText, labelClassName, ...etc }: any, ref: any) => {
  return (
    <div className="flex flex-col gap-2">
      <Label helperText={helperText} className={labelClassName}>
        {label}
      </Label>
      <Input ref={ref} {...etc} />
    </div>
  );
};

export default React.forwardRef(InputLabel);
