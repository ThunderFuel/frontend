import React from "react";
import TabDisplayType from "./TabDisplayType";
import InputSearch from "components/InputSearch";
import InputRange from "components/InputRange";
import Input from "components/Input";
import { IconClear } from "icons";

const Range = () => {
  const [rangeValue, setRangeValue] = React.useState(0);

  return (
    <div className="flex gap-5 px-5 py-2.5 border-r border-r-gray">
      <div className="flex flex-col flex-1 gap-2">
        <div className="text-headline-01 uppercase text-gray-light">Sweeper</div>
        <InputRange value={rangeValue} minValue={0} maxValue={100} onChange={(e) => setRangeValue(e as number)} />
      </div>
      <div>
        <Input value={rangeValue} icon={<IconClear className="w-6 h-6 mr-2 cursor-pointer" />} className="w-10 border-l border-l-gray pl-4" placeholder={"0"} />
      </div>
    </div>
  );
};
const Index = () => {
  return (
    <div className="sticky top-[117px] border-y border-gray z-20 bg-bg">
      <div className="container-fluid">
        <div className="flex items-center justify-between text-white gap-5">
          <div className="grid grid-cols-3 flex-1 items-center">
            <div className="py-2.5 pr-5 flex-1 border-r border-r-gray">
              <InputSearch placeholder="Search ID or name" />
            </div>
            <Range />
            <div className="pl-5">asd</div>
          </div>
          <div>
            <TabDisplayType />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
