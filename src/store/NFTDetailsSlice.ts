import { createSlice } from "@reduxjs/toolkit";
import { AssetMockNFT1 } from "assets";

export enum RightMenuType {
  None,
  Activities,
  Bids,
  ListNFT,
  MakeOffer,
  Offers,
  PlaceBid,
  UpdateOffer,
  UpdateListing,
}

export const NFTDetailsSlice = createSlice({
  name: "nftdetails",
  initialState: {
    selectedNFT: {
      onAuction: true,
      name: "Genuine Undead #1289",
      price: 3500000000,
      image: AssetMockNFT1,
      startingPrice: 550000000,
      floorPrice: 120000000,
      highestBid: 550000000,
      highestOffer: 660000000,
      liked: false,
      topTraitPrice: 200000000,
    },
    rightMenuType: RightMenuType.None,
    isOwner: false,
    hasBid: false,
    bidBalance: 1250000000,
    currentUserOffer: 1330000000,
  },

  reducers: {
    setRightMenu: (state, action) => {
      state.rightMenuType = action.payload;
    },
    toggleIsOwner: (state) => {
      state.isOwner = !state.isOwner;
    },
    toggleHasBid: (state) => {
      state.hasBid = !state.hasBid;
    },
  },
});

export const { setRightMenu, toggleIsOwner, toggleHasBid } = NFTDetailsSlice.actions;

export default NFTDetailsSlice.reducer;
