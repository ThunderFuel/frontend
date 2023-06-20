import { createSlice } from "@reduxjs/toolkit";

export enum CheckoutType {
  None,
  MakeOffer,
  PlaceBid,
  CancelOffer,
  UpdateOffer,
  AcceptOffer,
  ConfirmListing,
  CancelListing,
  Transfer,
  CancelAuction,
  CancelBid,
  Standard,
  UpdateListing,
  BulkListing,
  AcceptBid,
  CancelAllListings,
  CancelAllOffers,
  CancelAllOffersListings,
  MintCheckout,
}

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    show: false,
    isInsufficientBalance: false,
    checkoutType: CheckoutType.None,
    checkoutPrice: 0,
    checkoutIsAuction: false,
    checkoutAuctionStartingPrice: 0,
    checkoutExpireTime: 0 as number,
    checkoutMintAmount: 0,
    checkoutMintImage: "",
    checkoutDropId: 0,
    amountAddedBidBalance: 0,
    currentItem: {} as any,
    bulkListItems: [],
    bulkUpdateItems: [],
    cancelOfferItems: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCheckoutComplete: () => {},
  },

  reducers: {
    toggleCheckoutModal: (state) => {
      if (state.show === true) {
        //reset to default on close
        state.checkoutType = CheckoutType.None;
        state.checkoutPrice = 0;
        state.checkoutIsAuction = false;
        state.checkoutAuctionStartingPrice = 0;
        state.checkoutExpireTime = 0;
        state.currentItem = { id: 0, price: 0 };
      }
      state.show = !state.show;
    },
    setIsInsufficientBalance: (state, action) => {
      state.isInsufficientBalance = action.payload;
    },
    setCheckout: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const noOp = () => {};

      state.checkoutType = action.payload?.type;
      state.checkoutPrice = action.payload?.price;
      state.checkoutIsAuction = action.payload?.isAuction;
      state.checkoutExpireTime = action.payload?.expireTime;
      state.checkoutAuctionStartingPrice = action.payload?.auctionStartingPrice;
      state.currentItem = action.payload?.item;
      state.bulkListItems = action.payload?.bulkListItems;
      state.bulkUpdateItems = action.payload?.bulkUpdateItems;
      state.cancelOfferItems = action.payload?.cancelOfferItems;
      state.checkoutMintAmount = action.payload?.mintAmount;
      state.checkoutMintImage = action.payload?.mintImage;
      state.checkoutDropId = action.payload?.checkoutDropId;
      state.onCheckoutComplete = action.payload?.onCheckoutComplete ?? noOp;
    },
    removeBulkItems: (state) => {
      state.bulkListItems = [];
      state.bulkUpdateItems = [];
    },
    removeCancelOfferItems: (state) => {
      state.cancelOfferItems = [];
    },
    setAmountAddedBidBalance: (state, action) => {
      state.amountAddedBidBalance = action.payload;
    },
  },
});

export const { toggleCheckoutModal, setIsInsufficientBalance, setCheckout, setAmountAddedBidBalance, removeBulkItems, removeCancelOfferItems } = checkoutSlice.actions;

export default checkoutSlice.reducer;
