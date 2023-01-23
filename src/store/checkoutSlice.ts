import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    show: false,
    isInsufficientBalance: false,
    checkoutType: "",
    checkoutPrice: "",
  },

  reducers: {
    toggleCheckoutModal: (state) => {
      state.show = !state.show;
    },
    setIsInsufficientBalance: (state, action) => {
      state.isInsufficientBalance = action.payload;
    },
    setCheckout: (state, action) => {
      state.checkoutType = action.payload.type;
      state.checkoutPrice = action.payload.price;
    },
  },
});

export const { toggleCheckoutModal, setIsInsufficientBalance, setCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
