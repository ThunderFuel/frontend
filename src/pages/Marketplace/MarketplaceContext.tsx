import React, { createContext, ReactNode, useContext, useState } from "react";
import marketplaceService from "api/marketplace/marketplace.service";
import { MarketplaceListType, MarketplaceTableItem } from "../../api/marketplace/marketplace.type";
import dayjs from "dayjs";
import collectionsService from "../../api/collections/collections.service";

const UnitType = "hours";

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
  addWatchList: any;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<MarketplaceTableItem[]>([]);
  const [dayTabValue, setDayTabValue] = useState<TextValue>(dayValues[0]);
  const [filterTabValue, setFilterTabValue] = useState<TextValue>(filterValues[0]);

  const getMarketplaceItems = async () => {
    if (isLoading) {
      return false;
    }

    setIsLoading(true);
    try {
      const response = await marketplaceService.getMarketplace({
        type: filterTabValue?.value,
        filterDate: Math.round(dayjs().subtract(dayTabValue?.value, UnitType).startOf(UnitType).valueOf() / 1000),
        userId: 16,
      });
      const items = response.data.map((responseItem) => {
        return {
          id: responseItem.id,
          collection: responseItem.name,
          volume: responseItem.volume,
          change: responseItem.change,
          floor: responseItem.floor,
          sales: responseItem.sales,
          lastSold: responseItem.solds.length,
          image: responseItem.image,
          images: responseItem.solds.map((sold: any) => sold.token.image),
          watched: responseItem.watched,
        } as MarketplaceTableItem;
      });

      setItems(items);
    } catch (e) {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addWatchList = async (data: any) => {
    try {
      await collectionsService.addWatchList(data);
    } catch (e) {
      console.log(e);
    }
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
    addWatchList,
    isLoading,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      <div>{children}</div>
    </MarketplaceContext.Provider>
  );
};

export default MarketplaceProvider;

export const useMarketplace = () => useContext(MarketplaceContext);
