import React from "react";
import Tab from "components/Tab";
import { useMarketplace } from "../MarketplaceContext";
import { IconGridSmall, IconList } from "../../../icons";

const Filter = () => {
  const { dayValues, dayTabValue, setDayTabValue, filterTabValue, filterValues, setFilterTabValue, mobileListType, setMobileListType } = useMarketplace();

  return (
    <div className="border-t lg:border-b border-gray">
      <div className="lg:container-fluid">
        <div className="flex flex-col lg:flex-row gap-7 items-center">
          <Tab initTab={filterTabValue} className="secondary -my-[1px]" onChange={(value) => setFilterTabValue(value)}>
            {filterValues.map((item) => (
              <Tab.Item key={item.value} id={item}>
                {item.text}
              </Tab.Item>
            ))}
          </Tab>
          <div className="flex items-center gap-5 w-full px-5 lg:w-auto">
            <div className="flex-1">
              <Tab initTab={dayTabValue} onChange={(value) => setDayTabValue(value)}>
                {dayValues.map((item) => (
                  <Tab.Item key={item.value} id={item}>
                    {item.text}
                  </Tab.Item>
                ))}
              </Tab>
            </div>
            <div>
              <Tab className="mobile-tab" initTab={mobileListType} onChange={(value) => setMobileListType(value)}>
                <Tab.Item id={"GRID"}>
                  <IconGridSmall />
                </Tab.Item>
                <Tab.Item id={"LIST"}>
                  <IconList />
                </Tab.Item>
              </Tab>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
