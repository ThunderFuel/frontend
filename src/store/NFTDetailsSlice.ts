import { createSlice } from "@reduxjs/toolkit";
import { AssetMockNFT1 } from "assets";

export const NFTDetailsSlice = createSlice({
  name: "nftdetails",
  initialState: {
    showActivityMenu: false,
    selectedNFT: { name: "Genuine Undead #1289", price: 3.5, image: AssetMockNFT1, startingPrice: 0.55, floorPrice: 0.12, highestBid: 0.55, liked: false, topTraitPrice: 0.2 },
    isOwner: false,
    hasBid: false,
  },

  reducers: {
    toggleMenu: (state, action) => {
      if (action.payload === "activity") {
        state.showActivityMenu = !state.showActivityMenu;
      }
    },
    toggleIsOwner: (state) => {
      state.isOwner = !state.isOwner;
    },
    toggleHasBid: (state) => {
      state.hasBid = !state.hasBid;
    },
  },
});

export const { toggleMenu, toggleIsOwner, toggleHasBid } = NFTDetailsSlice.actions;

export default NFTDetailsSlice.reducer;
