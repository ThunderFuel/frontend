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

import "./SideBarFilter.css";

enum FilterComponentType {
  Input = 0,
  RadioList = 3,
  CheckboxList = 5,
  RangeBar = 3,
  RangeInput = 1,
}

const SidebarFilter = () => {
  const { displayType, setDisplayType, filters, params, setParams, deleteParams, options } = useCollectionListContext();
  const [show, setShow] = React.useState(options?.hiddenFilter);

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

  const onChange = (name: any, value: any, type: number) => {
    if (Array.isArray(value) && !value.length) {
      deleteParams(name);
    } else {
      setParams({ [name]: { value, type } });
    }
  };

  const getFilter = React.useMemo(() => {
    return filters.map((filter: any, i: number) => {
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
      const type = filter.type ?? 0;
      const value = params?.[name]?.value;

      return {
        name,
        type,
        value,
        dynamicComponent: DynamicComponent,
        filterData: filter.filterData,
      };
    });
  }, [filters, params]);

  return (
    <div className="flex justify-end">
      <div className={clsx("border-r border-r-gray transition-all duration-300", show ? "w-16" : "w-72")}>
        <div className="sticky top-[178px] overflow-hidden h-fit">
          <div className="flex w-72 pr-5 py-5 relative overflow-hidden overflow-y-auto sidebar-h-screen">
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
                {getFilter.map((item: any, i: number) => {
                  const DynamicComponent = item.dynamicComponent;

                  return (
                    <Collapse key={i}>
                      <Collapse.Header>{item.name ?? "-"}</Collapse.Header>
                      <Collapse.Body>
                        <DynamicComponent
                          filterData={item.filterData}
                          name={item.name}
                          value={item.value}
                          onChange={(name: any, value: any) => {
                            onChange(name, value, item.type);
                          }}
                        />
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
