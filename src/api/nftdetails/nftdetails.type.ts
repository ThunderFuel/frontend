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
