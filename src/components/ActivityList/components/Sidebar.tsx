import React from "react";
import clsx from "clsx";
import { useActivityContext } from "../ActivityContext";
import SidebarFilterBase from "components/SidebarFilter";
import Collapse from "components/Collapse/Collapse";
import Checkbox from "components/CheckBox";
import { useIsMobile } from "hooks/useIsMobile";

const Sidebar = ({ className = "w-[280px]", hiddenTabOffset = false }: any) => {
  const { filters, onChangeSelectedFilter, selectedFilter } = useActivityContext();
  if (useIsMobile()) {
    return null;
  }

  const onClick = (filterIndex: any) => {
    const indexOf = selectedFilter.indexOf(filterIndex);
    if (indexOf > -1) {
      selectedFilter.splice(indexOf, 1);
    } else {
      selectedFilter.push(filterIndex);
    }
    onChangeSelectedFilter(selectedFilter);
  };

  return (
    <SidebarFilterBase className={className} hiddenTabOffset={hiddenTabOffset}>
      <Collapse isOpen={true}>
        <Collapse.Header>Activity Type</Collapse.Header>
        <Collapse.Body>
          {Object.keys(filters).map((filterIndex: any) => {
            const index = Number(filterIndex);
            const filter = filters[filterIndex];
            const Icon = filter.icon;
            const isActive = selectedFilter.includes(index);

            return (
              <div key={filterIndex} className={clsx("rounded-md gap-1 border border-gray text-white items-center body-medium cursor-pointer hover:text-white", isActive ? "bg-gray" : "bg-bg")}>
                <Checkbox containerClassName={"w-full p-2.5"} checked={isActive} onClick={() => onClick(index)} name="activity-type">
                  <div className="flex w-full gap-1">
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
