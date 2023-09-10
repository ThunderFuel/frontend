import React from "react";
import TextareaBase from "components/Textarea";
import Label from "./Label";
import HelperText from "./HelperText";

const Textarea = ({ label, helperText, length, maxLength, ...etc }: any, ref: any) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex justify-between">
          <Label>{label}</Label>
          {maxLength && (
            <span className="body-medium text-white">
              {length}/{maxLength}
            </span>
          )}
        </div>
      )}
      {helperText && <HelperText>{helperText}</HelperText>}
      <TextareaBase {...etc} ref={ref}></TextareaBase>
    </div>
  );
};

export default React.forwardRef(Textarea);
