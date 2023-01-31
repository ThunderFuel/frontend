import { ThunderURL } from "api";
import { ApiResponse } from "api/HttpClient";
import { GetOffersRequest, MakeOfferRequest } from "./nftdetails.type";

export default {
  async getOffer(id: string): Promise<ApiResponse<any>> {
    return await ThunderURL.post(`v1/offer/`, { params: { id } });
  },
  async getOffers(data: GetOffersRequest): Promise<ApiResponse<any>> {
    return await ThunderURL.post(`v1/offer/getoffers`, data);
  },
  async getBestOffer(id: string): Promise<ApiResponse<any>> {
    return await ThunderURL.get("v1/offer/bestoffer", { params: { id } });
  },
  async makeOffer(data: MakeOfferRequest): Promise<ApiResponse<any>> {
    return await ThunderURL.post("v1/offer/makeoffer", data);
  },
  async acceptOffer(id: string): Promise<ApiResponse<any>> {
    return await ThunderURL.put("v1/offer/acceptoffer", {}, { params: { id } });
  },
  async cancelOffer(id: string): Promise<ApiResponse<any>> {
    return await ThunderURL.put("v1/offer/canceloffer", {}, { params: { id } });
  },
};
