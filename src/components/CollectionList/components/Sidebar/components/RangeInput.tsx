import React from "react";
import InputEthereum from "components/InputEthereum/InputEthereum";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import clsx from "clsx";

enum Input {
  Min,
  Max,
}
const RangeInput = () => {
  const [isFocus, setIsFocus] = React.useState<any>(null);

  return (
    <div className="flex flex-col gap-2 text-white">
      <InputEthereum containerClassName={clsx(isFocus === Input.Min ? "bg-gray" : "")} onFocus={() => setIsFocus(Input.Min)} onBlur={() => setIsFocus("")} placeholder="Min" />
      <InputEthereum containerClassName={clsx(isFocus === Input.Max ? "bg-gray" : "")} onFocus={() => setIsFocus(Input.Max)} onBlur={() => setIsFocus("")} placeholder="Max" />
      <Button className="btn-secondary btn-sm">
        Apply <IconArrowRight />
      </Button>
    </div>
  );
};

export default RangeInput;
