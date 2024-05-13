import React, { createContext, ReactNode, useContext, useState } from "react";
import marketplaceService from "api/marketplace/marketplace.service";
import { MarketplaceListType, MarketplaceTableItem } from "api/marketplace/marketplace.type";
import { WatchListRequest } from "api/collections/collections.type";
import dayjs from "dayjs";
import collectionsService from "api/collections/collections.service";
import { useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { toggleWalletModal } from "store/walletSlice";

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
  onChangeSortValue: (value: any) => void;
  sortingValue: any;
  sortingType: any;
  options: any;
  mobileListType: any;
  setMobileListType: any;
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
    value: 168,
  },
  {
    text: "30D",
    value: 720,
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

export enum MOBILE_LIST_TYPE {
  GRID,
  LIST,
}

export const MarketplaceContext = createContext<IMarketplaceContext>({} as any);

const MarketplaceProvider = ({ children, options = {} }: { children: ReactNode; options?: any }) => {
  const { user } = useAppSelector((state) => state.wallet);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<MarketplaceTableItem[]>([]);
  const [dayTabValue, setDayTabValue] = useState<TextValue>(dayValues[0]);
  const [filterTabValue, setFilterTabValue] = useState<TextValue>(filterValues[0]);
  const [sortingValue, setSortingValue] = useState(0);
  const [sortingType, setSortingType] = useState("ASC");
  const [mobileListType, setMobileListType] = useState(MOBILE_LIST_TYPE.GRID);

  const getMarketplaceItems = async () => {
    if (isLoading) {
      return false;
    }

    setIsLoading(true);
    try {
      const response = await marketplaceService.getMarketplace({
        type: filterTabValue?.value,
        filterDate: Math.round(dayjs().subtract(dayTabValue?.value, UnitType).startOf(UnitType).valueOf() / 1000),
        userId: user?.id,
        sortingValue,
        sortingType,
        page: 1,
        pageSize: 10,
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
          collectionItems: responseItem.solds.map((sold: any) => ({
            image: sold.token.image,
            tokenId: sold.tokenId,
          })),
          watched: responseItem.watched,
          slug: responseItem.slug,
        } as MarketplaceTableItem;
      });

      setItems(items);
    } catch (e) {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addWatchList = async (data: WatchListRequest) => {
    if (!user?.id) {
      dispatch(toggleWalletModal());

      return false;
    }
    try {
      await collectionsService.addWatchList(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeSortValue = (value: any) => {
    if (sortingValue === value) {
      setSortingType(sortingType === "ASC" ? "DESC" : "ASC");
    } else {
      setSortingValue(value);
      setSortingType("ASC");
    }
  };

  React.useEffect(() => {
    getMarketplaceItems();
  }, [filterTabValue, dayTabValue, user, sortingValue, sortingType]);

  const contextValue = {
    options,
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
    onChangeSortValue,
    sortingValue,
    sortingType,
    mobileListType,
    setMobileListType,
  };

  return (
    <MarketplaceContext.Provider value={contextValue}>
      <div>{children}</div>
    </MarketplaceContext.Provider>
  );
};

export default MarketplaceProvider;

export const useMarketplace = () => useContext(MarketplaceContext);
