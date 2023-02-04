import React from "react";
import TextareaBase from "components/Textarea";
import Label from "./Label";

const Textarea = ({ label, ...etc }: any) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <TextareaBase {...etc}></TextareaBase>
    </div>
  );
};

export default Textarea;
