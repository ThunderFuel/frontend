import React from "react";
import Input from "components/Input";
import { IconEthereum } from "icons";

const InputPrice = (props: any) => {
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
    if (newValue.match(/^(0*[1-9]\d*|0*[1-9]\d*\.\d+|0*\.\d+|0+)$/)) {
      onInput(lastChar === "0" ? newValue : +newValue);
    } else if (lastChar === "." && !newValue.substring(0, newValue.length - 1).includes(".")) {
      onInput(newValue);
    } else if (newValue === "") {
      onInput(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-y-2 text-white font-spaceGrotesk bg-bg-light">
      <Input maxLength="15" {...etc} onChange={handleChange} icon={<IconEthereum color="gray" />}></Input>
    </div>
  );
};

export default InputPrice;
