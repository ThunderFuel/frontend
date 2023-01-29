import React from "react";
import Input from "../Input/Input";
import { IconEthereum } from "icons";

const InputEthereum = (props: any) => {
  const { onChange, ...etc } = props;
  const handleChange = (event: any) => {
    const newValue = event.target.value;
    const lastChar = newValue.substring(newValue.length - 1);
    if (newValue.match(/^(0*[1-9]\d*|0*[1-9]\d*\.\d+|0*\.\d+|0+)$/)) {
      onChange(lastChar === "0" ? newValue : +newValue);
    } else if (lastChar === "." && !newValue.substring(0, newValue.length - 1).includes(".")) {
      onChange(newValue);
    } else if (newValue === "") {
      onChange(newValue);
    }
  };

  return <Input {...etc} onChange={handleChange} icon={<IconEthereum className="text-gray-light peer-focus:text-white" />} />;
};

export default InputEthereum;
