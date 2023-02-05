import { createSlice } from "@reduxjs/toolkit";

export enum CheckoutType {
  None,
  MakeOffer,
  PlaceBid,
  CancelOffer,
  UpdateOffer,
  AcceptOffer,
  ConfirmListing,
  Transfer,
  CancelAuction,
  CancelBid,
  Standard,
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
    checkoutExpireTime: 0,
    amountAddedBidBalance: 0,
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
      }
      state.show = !state.show;
    },
    setIsInsufficientBalance: (state, action) => {
      state.isInsufficientBalance = action.payload;
    },
    setCheckout: (state, action) => {
      state.checkoutType = action.payload.type;
      state.checkoutPrice = action.payload.price;
      state.checkoutIsAuction = action.payload?.isAuction;
      state.checkoutExpireTime = action.payload?.expireTime;
      state.checkoutAuctionStartingPrice = action.payload?.auctionStartingPrice;
    },
    //TODO checkoutlarda bidbalanceupdated yerine bunu kullan
    setAmountAddedBidBalance: (state, action) => {
      state.amountAddedBidBalance = action.payload;
    },
  },
});

export const { toggleCheckoutModal, setIsInsufficientBalance, setCheckout, setAmountAddedBidBalance } = checkoutSlice.actions;

export default checkoutSlice.reducer;
