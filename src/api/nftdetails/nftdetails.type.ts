export interface MakeOfferRequest {
  makerUserId: number;
  tokenId: number;
  price: number;
  priceType: number;
}

export interface GetOffersRequest {
  tokenId?: number;
  userId?: number;
  pageSize?: number;
  page?: number;
}

export interface TokenListRequest {
  id: number;
  userId: number;
  price: number;
  expireTime: string;
}

export interface TokenPlaceBidRequest {
  id: number;
  userId: number;
  price: number;
  expireTime: string;
}

export interface TokenLikeParams {
  tokenId: number;
  userId: number;
  like: boolean;
}
