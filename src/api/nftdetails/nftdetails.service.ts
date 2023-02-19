import { ThunderURL } from "api";
import { ApiResponse } from "api/HttpClient";
import { GetOffersRequest, MakeOfferRequest, TokenLikeParams, TokenListRequest, TokenPlaceBidRequest } from "./nftdetails.type";

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
  async acceptOffer(id: number): Promise<ApiResponse<any>> {
    return await ThunderURL.put("v1/offer/acceptoffer", {}, { params: { id } });
  },
  async cancelOffer(id: number): Promise<ApiResponse<any>> {
    return await ThunderURL.put("v1/offer/canceloffer", {}, { params: { id } });
  },
  async tokenList(data: TokenListRequest[]): Promise<ApiResponse<any>> {
    return await ThunderURL.post("v1/token/listing", data);
  },
  async tokenUpdateListing(data: any): Promise<ApiResponse<any>> {
    return await ThunderURL.put("v1/token/updatelisting", data, {});
  },
  async tokenCancelList(tokenId: number): Promise<ApiResponse<any>> {
    return await ThunderURL.put("v1/token/cancellisting", {}, { params: { tokenId } });
  },
  async tokenLike(params: TokenLikeParams): Promise<ApiResponse<any>> {
    return await ThunderURL.post(`v1/token/like`, {}, { params });
  },
  async tokenTransfer(tokenId: number, userId: number): Promise<ApiResponse<any>> {
    return await ThunderURL.post("v1/token/transfer", {}, { params: { tokenId, userId } });
  },
  async tokenOnAuction(onAuction: boolean, tokenId: number, expireTime?: number, startingPrice?: number): Promise<ApiResponse<any>> {
    return await ThunderURL.post("v1/token/onauction", {}, { params: { onAuction, tokenId, expireTime, startingPrice } });
  },
  async tokenBuyNow(tokenIds: number[], userId: number): Promise<ApiResponse<any>> {
    return await ThunderURL.post("v1/token/buynow", { tokenIds, userId });
  },
  async tokenPlaceBid(data: TokenPlaceBidRequest): Promise<ApiResponse<any>> {
    return await ThunderURL.post("v1/token/placeabid", data);
  },
  async tokenGetBids(data: any): Promise<ApiResponse<any>> {
    return await ThunderURL.post("v1/token/getbids", data);
  },
  async tokenUpdateOffer(data: any): Promise<ApiResponse<any>> {
    return await ThunderURL.put("v1/offer/updateoffer", data, {});
  },
};
