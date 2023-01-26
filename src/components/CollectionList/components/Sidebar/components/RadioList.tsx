import React from "react";
import clsx from "clsx";
import Radio from "components/Radio";

const RadioList = ({ filterData, name, onChange, value }: { filterData: any; name: any; onChange: any; value: any }) => {
  return filterData.map((item: any, i: number) => {
    const isChecked = item.value === value;

    return (
      <div key={i} className={clsx("hover:bg-bg-light border border-gray rounded-md p-2.5 text-white", isChecked ? "bg-gray" : "")}>
        <Radio value={item.value} defaultChecked={isChecked} name={name} onClick={() => onChange(name, item.value)}>
          <span className="body-medium">{item.text}</span>
        </Radio>
      </div>
    );
  });
};

export default RadioList;
