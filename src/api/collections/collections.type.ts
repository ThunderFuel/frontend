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
