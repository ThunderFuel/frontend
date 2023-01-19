import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    show: false,
    isInsufficientBalance: false,
    checkoutType: "",
  },

  reducers: {
    toggleCheckoutModal: (state) => {
      state.show = !state.show;
    },
    setIsInsufficientBalance: (state, action) => {
      state.isInsufficientBalance = action.payload;
    },
    setCheckoutType: (state, action) => {
      state.checkoutType = action.payload;
    },
  },
});

export const { toggleCheckoutModal, setIsInsufficientBalance, setCheckoutType } = checkoutSlice.actions;

export default checkoutSlice.reducer;
