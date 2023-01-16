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
}
