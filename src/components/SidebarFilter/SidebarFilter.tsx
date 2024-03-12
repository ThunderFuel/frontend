import React from "react";
import clsx from "clsx";
import "./SideBarFilter.css";

import { IconChevronDoubleLeft, IconFilter } from "icons";
import { DisplayType } from "../CollectionList/CollectionListContext";

const SidebarFilter = ({ options, className, children, displayType, setDisplayType = console.log, hiddenTabOffset = false }: any) => {
  const [show, setShow] = React.useState(options?.hiddeSidebarFilter);
  const onToggle = () => {
    const tmpShow = !show;
    if (displayType !== DisplayType.LIST) {
      if (tmpShow) {
        setDisplayType((prevState: string) => String(parseInt(prevState) + 1));
      } else {
        setDisplayType((prevState: string) => String(parseInt(prevState) - 1));
      }
    }
    setShow(tmpShow);
  };

  return (
    <div className="hidden lg:flex justify-end">
      <div className={clsx("border-r border-r-gray transition-all duration-300", show ? "w-16" : className)}>
        <div className={`sticky h-fit ${show ? "overflow-hidden" : ""}`} style={{ top: `calc(var(--headerHeight) + ${!hiddenTabOffset ? "68px" : "0px"})` }}>
          <div className={clsx("flex pr-5 py-5 relative sidebar-h-screen", !show ? "overflow-hidden overflow-y-auto" : "")}>
            <div className={clsx("absolute transition-all duration-300", show ? "left-0" : "-left-12")} onClick={onToggle}>
              <div className="icon-btn dark:bg-white dark:text-gray text-gray-light">
                <IconFilter />
              </div>
            </div>
            <div className={clsx("flex-1 transition-all duration-300", show && "pl-16")}>
              <div className="flex items-center justify-between border-b border-b-gray pb-4">
                <h5 className="text-h5 text-white">Filters</h5>
                <div className="icon-btn cursor-pointer" onClick={onToggle}>
                  <IconChevronDoubleLeft className="text-gray-light" />
                </div>
              </div>
              <div className="flex flex-col gap-2.5 py-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
