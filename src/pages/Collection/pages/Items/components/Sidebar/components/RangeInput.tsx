import React from "react";
import Input from "components/Input";

const items = ["Top 1%", "Top 2%", "Top 3%"];
const RangeInput = () => {
  return (
    <div className="flex flex-col gap-2 text-white">
      <ul className="flex gap-2 w-full">
        {items.map((item: any) => (
          <li className="body-small p-2.5 rounded-md border border-gray hover:bg-bg-light flex-1 cursor-pointer" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <Input placeholder="Min" className="input-filter-range" />
      <Input placeholder="Max" className="input-filter-range" />
    </div>
  );
};

export default RangeInput;
