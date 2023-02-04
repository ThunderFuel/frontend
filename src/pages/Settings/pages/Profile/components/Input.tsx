import React from "react";
import InputBase from "components/Input";
import Label from "./Label";
import HelperText from "./HelperText";

const Input = ({ label, helperText, ...etc }: any) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      {helperText && <HelperText>{helperText}</HelperText>}
      <InputBase {...etc} />
    </div>
  );
};

export default Input;
