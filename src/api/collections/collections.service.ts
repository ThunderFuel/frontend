import { ThunderURL } from "../index";
import { ApiResponse } from "../HttpClient";
import { AssetCollectionItem0, AssetCollectionItem1, AssetCollectionItem2, AssetCollectionItem3, AssetCollectionItem4 } from "assets";
import {
  ActivityItemResponse,
  CollectionFilterResponse,
  CollectionItemResponse,
  CollectionItemsRequest,
  CollectionResponse,
  MintRequest,
  UpdateBulkListingRequestItem,
  WatchListRequest,
} from "./collections.type";
import { IconBid, IconHand, IconMarketBasket, IconQuarry, IconTag, IconTelegram } from "icons";

const images = [AssetCollectionItem0, AssetCollectionItem1, AssetCollectionItem2, AssetCollectionItem3, AssetCollectionItem4];

export enum ActivityFilters {
  Offers = 0,
  Mints = 1,
  Sales = 2,
  Transfers = 3,
  Listings = 4,
  Bids = 5,
}

export default {
  async getCollections() {
    return [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4].map((item) => ({
      id: item,
      collection: `Genuine Undead #${item}`,
      name: `Genuine Undead #${item}`,
      image: images[item],
      price: 1.43,
      floor: 1.43,
      lastSale: 0.88,
      owner: "Apedad23",
      timeListed: "2 hours ago",
      isActive: item % 4 !== 0,
    }));
  },
  async getFilters(params: any): Promise<ApiResponse<CollectionFilterResponse>> {
    return await ThunderURL.get("v1/collection/getfilters", {
      params,
    });
  },
  async getCollectionHeader(params: any): Promise<ApiResponse<CollectionResponse>> {
    return await ThunderURL.get("v1/collection/getheader", { params });
  },
  async getCollectionItems(data: CollectionItemsRequest): Promise<ApiResponse<CollectionItemResponse[]>> {
    return await ThunderURL.post("v1/token/tokens", data);
  },

  async getCollection(params: any): Promise<ApiResponse<CollectionItemResponse>> {
    return ThunderURL.get("/v1/token", { params });
  },
  async getActivity(data: any): Promise<ApiResponse<ActivityItemResponse[]>> {
    return ThunderURL.post("v1/activity/activities", data);
  },
  getActivityFilters() {
    return {
      [ActivityFilters.Offers]: { icon: IconHand, name: "Offers" },
      [ActivityFilters.Mints]: { icon: IconQuarry, name: "Mints" },
      [ActivityFilters.Sales]: { icon: IconMarketBasket, name: "Sales" },
      [ActivityFilters.Transfers]: { icon: IconTelegram, name: "Transfers" },
      [ActivityFilters.Listings]: { icon: IconTag, name: "Listings" },
      [ActivityFilters.Bids]: { icon: IconBid, name: "Bids" },
    };
  },
  addWatchList(data: WatchListRequest) {
    return ThunderURL.post("/v1/collection/watch", data);
  },

  async bulkListing(data: UpdateBulkListingRequestItem[]) {
    return ThunderURL.post("v1/token/listing", data);
  },
  async updateBulkListing(data: UpdateBulkListingRequestItem[]) {
    return ThunderURL.put("v1/token/updatelisting", data, {});
  },

  async getCollectionFloor(ids: any): Promise<ApiResponse<any>> {
    return ThunderURL.post(`v1/floor/collectionfloor`, ids);
  },

  async mint(data: MintRequest): Promise<ApiResponse<any>> {
    return ThunderURL.post(`v1/collection/mint`, data);
  },
};
