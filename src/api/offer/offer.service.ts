import { ThunderURL } from "../index";
import { ApiResponse } from "../HttpClient";

export default {
  async getOffer(data: any): Promise<ApiResponse<any>> {
    return ThunderURL.post("v1/offer/getoffers", data);
  },
  async cancelAllOffer(params: any): Promise<ApiResponse<any>> {
    return ThunderURL.put("v1/offer/cancelalloffer", {}, { params });
  },
  async cancelOffer(params: any): Promise<ApiResponse<any>> {
    return ThunderURL.put("v1/offer/canceloffer", {}, { params });
  },
  async acceptOffer(params: any): Promise<ApiResponse<any>> {
    return ThunderURL.put("v1/offer/acceptoffer", {}, { params });
  },
};
