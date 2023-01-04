import { useAppDispatch } from "store";
import { getSerializeAddress, setAddress } from "../store/walletSlice";
import { ZeroBytes32 } from "fuels";
import React from "react";
import { EventThunderFuelGenericError } from "../pages/Layout/ErrorModal";
import { useSelector } from "react-redux";

let _isWalletConnected = false;

export const useWallet = () => {
  const [isWalletConnected, setIsWalletConnected] = React.useState(_isWalletConnected);
  const getWalletAddress = useSelector(getSerializeAddress);

  const dispatch = useAppDispatch();

  if (!window.fuel) {
    // throw new Error("Fuel Wallet extension is not installed!");
  }
  const getAccounts = async () => {
    try {
      const accounts = await window.fuel.accounts();

      return accounts[0];
    } catch {
      return null;
    }
  };

  const getProvider = async () => {
    return window.fuel.getProvider();
  };
  const getBalance = async () => {
    const provider = await getProvider();
    const balance = await provider.getBalance(getWalletAddress, ZeroBytes32);

    return balance.toNumber();
  };
  const walletConnect = async () => {
    if (!isWalletConnected) {
      try {
        await window.fuel.connect();
        _isWalletConnected = true;
        setIsWalletConnected(true);

        const address = await getAccounts();
        dispatch(setAddress(address));
      } catch (e) {
        window.dispatchEvent(new CustomEvent(EventThunderFuelGenericError, { detail: JSON.stringify(e) }));
      }
    }
  };
  const walletDisconnect = async () => {
    try {
      await window.fuel.disconnect();
      _isWalletConnected = false;
      setIsWalletConnected(false);
    } catch (e) {
      window.dispatchEvent(new CustomEvent(EventThunderFuelGenericError, { detail: JSON.stringify(e) }));
    }
  };

  return {
    isWalletConnected,
    walletConnect,
    walletDisconnect,
    getBalance,
  };
};
