import { ThunderURL } from "../index";
import { ApiResponse } from "../HttpClient";

export default {
  async getCollectionFloor(collectionIds: any): Promise<ApiResponse<any>> {
    return ThunderURL.post("v1/floor/collectionfloor", collectionIds);
  },
  async getTopTraitByTokenIds(tokenIds: any): Promise<ApiResponse<any>> {
    return ThunderURL.post("v1/floor/toptraitbytokenids", tokenIds);
  },
};
