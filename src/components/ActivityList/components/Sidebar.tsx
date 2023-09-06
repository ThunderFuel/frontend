import React from "react";
import clsx from "clsx";
import { useActivityContext } from "../ActivityContext";
import SidebarFilterBase from "components/SidebarFilter";
import Collapse from "components/Collapse/Collapse";
import Checkbox from "components/CheckBox";

const Sidebar = ({ className = "w-[280px]", hiddenTabOffset = false }: any) => {
  const { filters, onChangeSelectedFilter, selectedFilter } = useActivityContext();

  const onClick = (filterIndex: any) => {
    const indexOf = selectedFilter.indexOf(filterIndex);
    if (indexOf > -1) {
      selectedFilter.splice(indexOf, 1);
      onChangeSelectedFilter(selectedFilter);
    } else {
      selectedFilter.push(filterIndex);
      onChangeSelectedFilter(selectedFilter);
    }
  };

  return (
    <SidebarFilterBase className={className} hiddenTabOffset={hiddenTabOffset}>
      <Collapse isOpen={true}>
        <Collapse.Header>Activity Type</Collapse.Header>
        <Collapse.Body>
          {Object.keys(filters).map((filterIndex: any) => {
            const filter = filters[filterIndex];
            const Icon = filter.icon;
            const isActive = selectedFilter.includes(filterIndex);

            return (
              <div
                key={filterIndex}
                className={clsx("rounded-md gap-1 border border-gray text-gray-light items-center body-medium cursor-pointer hover:text-white", isActive ? "text-white bg-gray" : "bg-bg")}
              >
                <Checkbox containerClassName={"w-full p-2.5"} checked={isActive} onClick={() => onClick(filterIndex)} name="activity-type">
                  <div className="flex w-full">
                    <Icon className="w-5 h-5" />
                    {filter.name}
                  </div>
                </Checkbox>
              </div>
            );
          })}
        </Collapse.Body>
      </Collapse>
    </SidebarFilterBase>
  );
};

export default Sidebar;
