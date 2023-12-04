export enum OfferStatus {
  Cancelled = 0,
  ActiveOffer = 1,
  AcceptedOffer = 2,
  ExpiredOffer = 3,
}

export interface OfferandListingIndexesRequest {
  userId: number;
  getListings: boolean;
  getOffers: boolean;
}
