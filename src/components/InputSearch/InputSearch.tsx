import { IconSearch } from "icons";
import React from "react";
import Input from "../Input";

const InputSearch = (props: any) => {
  return <Input {...props} icon={<IconSearch className="inputIcon cursor-pointer fill-gray-light" />} />;
};

export default InputSearch;
