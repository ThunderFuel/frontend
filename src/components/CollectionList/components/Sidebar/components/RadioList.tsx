import React from "react";
import clsx from "clsx";
import Radio from "components/Radio";

const RadioList = ({ filterData }: { filterData: any }) => {
  return filterData.map((item: any, i: number) => (
    <div key={i} className={clsx("hover:bg-bg-light border border-gray rounded-md p-2.5 text-white", false && "bg-gray")}>
      <Radio value={item.value} name={"musa"}>
        <span className="body-medium">{item.text}</span>
      </Radio>
    </div>
  ));
};

export default RadioList;
