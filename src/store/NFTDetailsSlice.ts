import { createSlice } from "@reduxjs/toolkit";
import { AssetMockNFT1 } from "assets";

export const NFTDetailsSlice = createSlice({
  name: "nftdetails",
  initialState: {
    selectedNFT: {
      onAuction: true,
      name: "Genuine Undead #1289",
      price: 3.5,
      image: AssetMockNFT1,
      startingPrice: 0.55,
      floorPrice: 0.12,
      highestBid: 0.55,
      highestOffer: 0.66,
      liked: false,
      topTraitPrice: 0.2,
    },
    rightMenuType: "",
    isOwner: false,
    hasBid: false,
    bidBalance: 1.25,
    currentUserOffer: 1.33,
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
