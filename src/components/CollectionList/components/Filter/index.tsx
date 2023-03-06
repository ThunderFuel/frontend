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
        <div className="text-headline-01 uppercase text-gray-light -ml-1.5">Sweep</div>
        <div className="overflow-hidden px-1.5 -mx-1.5 rounded-full">
          <InputRange value={props.value} minValue={0} maxValue={props.maxValue ?? 30} onChange={props.onChange} />
        </div>
      </div>
      <div>
        <Input
          value={props.value}
          onChange={(e: any) => {
            props.onChange(e.target.value);
          }}
          icon={<IconClear className="w-6 h-6 mr-2" />}
          containerClassName="flex-row-reverse"
          className={clsx("w-10 border-l border-l-gray pl-4", props.value > 0 ? "text-white" : "text-gray")}
          placeholder={"0"}
        />
      </div>
    </div>
  );
};

const KEY_ENTER = "Enter";

const Index = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const { options, setParams, collectionItems, sweep, setSweep, params } = useCollectionListContext();
  const [search, setSearch] = React.useState(params?.search ?? "");
  const onRangeChange = (value: any) => {
    setSweep(value);
    const sweepCollectionItems = [...collectionItems.filter((collectionItem: any) => collectionItem.salable)].splice(0, value);
    const collectionId = collectionItems?.[0].collectionId;
    dispatch(
      sweepAdd({
        items: sweepCollectionItems,
        collectionId,
      })
    );
  };

  const onKeyPress = (e: any) => {
    if (e.key === KEY_ENTER) {
      setParams({ search: e.target.value });
    }
  };

  return (
    <div className={`sticky border-b border-gray z-20 bg-bg`} style={{ top: "var(--headerHeight)" }}>
      <div className={clsx(className ? className : "container-fluid")}>
        <div className="flex items-center justify-between text-white gap-5">
          <div className="flex items-center w-full">
            <div className="flex flex-1">
              <div className={clsx("py-2.5 pr-5 flex-1 border-r border-r-gray", options?.hiddenSweep ? "w-full" : "w-7/12")}>
                <InputSearch placeholder="Search ID or name" value={search} onKeyPress={onKeyPress} onChange={(e: any) => setSearch(e.target.value)} />
              </div>
              {options?.hiddenSweep ? null : (
                <div className="w-5/12">
                  <Range maxValue={30} value={sweep} onChange={onRangeChange} />
                </div>
              )}
            </div>
            <div className="pl-5 flex justify-end">
              <SelectOrderBy
                value={params.sortingType}
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
