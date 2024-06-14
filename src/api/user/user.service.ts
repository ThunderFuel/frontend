import { ThunderURL } from "../index";
import { ICreateUser, IFollowParams, IUserResponse } from "./user.type";
import { ApiResponse } from "../HttpClient";

export default {
  getUser(params: any): Promise<ApiResponse<IUserResponse>> {
    const urlParams = new URLSearchParams();
    Object.keys(params).forEach((key: any) => {
      if (Array.isArray(params[key])) {
        params[key].forEach((val: any) => {
          urlParams.append(key, val);
        });
      } else {
        urlParams.append(key, params[key]);
      }
    });

    return ThunderURL.get("v1/user", { params: urlParams });
  },
  getFilters(data: any): Promise<ApiResponse<{ filters: [] }>> {
    return ThunderURL.post("v1/user/getfilters", data);
  },
  userUpdate(body: ICreateUser) {
    return ThunderURL.post("v1/user", body);
  },
  userCreate({ walletAddress }: any) {
    const data = {
      params: {
        address: typeof walletAddress === "object" ? walletAddress.toB256() : walletAddress,
        fuelAddress: walletAddress,
      },
    };

    return ThunderURL.post("v1/user/create", {}, data);
  },
  getFollowers(params: any = {}) {
    return ThunderURL.get("v1/user/followers", { params });
  },
  followUser(params: IFollowParams) {
    return ThunderURL.post("v1/user/follow", {}, { params });
  },
  isLiked(data: any): Promise<ApiResponse<any>> {
    return ThunderURL.get("v1/user/isLiked", { params: data });
  },
  getBidBalance(userId: number): Promise<ApiResponse<any>> {
    return ThunderURL.get("v1/user/getbidbalance", { params: { userId } });
  },
  updateBidBalance(userId: number, amount: number): Promise<ApiResponse<any>> {
    return ThunderURL.post("v1/user/updatebidbalance", {}, { params: { userId, amount } });
  },
  getUserCollections(data: any) {
    return ThunderURL.post("v1/user/tokens", data);
  },
  getUserOfferByNonce(params: { walletAddress: string; nonce: number; tokenOrder: number; contractAddress: string }): Promise<ApiResponse<any>> {
    return ThunderURL.get("v1/user/userofferbynonce", { params });
  },
};
