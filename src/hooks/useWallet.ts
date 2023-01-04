import { useAppDispatch } from "store";
import { getSerializeAddress, setAddress } from "../store/walletSlice";
import { ZeroBytes32 } from "fuels";
import React from "react";
import { useSelector } from "react-redux";

let _isWalletConnected = false;

export const useWallet = () => {
  const [isWalletConnected, setIsWalletConnected] = React.useState(_isWalletConnected);
  const dispatch = useAppDispatch();

  const accountAddress = useSelector(getSerializeAddress);

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
    const balance = await provider.getBalance(accountAddress, ZeroBytes32);
    console.log(balance.toNumber());

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

        await getBalance();
      } catch (e) {
        window.dispatchEvent(new CustomEvent("ThunderFuelGenericError", { detail: "connect" }));
      }
    }
  };
  const walletDisconnect = async () => {
    try {
      await window.fuel.disconnect();
      _isWalletConnected = false;
      setIsWalletConnected(false);
    } catch {
      window.dispatchEvent(new CustomEvent("ThunderFuelGenericError", { detail: "notDisconnect" }));
    }
  };

  return {
    isWalletConnected,
    walletConnect,
    walletDisconnect,
    getBalance,
  };
};
