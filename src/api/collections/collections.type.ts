import { IUserResponse } from "../user/user.type";

export enum SocialTypes {
  Website = 0,
  Discord = 1,
  Instagram = 2,
  Youtube = 3,
  Twitter = 4,
  Medium = 5,
  Telegram = 6,
}

interface CollectionFilterItem {
  name: string;
  count: number;
  isAttribute: boolean;
  type: number;
  filterData: any[];
}

export interface CollectionFilterResponse {
  filters: CollectionFilterItem[];
}

export interface CollectionItemResponse {
  collectionName?: any;
  id: any;
  tokenOrder: any;
  isSelected: boolean;
  tokenAttributes: any[];
  collectionId: number;
  image: string;
  name: string;
  price: number;
  rarity: number;
  salable: boolean;
  lastSalePrice?: number;
  user?: IUserResponse;
  onAuction?: boolean;
  startingPrice?: number;
  highestBidPrice?: number;
  onAuctionExpireTime?: string;

  uid?: string;
  userId?: any;
}

export interface CollectionResponse {
  id: number;
  name: string;
  description: string;
  contractAddress: string;
  listedRate: number;
  listedCount: number;
  metadataId: number;
  ownerCount: number;
  volume: number;
  change: number;
  floor: number;
  floorType: number;
  sales: number;
  solds: null;
  status: number;
  banner: string;
  logo?: string;
  image?: string;
  socialMedias: {
    type: SocialTypes;
    url: string;
  }[];
  watched: boolean;
}

export interface CollectionItemsRequest {
  id: number | string | undefined;
  items?: {
    name: string;
    type: number;
    selecteds: string[];
    value: string;
  }[];
  pageSize: number;
  page: number;
  sortingType: number;
}

export interface ActivityItemResponse {
  tokenId: number;
  fromUserId: number;
  toUserId: number;
  description: string;
  activityType: number;
  price: number;
  priceType: number;
  token: CollectionItemResponse;
  fromUser: IUserResponse;
  toUser: IUserResponse;
  data?: any[];
}

export interface WatchListRequest {
  collectionId: number;
  userId: number;
  watch: boolean;
}

export interface UpdateBulkListingRequestItem {
  tokenId: number;
  price: any;
  expireTime: number;
}
