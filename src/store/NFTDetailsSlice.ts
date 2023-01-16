import { createSlice } from "@reduxjs/toolkit";

export const NFTDetailsSlice = createSlice({
  name: "nftdetails",
  initialState: {
    showActivityMenu: false,
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
