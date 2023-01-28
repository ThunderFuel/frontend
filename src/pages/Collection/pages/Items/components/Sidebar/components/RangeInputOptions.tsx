import React from "react";
import InputEthereum from "components/InputEthereum/InputEthereum";
import Button from "components/Button";
import { IconArrowRight } from "icons";

const items = ["Top 1%", "Top 2%", "Top 3%"];
const RangeInputOptions = () => {
  return (
    <div className="flex flex-col gap-2 text-white">
      <ul className="flex gap-2 w-full">
        {items.map((item: any) => (
          <li className="body-small p-2.5 rounded-md border border-gray hover:bg-bg-light flex-1 cursor-pointer" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <InputEthereum placeholder="Min" />
      <InputEthereum placeholder="Max" />
      <Button className="btn-secondary btn-sm">
        Apply <IconArrowRight />
      </Button>
    </div>
  );
};

export default RangeInputOptions;
