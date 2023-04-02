import Label from "components/Label/Label";
import ToggleButton from "components/ToggleButton";
import React from "react";

const LabelWithToggle = ({ children, helperText, inputField }: any) => {
  const [show, setshow] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Label helperText={helperText}>{children}</Label>
        <ToggleButton onToggle={() => setshow((prev) => !prev)} />
      </div>
      {show && inputField}
    </div>
  );
};

export default LabelWithToggle;
