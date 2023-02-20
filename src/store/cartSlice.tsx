import { createSelector, createSlice } from "@reduxjs/toolkit";
import { CollectionItemResponse } from "api/collections/collections.type";

type ISelectedCartItem = CollectionItemResponse;

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as ISelectedCartItem[],
    totalAmount: 0,
    itemCount: 0,
    show: false,
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
      state.totalAmount = totalAmount.toFixed(2);
      state.itemCount = itemCount;
    },
    remove: (state, action) => {
      state.items = state.items.filter((item: CollectionItemResponse) => item.id !== action.payload);
    },
    removeAll: (state) => {
      state.items = [];
    },
    add: (state, action) => {
      state.items.push(action.payload);
    },
    sweepAdd: (state, action) => {
      state.items = action.payload;
    },
    getCartItems: (state) => {
      state.items = [];
    },
    toggleCartModal: (state) => {
      state.show = !state.show;
    },
  },
});

export const getCartSelectedTokenOrderList = createSelector(
  (state: any) => {
    return state.cart.items.map((item: ISelectedCartItem) => item.uid);
  },
  (tokenOrderList: any[]) => tokenOrderList
);

export const { getCartTotal, remove, getCartItems, add, removeAll, toggleCartModal, sweepAdd } = cartSlice.actions;

export default cartSlice.reducer;
