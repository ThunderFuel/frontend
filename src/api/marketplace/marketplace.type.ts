import { CollectionResponse } from "../collections/collections.type";

export enum MarketplaceListType {
  None = 0,
  Trending = 1,
  Top = 2,
  Watchlist = 3,
}

interface MarketplaceItemSold {
  token: {
    name: string;
    image: string;
  };
}

export interface MarketplaceItemResponse extends Omit<CollectionResponse, "solds"> {
  solds: MarketplaceItemSold[];
  watched: boolean;
}

export interface MarketplaceTableItem {
  id: number;
  collection: string;
  volume: number;
  change: number;
  floor: number;
  sales: number;
  lastSold: number;
  images?: any[];
  image: string;
  watched: boolean;
}
