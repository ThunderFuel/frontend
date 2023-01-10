import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    show: false,
    isInsufficientBalance: false,
  },

  reducers: {
    toggleCheckoutModal: (state) => {
      state.show = !state.show;
    },
    setIsInsufficientBalance: (state, action) => {
      state.isInsufficientBalance = action.payload;
    },
  },
});

export const { toggleCheckoutModal, setIsInsufficientBalance } = checkoutSlice.actions;

export default checkoutSlice.reducer;
