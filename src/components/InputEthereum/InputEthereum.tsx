import React from "react";
import Input from "../Input/Input";
import { IconEthereum } from "icons";

const InputEthereum = (props: any) => {
  const { onChange, ...etc } = props;

  const onInput = (value: any) => {
    const [val, decimal] = String(value).split(".");
    if (decimal && decimal.length > 9) {
      onChange(`${val}.${decimal.substring(0, 9)}`);

      return;
    }
    onChange(value);
  };

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    const lastChar = newValue.substring(newValue.length - 1);

    // Don't parse into a number to avoid scientific notation
    if (newValue.match(/^(0*[1-9]\d*|0*[1-9]\d*\.\d+|0*\.\d+|0+)$/)) {
      onInput(newValue); // Keep value as string
    } else if (lastChar === "." && !newValue.substring(0, newValue.length - 1).includes(".")) {
      onInput(newValue);
    } else if (newValue === "") {
      onInput(newValue);
    }
  };

  return <Input {...etc} maxLength={etc.maxLength ?? "15"} onChange={handleChange} icon={<IconEthereum className="text-gray-light peer-focus:text-white" />} />;
};

export default InputEthereum;
