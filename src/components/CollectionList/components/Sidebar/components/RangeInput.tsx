import React from "react";
import InputEthereum from "components/InputEthereum";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import clsx from "clsx";

enum Input {
  Min = "min",
  Max = "max",
}

const RangeInput = ({ value, name, onChange }: any) => {
  const [isFocus, setIsFocus] = React.useState<any>(null);
  const [minValue, setMinValue] = React.useState<any>(value?.[Input.Min] ?? "");
  const [maxValue, setMaxValue] = React.useState<any>(value?.[Input.Max] ?? "");
  const onSubmit = () => {
    onChange(name, {
      [Input.Min]: minValue,
      [Input.Max]: maxValue,
    });
  };
  React.useEffect(() => {
    if (!value) {
      setMaxValue("");
      setMinValue("");
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-2 text-white">
      <InputEthereum
        containerClassName={clsx(isFocus === Input.Min ? "bg-gray" : "")}
        onFocus={() => setIsFocus(Input.Min)}
        onBlur={() => setIsFocus("")}
        placeholder="Min"
        value={minValue}
        onChange={(value: any) => {
          setMinValue(value);
        }}
      />
      <InputEthereum
        containerClassName={clsx(isFocus === Input.Max ? "bg-gray" : "")}
        onFocus={() => setIsFocus(Input.Max)}
        onBlur={() => setIsFocus("")}
        placeholder="Max"
        value={maxValue}
        onChange={(value: any) => {
          setMaxValue(value);
        }}
      />
      <Button className="btn-secondary btn-sm" onClick={onSubmit} disabled={!minValue && !maxValue}>
        Apply <IconArrowRight />
      </Button>
    </div>
  );
};

export default RangeInput;
