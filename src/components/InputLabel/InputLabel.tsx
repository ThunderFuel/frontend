import React from "react";
import Input from "../Input";
import Label from "../Label";

const InputLabel = ({ label, helperText, ...etc }: any, ref: any) => {
  console.log(etc);

  return (
    <div className="flex flex-col gap-2">
      <Label helperText={helperText}>{label}</Label>
      <Input ref={ref} {...etc} />
    </div>
  );
};

export default React.forwardRef(InputLabel);
