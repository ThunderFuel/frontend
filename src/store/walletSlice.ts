import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { IUserResponse } from "api/user/user.type";
import { Address, type WalletLocked } from "fuels";

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: "" as any,
    provider: null as any,
    isConnected: false,
    show: false,
    manageFundsShow: false,
    user: {} as IUserResponse,
    wallet: {} as WalletLocked,
    walletType: "",
    networkId: null as unknown as number,
    isConnecting: false,
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
    toggleWalletModal: (state) => {
      state.show = !state.show;
    },
    toggleManageFundsModal: (state) => {
      state.manageFundsShow = !state.manageFundsShow;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setWalletType: (state, action) => {
      state.walletType = action.payload;
    },
    setNetworkId: (state, action) => {
      state.networkId = action.payload;
    },
    setIsConnecting: (state, action) => {
      state.isConnecting = action.payload;
    },
  },
});

export const getSerializeAddress = createSelector(
  (state: any) => {
    const trimmedAddress = state.wallet?.address?.trim();
    if (trimmedAddress !== "") {
      return trimmedAddress.length > 44 ? Address.fromDynamicInput(state.wallet.address) : Address.fromEvmAddress(state.wallet.address);
    }

    return null;
  },
  (address: any) => address
);

export const { setWallet, setAddress, setIsConnected, toggleWalletModal, toggleManageFundsModal, setUser, setWalletType, setNetworkId, setIsConnecting } = walletSlice.actions;

export default walletSlice.reducer;
