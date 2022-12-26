import React from "react";
import TabDisplayType from "./TabDisplayType";
import InputSearch from "components/InputSearch";
import InputRange from "components/InputRange";

const Index = () => {
  const [rangeValue, setRangeValue] = React.useState(0);

  return (
    <div className="border-t border-gray">
      <div className="container-fluid">
        <div className="py-2.5 flex items-center justify-between text-white gap-5">
          <div className="flex flex-1 items-center divide-x divide-gray-light">
            <div className="pr-5">
              <InputSearch placeholder="Search ID or name" />
            </div>
            <div className="px-5 flex flex-col flex-1 gap-2">
              <div className="text-headline-01 uppercase text-gray-light">Sweeper</div>
              <InputRange value={rangeValue} minValue={0} maxValue={100} onChange={(e) => setRangeValue(e as number)} />
            </div>
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
