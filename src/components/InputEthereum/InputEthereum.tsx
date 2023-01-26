import React from "react";
import Input from "../Input/Input";
import { IconEthereum } from "icons";

const InputEthereum = (props: any) => {
  return <Input {...props} icon={<IconEthereum className="text-gray-light peer-focus:text-white" />} />;
};

export default InputEthereum;
