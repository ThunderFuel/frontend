import React from "react";
import Input from "components/Input";
import { IconPercent } from "icons";

const InputGroup = () => {
  return (
    <div className="flex gap-2">
      <Input />
      <Input containerClassName="w-20" icon={<IconPercent className="w-5 text-gray-light peer-focus:text-white" />} />
    </div>
  );
};

export default InputGroup;
