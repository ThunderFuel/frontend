import React from "react";
import Input from "../Input/Input";
import { IconEthereum } from "icons";

const InputEthereum = (props: any) => {
  return <Input {...props} icon={<IconEthereum className="cursor-pointer fill-gray-light peer-focus:fill-white" />} />;
};

export default InputEthereum;
