import { createSlice } from "@reduxjs/toolkit";
import { data, ICartData } from "../components/MyCart/data";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as ICartData[],
    totalAmount: 0,
    itemCount: 0,
  },

  reducers: {
    getCartTotal: (state) => {
      const { totalAmount, itemCount } = state.items.reduce(
        (cartTotal: any, cartItem: any) => {
          const { price } = cartItem;

          cartTotal.totalAmount += price;
          cartTotal.itemCount += 1;

          return cartTotal;
        },
        {
          totalAmount: 0,
          itemCount: 0,
        }
      );
      state.totalAmount = parseInt(totalAmount.toFixed(2));
      state.itemCount = itemCount;
    },
    remove: (state, action) => {
      state.items = state.items.filter((item: any) => item.id !== action.payload);
    },
    removeAll: (state) => {
      state.items = [];
    },
    add: (state, action) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    getCartItems: (state) => {
      state.items = data;
    },
  },
});

export const { getCartTotal, remove, clearCart, getCartItems, add, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
