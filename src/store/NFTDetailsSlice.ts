import { createSlice } from "@reduxjs/toolkit";
import { AssetMockNFT1 } from "assets";

export const NFTDetailsSlice = createSlice({
  name: "nftdetails",
  initialState: {
    showActivityMenu: false,
    selectedNFT: { name: "Genuine Undead #1289", price: 3.5, image: AssetMockNFT1, startingPrice: 0.55, floorPrice: 1.2, highestBid: 0.55, liked: false },
    isOwner: true,
  },

  reducers: {
    toggleMenu: (state, action) => {
      if (action.payload === "activity") {
        state.showActivityMenu = !state.showActivityMenu;
      }
    },
  },
});

export const { toggleMenu } = NFTDetailsSlice.actions;

export default NFTDetailsSlice.reducer;
