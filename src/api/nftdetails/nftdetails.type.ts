export interface MakeOfferRequest {
  makerUserId: number;
  tokenId: number;
  price: number;
  priceType: number;
  expireTime: number;
}

export interface GetOffersRequest {
  tokenId?: number;
  userId?: number;
  pageSize?: number;
  page?: number;
}

export interface TokenListRequest {
  tokenId: number;
  price: number;
  expireTime: number;
}

export interface TokenPlaceBidRequest {
  tokenId: number;
  userId: number;
  price: number;
}

export interface TokenLikeParams {
  tokenId: number;
  userId: number;
  like: boolean;
}
