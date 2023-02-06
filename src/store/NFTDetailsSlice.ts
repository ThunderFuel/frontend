import { createSlice } from "@reduxjs/toolkit";

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
    selectedNFT: {} as any,
    rightMenuType: RightMenuType.None,
    bidBalance: 500000000,
    isLiked: false,
  },

  reducers: {
    setRightMenu: (state, action) => {
      state.rightMenuType = action.payload;
    },
    setSelectedNFT: (state, action) => {
      state.selectedNFT = action.payload;
    },
    setIsLiked: (state, action) => {
      state.isLiked = action.payload;
    },
    toggleIsLiked: (state) => {
      state.isLiked = !state.isLiked;
    },
  },
});

export const { setRightMenu, setSelectedNFT, setIsLiked, toggleIsLiked } = NFTDetailsSlice.actions;

export default NFTDetailsSlice.reducer;
