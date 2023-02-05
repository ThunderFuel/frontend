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
import { useAppDispatch } from "store";
import { sweepAdd } from "store/cartSlice";

const Range = (props: any) => {
  return (
    <div className="flex gap-5 px-5 py-2.5 border-r border-r-gray">
      <div className="flex flex-col justify-center flex-1 gap-2">
        <div className="text-headline-01 uppercase text-gray-light">Sweep</div>
        <div className="overflow-hidden px-1.5 -mx-1.5 rounded-full">
          <InputRange value={props.value} minValue={0} maxValue={props.maxValue ?? 100} onChange={props.onChange} />
        </div>
      </div>
      <div>
        <Input
          value={props.value}
          onChange={(e: any) => {
            props.onChange(e.target.value);
          }}
          icon={<IconClear className="w-6 h-6 mr-2 cursor-pointer" />}
          containerClassName="flex-row-reverse"
          className={clsx("w-10 border-l border-l-gray pl-4", props.value > 0 ? "text-white" : "text-gray")}
          placeholder={"0"}
        />
      </div>
    </div>
  );
};

const KEY_ENTER = "Enter";

const Index = () => {
  const dispatch = useAppDispatch();
  const { options, setParams, pagination, collectionItems, sweep, setSweep } = useCollectionListContext();
  const onRangeChange = (value: any) => {
    setSweep(value);
    const sweepCollectionItems = [...collectionItems].splice(0, value);
    dispatch(sweepAdd(sweepCollectionItems));
  };

  const onKeyPress = (e: any) => {
    if (e.key === KEY_ENTER) {
      setParams({ search: e.target.value });
    }
  };

  return (
    <div className="sticky top-[109px] border-b border-gray z-20 bg-bg">
      <div className="container-fluid">
        <div className="flex items-center justify-between text-white gap-5">
          <div className="flex items-center w-full">
            <div className="flex flex-1">
              <div className={clsx("py-2.5 pr-5 flex-1 border-r border-r-gray", options?.hiddenSweep && "col-span-1")}>
                <InputSearch placeholder="Search ID or name" onKeyPress={onKeyPress} />
              </div>
              {options?.hiddenSweep ? null : (
                <div className="w-96">
                  <Range maxValue={pagination.itemsCount} value={sweep} onChange={onRangeChange} />
                </div>
              )}
            </div>
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
