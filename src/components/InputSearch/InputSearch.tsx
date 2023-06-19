import { IconSearch } from "icons";
import React from "react";
import Input from "../Input";

const InputSearch = (props: any) => {
  return <Input {...props} containerClassName="flex-row-reverse" icon={<IconSearch className="cursor-pointer text-gray-light peer-focus:text-white" />} />;
};

export default InputSearch;
