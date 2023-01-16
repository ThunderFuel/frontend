import { ThunderURL } from "../index";
import { MarketplaceItemResponse } from "./marketplace.type";
import { ApiResponse } from "../HttpClient";

export default {
  async getMarketplace(params: any = {}): Promise<ApiResponse<MarketplaceItemResponse[]>> {
    return ThunderURL.get<MarketplaceItemResponse[]>("v1/collection", { params });
  },
};
