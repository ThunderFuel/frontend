import React from "react";
import { IconChevronDoubleLeft, IconFilter } from "icons";
import Collapse from "components/Collapse";
import clsx from "clsx";
import CheckboxList from "./components/CheckboxList";
import RadioList from "./components/RadioList";
import RangeBar from "./components/RangeBar";
import RangeInputOptions from "./components/RangeInputOptions";
import RangeInput from "./components/RangeInput";
import { DisplayType, useCollectionListContext } from "../../CollectionListContext";

enum FilterComponentType {
  Input = 0,
  RadioList = 1,
  CheckboxList = 2,
  RangeBar = 3,
  RangeInput = 4,
}

const SidebarFilter = () => {
  const { displayType, setDisplayType, filters, params, setParams } = useCollectionListContext();
  const [show, setShow] = React.useState(false);

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

  const onChange = (name: any, value: any) => {
    setParams({ [name]: value });
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
                  let DynamicComponent: any = RangeInputOptions;
                  if (FilterComponentType.RadioList === filter.type) {
                    DynamicComponent = RadioList;
                  } else if (FilterComponentType.CheckboxList === filter.type) {
                    DynamicComponent = CheckboxList;
                  } else if (FilterComponentType.RangeBar === filter.type) {
                    DynamicComponent = RangeBar;
                  } else if (FilterComponentType.RangeInput === filter.type) {
                    DynamicComponent = RangeInput;
                  }

                  const name = filter.name ?? i;

                  return (
                    <Collapse key={i}>
                      <Collapse.Header>{filter.name ?? "-"}</Collapse.Header>
                      <Collapse.Body>
                        <DynamicComponent filterData={filter.filterData} name={name} value={params?.[name]} onChange={onChange} />
                      </Collapse.Body>
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
