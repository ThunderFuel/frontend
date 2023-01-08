import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    show: false,
  },

  reducers: {
    toggleCheckoutModal: (state) => {
      state.show = !state.show;
    },
  },
});

export const { toggleCheckoutModal } = checkoutSlice.actions;

export default checkoutSlice.reducer;
