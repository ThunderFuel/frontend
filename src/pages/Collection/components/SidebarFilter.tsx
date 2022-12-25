import React from "react";
import { IconChevronDoubleLeft } from "icons";

const SidebarFilter = () => {
  return (
    <div className="flex justify-end">
      <div className="w-72 pr-5 py-5 border-r border-r-gray">
        <div className="flex items-center justify-between">
          <h5 className="text-h5 text-white">Filters</h5>
          <div className="icon-btn">
            <IconChevronDoubleLeft className="text-gray-light" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
