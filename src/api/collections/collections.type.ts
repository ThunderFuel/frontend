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
  tokenOrder: any;
  isSelected: boolean;
  attributes: any[];
  collectionId: number;
  image: string;
  name: string;
  price: number;
  rarity: number;
  salable: boolean;
  lastSalePrice: number;
}
export interface CollectionResponse {
  id: number;
  name: string;
  description: string;
  contractAddress: string;
  listedRate: number;
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
  logo: string;
  socialMedias: {
    type: SocialTypes;
    url: string;
  }[];
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
