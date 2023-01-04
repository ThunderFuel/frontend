import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: "",
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

export const { setProvider, setAddress, setIsConnected, disconnect } = walletSlice.actions;

export default walletSlice.reducer;
