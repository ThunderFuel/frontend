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
    presetPrice: "",
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
    setPresetPrice: (state, action) => {
      state.presetPrice = action.payload;
    },
  },
});

export const { setRightMenu, setSelectedNFT, setIsLiked, toggleIsLiked, setPresetPrice } = NFTDetailsSlice.actions;

export default NFTDetailsSlice.reducer;
