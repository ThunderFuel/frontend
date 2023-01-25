import React, { useEffect } from "react";
import { IconChevronDoubleLeft, IconFilter } from "icons";
import Collapse from "components/Collapse";
import clsx from "clsx";
import { DisplayType, useItemContext } from "../../ItemContext";
import CheckboxList from "./components/CheckboxList";
import RadioList from "./components/RadioList";
import RangeBar from "./components/RangeBar";
import RangeInputOptions from "./components/RangeInputOptions";
import RangeInput from "./components/RangeInput";

enum FilterComponentType {
  Input = 0,
  RadioList = 1,
  CheckboxList = 2,
  RangeBar = 3,
  RangeInput = 4,
}

const SidebarFilter = () => {
  const { displayType, setDisplayType, fetchFilters, filters } = useItemContext();
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    fetchFilters();
  }, []);

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
    <div className="flex justify-end">
      <div className={clsx("border-r border-r-gray transition-all duration-300", show ? "w-16" : "w-72")}>
        <div className="sticky top-[178px] overflow-hidden h-fit">
          <div className="flex w-72 pr-5 py-5 relative">
            <div className={clsx("absolute transition-all duration-300", show ? "left-0" : "-left-12")} onClick={onToggle}>
              <div className="icon-btn bg-white fill-gray">
                <IconFilter />
              </div>
            </div>
            <div className={clsx("flex-1 transition-all duration-300", show && "pl-16")}>
              <div className="flex items-center justify-between border-b border-b-gray pb-5">
                <h5 className="text-h5 text-white">Filters</h5>
                <div className="icon-btn cursor-pointer" onClick={onToggle}>
                  <IconChevronDoubleLeft className="text-gray-light" />
                </div>
              </div>
              <div className="flex flex-col gap-2.5 py-5">
                {filters.map((filter: any, i: number) => {
                  let filterComponent: any = "";
                  if (FilterComponentType.Input === filter.type) {
                    filterComponent = <RangeInputOptions />;
                  } else if (FilterComponentType.RadioList === filter.type) {
                    filterComponent = <RadioList filterData={filter.filterData} />;
                  } else if (FilterComponentType.CheckboxList === filter.type) {
                    filterComponent = <CheckboxList filterData={filter.filterData} />;
                  } else if (FilterComponentType.RangeBar === filter.type) {
                    filterComponent = <RangeBar />;
                  } else if (FilterComponentType.RangeInput === filter.type) {
                    filterComponent = <RangeInput />;
                  }

                  return (
                    <Collapse key={i}>
                      <Collapse.Header>{filter.name ?? "-"}</Collapse.Header>
                      <Collapse.Body>{filterComponent}</Collapse.Body>
                    </Collapse>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
