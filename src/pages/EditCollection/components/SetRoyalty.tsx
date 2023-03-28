import ToggleButton from "components/ToggleButton";
import HelperText from "pages/Settings/pages/Profile/components/HelperText";
import React from "react";

const SetRoyalty = ({ onToggle, isOn }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h6 className="text-head6 text-white">Set Royalties</h6>
        <ToggleButton onToggle={onToggle} isOn={isOn} />
      </div>
      <HelperText>You can earn from secondary sales by setting royalties.</HelperText>
    </div>
  );
};

export default SetRoyalty;
