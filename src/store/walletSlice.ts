import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Address } from "fuels";

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: "" as any,
    provider: null as any,
    isConnected: false,
  },

  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    disconnect: (state) => {
      state.isConnected = false;
      state.address = "";
      state.provider = null;
    },
  },
});

export const getSerializeAddress = createSelector(
  (state: any) => (state.address === "" ? Address.fromString(state.address) : ""),
  (address: any) => address
);

export const { setProvider, setAddress, setIsConnected, disconnect } = walletSlice.actions;

export default walletSlice.reducer;
