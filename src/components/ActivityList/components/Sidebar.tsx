import React from "react";
import clsx from "clsx";
import { useActivityContext } from "../ActivityContext";
import SidebarFilterBase from "components/SidebarFilter";
import Collapse from "components/Collapse/Collapse";
import Radio from "components/Radio";

const Sidebar = ({ className = "w-[280px]" }: any) => {
  const { filters, onChangeSelectedFilter, selectedFilter } = useActivityContext();

  const onClick = (filterIndex: any) => {
    if (selectedFilter === filterIndex) {
      onChangeSelectedFilter(null);
    } else {
      onChangeSelectedFilter(filterIndex);
    }
  };

  return (
    <SidebarFilterBase className={className}>
      <Collapse isOpen={true}>
        <Collapse.Header>Event Types</Collapse.Header>
        <Collapse.Body>
          {Object.keys(filters).map((filterIndex: any) => {
            const filter = filters[filterIndex];
            const Icon = filter.icon;
            const isActive = filterIndex === selectedFilter;

            return (
              <div
                key={filterIndex}
                className={clsx("rounded-md gap-1 border border-gray text-gray-light items-center body-medium cursor-pointer hover:text-white", isActive ? "text-white bg-gray" : "bg-bg")}
              >
                <Radio containerClassName={"w-full p-2.5"} defaultChecked={isActive} onClick={() => onClick(filterIndex)} name="activity-type">
                  <div className="flex w-full">
                    <Icon className="w-5 h-5" />
                    {filter.name}
                  </div>
                </Radio>
              </div>
            );
          })}
        </Collapse.Body>
      </Collapse>
    </SidebarFilterBase>
  );
};

export default Sidebar;
