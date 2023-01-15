export enum MarketplaceListType {
  None = 0,
  Trending = 1,
  Top = 2,
  Watchlist = 3,
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
  lastSolds: any;
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
