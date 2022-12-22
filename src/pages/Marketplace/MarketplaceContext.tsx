import React, { createContext, ReactNode, useContext, useState } from "react";
import marketplaceService from "api/marketplace";

interface IMarketplaceContext {
  items: any[];
  getMarketplaceItems?: any;
  dayValues: any[];
  dayTabValue: any;
  setDayTabValue: any;
  filterValues: string[];
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
const filterValues = ["Trending", "Top", "Watchlist"];

export const MarketplaceContext = createContext<IMarketplaceContext>({} as any);

const MarketplaceProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState([]);
  const [dayTabValue, setDayTabValue] = useState({
    text: "1H",
    value: 1,
  });
  const [filterTabValue, setFilterTabValue] = useState("Trending");

  const getMarketplaceItems = async () => {
    const response = await marketplaceService.getMarketplace();

    return setItems(response as any);
  };

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
