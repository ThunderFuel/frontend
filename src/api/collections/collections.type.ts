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
