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
  Listings,
}

export const NFTDetailsSlice = createSlice({
  name: "nftdetails",
  initialState: {
    selectedNFT: {} as any,
    rightMenuType: RightMenuType.None,
    isLiked: false,
    presetPrice: "",
    yourCurrentOffer: "",
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
    setYourCurrentOffer: (state, action) => {
      state.yourCurrentOffer = action.payload;
    },
  },
});

export const { setRightMenu, setSelectedNFT, setIsLiked, setYourCurrentOffer, toggleIsLiked, setPresetPrice } = NFTDetailsSlice.actions;

export default NFTDetailsSlice.reducer;
