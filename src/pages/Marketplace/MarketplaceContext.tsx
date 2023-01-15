import React, { createContext, ReactNode, useContext, useState } from "react";
import marketplaceService from "api/marketplace/marketplace.service";
import { MarketplaceListType } from "../../api/marketplace/marketplace.type";

interface TextValue {
  text: string;
  value: any;
}

interface IMarketplaceContext {
  items: any[];
  getMarketplaceItems?: any;
  dayValues: TextValue[];
  dayTabValue: any;
  setDayTabValue: any;
  filterValues: TextValue[];
  filterTabValue: any;
  setFilterTabValue: any;
}

const dayValues = [
  {
    text: "1H",
    value: 1,
  },
  {
    text: "6H",
    value: 6,
  },
  {
    text: "24H",
    value: 24,
  },
  {
    text: "7D",
    value: 24 * 7,
  },
  {
    text: "30D",
    value: 24 * 7 * 30,
  },
];
const filterValues = [
  {
    text: "Trending",
    value: MarketplaceListType.Trending,
  },
  {
    text: "Top",
    value: MarketplaceListType.Top,
  },
  {
    text: "Watchlist",
    value: MarketplaceListType.Watchlist,
  },
];

export const MarketplaceContext = createContext<IMarketplaceContext>({} as any);

const MarketplaceProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState([]);
  const [dayTabValue, setDayTabValue] = useState<TextValue>({
    text: "1H",
    value: 1,
  });
  const [filterTabValue, setFilterTabValue] = useState<TextValue>();

  const getMarketplaceItems = async () => {
    const response = await marketplaceService.getMarketplace1({
      type: filterTabValue?.value,
      dayValue: dayTabValue?.value,
    });

    return setItems(response as any);
  };

  React.useEffect(() => {
    getMarketplaceItems();
  }, [filterTabValue, dayTabValue]);

  const value = {
    items,
    getMarketplaceItems,
    dayValues,
    dayTabValue,
    setDayTabValue,
    filterValues,
    filterTabValue,
    setFilterTabValue,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      <div>{children}</div>
    </MarketplaceContext.Provider>
  );
};

export default MarketplaceProvider;

export const useMarketplace = () => useContext(MarketplaceContext);
