import { CollectionItemResponse } from "../collections/collections.type";

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

export interface MarketplaceItemResponse extends Omit<CollectionItemResponse, "solds"> {
  solds: MarketplaceItemSold[];
}

export interface MarketplaceTableItem {
  id: number;
  collection: string;
  volume: number;
  change: number;
  floor: number;
  sales: number;
  lastSold: number;
  images: any[];
  favorite: boolean;
}
