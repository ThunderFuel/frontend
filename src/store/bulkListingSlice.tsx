import { createSelector, createSlice } from "@reduxjs/toolkit";
import { CollectionItemResponse } from "api/collections/collections.type";

type IBulkListingItem = CollectionItemResponse;

export const bulkListingSlice = createSlice({
  name: "bulkListing",
  initialState: {
    items: [] as IBulkListingItem[],
    selectedUID: [] as any[],
  },

  reducers: {
    remove: (state, action) => {
      state.items = state.items.filter((item: IBulkListingItem) => item.uid !== action.payload);

      const index = state.selectedUID.indexOf(action.payload.uid);
      state.selectedUID.splice(index, 1);
    },
    removeAll: (state) => {
      state.items = [];
    },
    add: (state, action) => {
      state.items.push(action.payload);
      state.selectedUID.push(action.payload.uid);
    },
    toggleSelectedUID: (state, action) => {
      const index = state.selectedUID.indexOf(action.payload.uid);
      if (index > -1) {
        state.selectedUID.splice(index, 1);
      } else {
        state.selectedUID.push(action.payload.uid);
      }
    },
  },
});
export const getBulkListingSelectedTokenOrderList = createSelector(
  (state: any) => {
    return state.bulkListing.items?.map((item: IBulkListingItem) => item.uid);
  },
  (tokenOrderList: any[]) => tokenOrderList
);

export const getBulkListingTableItems = createSelector(
  (state: any) => {
    return state.bulkListing.items?.map((item: IBulkListingItem) => {
      return {
        ...item,
        isChecked: state.bulkListing.selectedUID.includes(item.uid),
      };
    });
  },
  (items: any[]) => items
);

export const { remove, add, removeAll, toggleSelectedUID } = bulkListingSlice.actions;

export default bulkListingSlice.reducer;
