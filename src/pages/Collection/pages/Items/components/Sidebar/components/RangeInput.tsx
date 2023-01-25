import React from "react";
import InputEthereum from "components/InputEthereum/InputEthereum";
import Button from "components/Button";
import { IconArrowRight } from "icons";

const RangeInput = () => {
  return (
    <div className="flex flex-col gap-2 text-white">
      <InputEthereum placeholder="Min" />
      <InputEthereum placeholder="Max" />
      <Button className="btn-secondary btn-sm">
        Apply <IconArrowRight />
      </Button>
    </div>
  );
};

export default RangeInput;
