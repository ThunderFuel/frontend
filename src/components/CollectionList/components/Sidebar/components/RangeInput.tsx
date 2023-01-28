import React, { ChangeEvent } from "react";
import InputEthereum from "components/InputEthereum";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import clsx from "clsx";

enum Input {
  Min = "min",
  Max = "max",
}

const RangeInput = ({ value = {}, name, onChange }: any) => {
  const [isFocus, setIsFocus] = React.useState<any>(null);
  const [inputValue, setInputValue] = React.useState<any>({});
  const onSubmit = () => {
    onChange(name, inputValue);
  };

  return (
    <div className="flex flex-col gap-2 text-white">
      <InputEthereum
        containerClassName={clsx(isFocus === Input.Min ? "bg-gray" : "")}
        onFocus={() => setIsFocus(Input.Min)}
        onBlur={() => setIsFocus("")}
        placeholder="Min"
        value={value?.[Input.Min]}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          inputValue[Input.Min] = e.target.value;
          setInputValue(inputValue);
        }}
      />
      <InputEthereum
        containerClassName={clsx(isFocus === Input.Max ? "bg-gray" : "")}
        onFocus={() => setIsFocus(Input.Max)}
        onBlur={() => setIsFocus("")}
        placeholder="Max"
        value={value?.[Input.Max]}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          inputValue[Input.Max] = e.target.value;
          setInputValue(inputValue);
        }}
      />
      <Button className="btn-secondary btn-sm" onClick={onSubmit}>
        Apply <IconArrowRight />
      </Button>
    </div>
  );
};

export default RangeInput;
