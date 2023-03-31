import Label from "components/Label/Label";
import ToggleButton from "components/ToggleButton";
import React from "react";

const LabelWithToggle = ({ children, helperText, inputField }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Label helperText={helperText}>{children}</Label>
        <ToggleButton
          onToggle={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      {inputField}
    </div>
  );
};

export default LabelWithToggle;
