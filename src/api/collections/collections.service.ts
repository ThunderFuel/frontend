import { ThunderURL } from "../index";
import { ApiResponse } from "../HttpClient";
import { AssetCollectionItem0, AssetCollectionItem1, AssetCollectionItem2, AssetCollectionItem3, AssetCollectionItem4 } from "assets";
import { IconHand, IconMarketBasket, IconQuarry, IconTag, IconTelegram } from "icons";
import { CollectionFilterResponse, CollectionResponse, CollectionItemsRequest, CollectionItemResponse } from "./collections.type";

const images = [AssetCollectionItem0, AssetCollectionItem1, AssetCollectionItem2, AssetCollectionItem3, AssetCollectionItem4];

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
  async getCollectionHeader(collectionId: string): Promise<ApiResponse<CollectionResponse>> {
    return await ThunderURL.get(`v1/collection/getheader?id=${collectionId}`);
  },
  async getCollectionItems(data: CollectionItemsRequest): Promise<ApiResponse<CollectionItemResponse[]>> {
    return await ThunderURL.post("v1/token/tokens", data);
  },

  async getActivityFilters() {
    return [
      {
        icon: IconMarketBasket,
        name: "Sales",
      },
      {
        icon: IconHand,
        name: "Offers",
      },
      {
        icon: IconTag,
        name: "Listings",
      },
      {
        icon: IconQuarry,
        name: "Mints",
      },
      {
        icon: IconTelegram,
        name: "Transfers",
      },
    ];
  },
  async getActivity() {
    return [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2].map((item) => ({
      id: item,
      name: `Genuine Undead #${item}`,
      description: "Bid placed by 409x792 to you, 1 mins ago",
      image: images[item],
      price: 1.43,
      type: item % 4 !== 0,
    }));
  },
};
