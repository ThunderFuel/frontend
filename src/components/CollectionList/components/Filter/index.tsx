import React from "react";
import TabDisplayType from "./TabDisplayType";
import InputSearch from "components/InputSearch";
import InputRange from "components/InputRange";
import Input from "components/Input";
import { IconClear } from "icons";
import clsx from "clsx";
import SelectOrderBy from "./SelectOrderBy";
import { useCollectionListContext } from "../../CollectionListContext";
import { ISelectOption } from "components/Select";

const Range = (props: any) => {
  const [rangeValue, setRangeValue] = React.useState(0);
  const onChange = (value: any) => {
    setRangeValue(value);
    props.onChange(value);
  };

  return (
    <div className="flex gap-5 px-5 py-2.5 border-r border-r-gray">
      <div className="flex flex-col justify-center flex-1 gap-2">
        <div className="text-headline-01 uppercase text-gray-light">Sweep</div>
        <div className="overflow-hidden px-1.5 -mx-1.5 rounded-full">
          <InputRange value={rangeValue} minValue={0} maxValue={props.maxValue ?? 100} onChange={onChange} />
        </div>
      </div>
      <div>
        <Input
          value={rangeValue}
          onChange={(e: any) => {
            onChange(e.target.value);
          }}
          icon={<IconClear className="w-6 h-6 mr-2 cursor-pointer" />}
          containerClassName="flex-row-reverse"
          className={clsx("w-10 border-l border-l-gray pl-4", rangeValue > 0 ? "text-white" : "text-gray")}
          placeholder={"0"}
        />
      </div>
    </div>
  );
};

const Index = () => {
  const { options, setParams, pagination } = useCollectionListContext();
  let rangeTimeout: any;
  const onRangeChange = (value: any) => {
    clearTimeout(rangeTimeout);
    rangeTimeout = setTimeout(() => {
      setParams({ pageSize: value });
    }, 1000);
  };

  return (
    <div className="sticky top-[109px] border-b border-gray z-20 bg-bg">
      <div className="container-fluid">
        <div className="flex items-center justify-between text-white gap-5">
          <div className="grid grid-cols-3 flex-1 items-center">
            <div className={clsx("py-2.5 pr-5 flex-1 border-r border-r-gray", options?.hiddenSweep && "grid-cols-2")}>
              <InputSearch placeholder="Search ID or name" />
            </div>
            {options?.hiddenSweep ? <div /> : <Range maxValue={pagination.itemsCount} onChange={onRangeChange} />}
            <div className="pl-5 flex justify-end">
              <SelectOrderBy
                onChange={(option: ISelectOption) => {
                  setParams({ sortingType: option.value });
                }}
              />
            </div>
          </div>
          <div className="flex-center">
            <TabDisplayType />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
