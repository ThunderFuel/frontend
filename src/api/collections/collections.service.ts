import { ThunderURL } from "../index";
import { ApiResponse } from "../HttpClient";
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
import { IconHand, IconListingCancel, IconMarketBasket, IconOfferCancel, IconQuarry, IconTag, IconTelegram } from "icons";

export enum ActivityFilters {
  Offers = 0,
  Mints = 1,
  Sales = 2,
  Transfers = 3,
  Listings = 4,
  OfferCancel = 5,
  ListingCancel = 6,
}

export enum ChecklistStatus {
  Eligible,
  NotEligible,
}

export default {
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
      [ActivityFilters.OfferCancel]: { icon: IconOfferCancel, name: "Offer Cancel" },
      [ActivityFilters.ListingCancel]: { icon: IconListingCancel, name: "Listing Cancel" },
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

  async cancelAllListings(params: any = {}) {
    return ThunderURL.post("v1/token/cancelalllisting", {}, { params });
  },
  async mint(data: MintRequest): Promise<ApiResponse<any>> {
    return ThunderURL.post(`v1/collection/mint`, data);
  },
  async checkMintable(params: any): Promise<ApiResponse<{ status: number; remaining: number }>> {
    return await ThunderURL.get("v1/collection/checkmintable", {
      params,
    });
  },
};
