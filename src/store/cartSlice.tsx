import { createSelector, createSlice } from "@reduxjs/toolkit";
import { CollectionItemResponse } from "api/collections/collections.type";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ISelectedCartItem = CollectionItemResponse;

const LocalStorageCartsKey = "thunder_carts";

export const getItemsFromLocalStorage = () => {
  try {
    const items = useLocalStorage().getItem(LocalStorageCartsKey);

    return items ?? [];
  } catch (e) {
    return [];
  }
};
export const setItemsFromLocalStorage = (items = []) => {
  useLocalStorage().setItem(LocalStorageCartsKey, items);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getItemsFromLocalStorage() as ISelectedCartItem[],
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
      state.items = state.items.filter((item: CollectionItemResponse) => item.uid !== action.payload);
      setItemsFromLocalStorage(state.items as any);
    },
    removeAll: (state) => {
      state.items = [];
      setItemsFromLocalStorage(state.items as any);
    },
    add: (state, action) => {
      state.items.push(action.payload);
      setItemsFromLocalStorage(state.items as any);
    },
    sweepAdd: (state, action) => {
      const { collectionId, items } = action.payload;
      const otherItems = [...state.items].filter((item) => item.collectionId !== collectionId);
      state.items = otherItems.concat(items);

      setItemsFromLocalStorage(state.items as any);
    },
    getCartItems: (state) => {
      state.items = [];
    },
    toggleCartModal: (state) => {
      state.show = !state.show;
    },
    addBuyNow: (state, action) => {
      state.items = [action.payload];
    },
  },
});

export const getCartSelectedTokenOrderList = createSelector(
  (state: any) => {
    return state.cart.items.map((item: ISelectedCartItem) => item.uid);
  },
  (tokenOrderList: any[]) => tokenOrderList
);

export const { getCartTotal, remove, getCartItems, add, removeAll, toggleCartModal, sweepAdd, addBuyNow } = cartSlice.actions;

export default cartSlice.reducer;
