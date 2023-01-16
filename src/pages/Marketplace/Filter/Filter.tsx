import React from "react";
import Tab from "components/Tab";
import { useMarketplace } from "../MarketplaceContext";

const Filter = () => {
  const { dayValues, dayTabValue, setDayTabValue, filterTabValue, filterValues, setFilterTabValue } = useMarketplace();

  return (
    <div className="border-t border-b border-gray">
      <div className="container-fluid">
        <div className="flex flex-col lg:flex-row gap-7 items-center">
          <Tab initTab={filterTabValue} className="secondary -my-[1px]" onChange={(value) => setFilterTabValue(value)}>
            {filterValues.map((item) => (
              <Tab.Item key={item} id={item}>
                {item}
              </Tab.Item>
            ))}
          </Tab>
          <div className="w-full lg:w-auto">
            <Tab initTab={dayTabValue} onChange={(value) => setDayTabValue(value)}>
              {dayValues.map((item) => (
                <Tab.Item key={item.value} id={item}>
                  {item.text}
                </Tab.Item>
              ))}
            </Tab>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
