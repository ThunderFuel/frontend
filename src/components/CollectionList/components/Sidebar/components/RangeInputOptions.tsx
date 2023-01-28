import React, { ChangeEvent } from "react";
import InputEthereum from "components/InputEthereum";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import clsx from "clsx";

enum Input {
  Min = "min",
  Max = "max",
}

const items = ["Top 1%", "Top 2%", "Top 3%"];
const RangeInputOptions = ({ value = {}, onChange, name }: any) => {
  const [isFocus, setIsFocus] = React.useState<any>(null);

  const onInputChange = (type: any, inputValue: any) => {
    value[type] = inputValue;
    onChange(name, value);
  };

  return (
    <div className="flex flex-col gap-2 text-white">
      <ul className="flex gap-2 w-full">
        {items.map((item: any) => (
          <li className="body-small p-2.5 rounded-md border border-gray hover:bg-bg-light flex-1 cursor-pointer" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <InputEthereum
        placeholder="Min"
        containerClassName={clsx(isFocus === Input.Min ? "bg-gray" : "")}
        onFocus={() => setIsFocus(Input.Min)}
        onBlur={() => setIsFocus("")}
        value={value?.[Input.Min]}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onInputChange(Input.Min, e.target.value);
        }}
      />
      <InputEthereum
        placeholder="Max"
        containerClassName={clsx(isFocus === Input.Max ? "bg-gray" : "")}
        onFocus={() => setIsFocus(Input.Max)}
        onBlur={() => setIsFocus("")}
        value={value?.[Input.Max]}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onInputChange(Input.Max, e.target.value);
        }}
      />
      <Button className="btn-secondary btn-sm">
        Apply <IconArrowRight />
      </Button>
    </div>
  );
};

export default RangeInputOptions;
