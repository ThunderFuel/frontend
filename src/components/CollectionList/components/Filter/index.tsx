import React from "react";
import TabDisplayType from "./TabDisplayType";
import InputSearch from "components/InputSearch";
import InputRange from "components/InputRange";
import Input from "components/Input";
import { IconClear, IconMobileFilter } from "icons";
import clsx from "clsx";
import SelectOrderBy from "./SelectOrderBy";
import { useCollectionListContext } from "../../CollectionListContext";
import { ISelectOption } from "components/Select";
import { useAppDispatch, useAppSelector } from "store";
import { sweepAdd } from "store/cartSlice";
import config from "../../../../config";
import Button from "../../../Button";

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
const MobileRange = (props: any) => {
  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [customStyle, setCustomStyle] = React.useState({});
  const onClick = () => {
    setShow(!show);
  };

  React.useEffect(() => {
    if (containerRef.current) {
      const { offsetLeft } = containerRef.current;
      setCustomStyle({
        width: `${window.innerWidth}px`,
        marginTop: "11px",
        left: `${offsetLeft * -1}px`,
      });
    }
  }, [containerRef, show]);

  return (
    <div className="relative" ref={containerRef}>
      <Button className={clsx("btn-icon", show ? "bg-white text-black" : "text-white")} onClick={onClick}>
        <IconClear />
      </Button>
      {show ? (
        <div className="absolute top-full flex flex-col bg-bg border-y border-y-gray w-full overflow-hidden z-10" style={customStyle}>
          <Range {...props} />
        </div>
      ) : null}
    </div>
  );
};

const KEY_ENTER = "Enter";

const Index = ({ className }: { className?: string }) => {
  const { user } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const { options, setParams, collectionItems, sweep, setSweep, params, showMobileFilter, isMobile } = useCollectionListContext();
  const [search, setSearch] = React.useState(params?.search ?? "");
  const swapLimit = config.getConfig("collectionSwapLimit");
  const onRangeChange = (value: any) => {
    setSweep(value);
    const sweepCollectionItems = [...collectionItems.filter((collectionItem: any) => collectionItem.salable && collectionItem.userId !== user.id)].splice(0, value);
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
      <div className={clsx(className ? className : "px-2.5 lg:container-fluid")}>
        <div className="flex items-center justify-between text-white gap-2.5 py-2.5 lg:gap-5">
          <div className="flex gap-2.5 lg:gap-none items-center w-full">
            <Button className="lg:hidden btn-icon text-white" onClick={showMobileFilter}>
              <IconMobileFilter />
            </Button>
            <div className="flex gap-2.5 flex-center flex-1">
              {isMobile ? <MobileRange maxValue={swapLimit} value={sweep} onChange={onRangeChange} /> : null}
              <div className={clsx("lg:pr-5 flex-1 lg:border-r lg:border-r-gray", options?.hiddenSweep ? "w-full" : "w-7/12")}>
                <InputSearch placeholder="Search ID or name" value={search} onKeyPress={onKeyPress} onChange={(e: any) => setSearch(e.target.value)} />
              </div>
              {options?.hiddenSweep || isMobile ? null : (
                <div className="w-5/12">
                  <Range maxValue={swapLimit} value={sweep} onChange={onRangeChange} />
                </div>
              )}
            </div>
            <div className="lg:pl-5 flex justify-end">
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
