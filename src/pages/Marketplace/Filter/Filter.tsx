import React from "react";
import Tab from "components/Tab";
import { MOBILE_LIST_TYPE, useMarketplace } from "../MarketplaceContext";
import { IconGridSmall, IconList } from "../../../icons";
import Select from "../../../components/Select";

const Filter = () => {
  const { dayValues, dayTabValue, setDayTabValue, filterTabValue, filterValues, setFilterTabValue, mobileListType, setMobileListType } = useMarketplace();

  return (
    <div className="border-t lg:border-b border-gray">
      <div className="lg:container-fluid">
        <div className="flex flex-col lg:flex-row gap-5 items-center">
          <Tab initTab={filterTabValue} className="secondary -my-[1px]" onChange={(value) => setFilterTabValue(value)}>
            {filterValues.map((item) => (
              <Tab.Item key={item.value} id={item}>
                {item.text}
              </Tab.Item>
            ))}
          </Tab>
          <div className="flex items-center justify-between gap-5 w-full px-5 lg:w-auto">
            <div>
              <div className="flex-1 hidden lg:flex">
                <Tab initTab={dayTabValue} onChange={(value) => setDayTabValue(value)}>
                  {dayValues.map((item) => (
                    <Tab.Item key={item.value} id={item}>
                      {item.text}
                    </Tab.Item>
                  ))}
                </Tab>
              </div>
              <div className="flex-1 flex lg:hidden">
                <Select
                  options={dayValues}
                  value={dayTabValue}
                  onChange={(value) => {
                    setDayTabValue(value);
                  }}
                />
              </div>
            </div>
            <div>
              <Tab className="mobile-tab" initTab={mobileListType} onChange={(value) => setMobileListType(value)}>
                <Tab.Item id={MOBILE_LIST_TYPE.GRID}>
                  <IconGridSmall />
                </Tab.Item>
                <Tab.Item id={MOBILE_LIST_TYPE.LIST}>
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
