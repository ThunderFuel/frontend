import React from "react";
import Checkbox from "components/CheckBox/Checkbox";
import Dropdown from "components/Dropdown";
import { IconMobileFilter } from "icons";

const Status = (props: any) => {
  const options = [
    {
      value: 1,
      text: "Active Offers",
    },
    {
      value: 2,
      text: "Accepted Offers",
    },
    // {
    //   value: 3,
    //   text: "Expired Offers",
    // },
    {
      value: 0,
      text: "Canceled Offers",
    },
  ];
  const onChange = (value: any) => {
    props.filterValue["offerStatus"] = value;
    props.onChange(props.filterValue);
  };

  const renderItem = (item: any) => {
    // const Icon = item.icon;
    // const isActive = selectedFilter.includes(item.value);

    return (
      <li key={item.value} className="flex item-center cursor-pointer text-white border border-gray rounded">
        <Checkbox containerClassName={"w-full p-2.5"} onClick={() => onChange(item.value)} name="activity-type">
          <div className="flex w-full gap-1">{item.text}</div>
        </Checkbox>
      </li>
    );
  };
  const getSelectedFilter = React.useMemo(() => {
    return options.find((option) => props.filterValue["offerStatus"] === option.value)?.text;
  }, [props.filterValue["offerStatus"]]);

  return (
    <div className="">
      <Dropdown options={options} isToggle={true} renderItem={renderItem} hideBorder={true} className="w-full gap-1 p-3">
        <div className="flex gap-3 border border-gray rounded text-white w-full justify-start px-3 py-2.5">
          <IconMobileFilter />
          <span className="body-medium">Show: {getSelectedFilter}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default Status;
