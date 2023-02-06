import { ThunderURL } from "../index";
import { ApiResponse } from "../HttpClient";

export default {
  async getOffer(data: any): Promise<ApiResponse<any>> {
    return ThunderURL.post("v1/offer/getoffers", data);
  },
};
