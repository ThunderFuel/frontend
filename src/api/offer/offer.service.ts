import { ThunderURL } from "../index";
import { ApiResponse } from "../HttpClient";
import { OfferandListingIndexesRequest } from "./offer.type";

export default {
  async getOffer(data: any): Promise<ApiResponse<any>> {
    return ThunderURL.post("v1/offer/getoffers", data);
  },
  async cancelAllOffer(params: any): Promise<ApiResponse<any>> {
    return ThunderURL.put("v1/offer/cancelalloffer", {}, { params });
  },
  async acceptOffer(params: any): Promise<ApiResponse<any>> {
    return ThunderURL.put("v1/offer/acceptoffer", {}, { params });
  },
  async getOffersIndex(data: any[]): Promise<ApiResponse<any>> {
    return ThunderURL.post("v1/offer/getoffersindex", data, {});
  },
  async cancelAllOfferAndListings(params: any): Promise<ApiResponse<any>> {
    return ThunderURL.put("v1/offer/cancelallofferandlisting", {}, { params });
  },
  async getAllOfferandListingIndexes(params: OfferandListingIndexesRequest): Promise<ApiResponse<any>> {
    return ThunderURL.get("v1/offer/getallofferandlistingindexes", { params });
  },
};
