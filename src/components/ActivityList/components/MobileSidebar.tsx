import React from "react";
import Dropdown from "components/Dropdown";
import Checkbox from "components/CheckBox/Checkbox";
import { IconMobileFilter } from "icons";
import { useActivityContext } from "../ActivityContext";

const MobileSidebar = () => {
  const { filters, onChangeSelectedFilter, selectedFilter } = useActivityContext();
  const options = Object.keys(filters).map((filterIndex: any) => {
    return {
      ...filters[filterIndex],
      text: filters[filterIndex].name,
      value: parseInt(filterIndex),
    };
  });

  const onClick = (filterIndex: any) => {
    const indexOf = selectedFilter.indexOf(filterIndex);
    if (indexOf > -1) {
      selectedFilter.splice(indexOf, 1);
    } else {
      selectedFilter.push(filterIndex);
    }
    onChangeSelectedFilter(selectedFilter);
  };

  const getSelectedFilter = React.useMemo(() => {
    return options
      .filter((option) => selectedFilter.includes(option.value))
      .map((o) => o.text)
      .join(", ");
  }, [JSON.stringify(selectedFilter)]);

  const renderItem = (item: any) => {
    const Icon = item.icon;
    const isActive = selectedFilter.includes(item.value);

    return (
      <li key={item.value} className="flex item-center cursor-pointer text-white border border-gray rounded">
        <Checkbox containerClassName={"w-full p-2.5"} checked={isActive} onClick={() => onClick(item.value)} name="activity-type">
          <div className="flex w-full gap-1">
            <Icon className="w-5 h-5" />
            {item.text}
          </div>
        </Checkbox>
      </li>
    );
  };

  return (
    <div className="px-5 py-2.5">
      <Dropdown options={options} onClick={onClick} isToggle={true} renderItem={renderItem} hideBorder={true} className="w-full gap-1 p-3">
        <div className="flex gap-3 border border-gray rounded text-white w-full justify-start px-3 py-2.5">
          <IconMobileFilter />
          <span className="body-medium">Show: {getSelectedFilter}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default MobileSidebar;
