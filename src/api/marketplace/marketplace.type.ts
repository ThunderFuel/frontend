export enum MarketplaceListType {
  None = 0,
  Trending = 1,
  Top = 2,
  Watchlist = 3,
}

interface MarketplaceItemSold {
  token: {
    name: "GENUINE UNDEAD #1";
    image: "ipfs://QmVUgP9fnFh9R6HF3eMP3ro2fxvv76fQsrBud7yyPDAMdQ/1.png";
  };
}

export interface MarketplaceItemResponse {
  name: string;
  description: string;
  contractAddress: string;
  listedRate: number;
  metadataUrlId: number;
  ownerCount: number;
  volume: number;
  change: number;
  floor: number;
  floorType: number;
  sales: number;
  metadataUrl: any;
  solds: MarketplaceItemSold[];
  items: any;
  socialMedias: [];
}

export interface MarketplacePaginationResponse {
  itemsCount: number;
  pageCount: number;
  pageSize: number;
  pageNumber: number;
  data: MarketplaceItemResponse[];
  hasError: boolean;
  message: any;
}

export interface MarketplaceTableItem {
  collection: string;
  volume: number;
  change: number;
  floor: number;
  sales: number;
  lastSold: number;
  images: any[];
  favorite: boolean;
}
