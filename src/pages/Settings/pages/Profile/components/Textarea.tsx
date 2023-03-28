import React from "react";
import TextareaBase from "components/Textarea";
import Label from "./Label";
import HelperText from "./HelperText";

const Textarea = ({ label, helperText, ...etc }: any) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      {helperText && <HelperText>{helperText}</HelperText>}
      <TextareaBase {...etc}></TextareaBase>
    </div>
  );
};

export default Textarea;
