import { useAppDispatch, useAppSelector } from "store";
import { getSerializeAddress, setAddress, setIsConnected, toggleWalletModal } from "../store/walletSlice";
import { ZeroBytes32 } from "fuels";
import React from "react";
import { useErrorModal } from "../pages/Layout/ErrorModal";
import { useSelector } from "react-redux";
import { useFuel } from "./useFuel";

export const useWallet = () => {
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const getWalletAddress = useSelector(getSerializeAddress);
  const dispatch = useAppDispatch();
  const { totalAmount } = useAppSelector((state) => state.cart);
  const [fuel] = useFuel();

  const hasEnoughFunds = async () => {
    try {
      const provider = await getProvider();
      const balance = await provider.getBalance(getWalletAddress, ZeroBytes32);

      return balance.toNumber() / 1000000000 >= totalAmount;
    } catch {
      return false;
    }
  };

  const getConnectionStatus = async () => {
    fuel.isConnected().then((res) => {
      console.log({ res });
      dispatch(setIsConnected(res));
    });
  };

  const getAccounts = async () => {
    try {
      const accounts = await fuel.accounts();

      return accounts[0];
    } catch {
      return null;
    }
  };

  const getProvider = async () => {
    return fuel.getProvider();
  };

  const getBalance = async () => {
    try {
      const provider = await getProvider();
      const balance = await provider.getBalance(getWalletAddress, ZeroBytes32);

      return balance.toNumber();
    } catch (e: any) {
      useErrorModal(e);
    }
  };

  const walletConnect = async () => {
    if (!isWalletConnected) {
      try {
        await fuel.connect().then((res: any) => {
          dispatch(setIsConnected(res));
          dispatch(toggleWalletModal());
        });

        // _isWalletConnected = true;
        // setIsWalletConnected(true);
        const address = await getAccounts();
        dispatch(setAddress(address));
      } catch (e) {
        console.log(e);
        useErrorModal(e);
      }
    }
  };

  const walletDisconnect = async () => {
    try {
      await fuel.disconnect();
      // _isWalletConnected = false;
      setIsWalletConnected(false);
    } catch (e) {
      useErrorModal(e);
    }
  };

  return {
    isWalletConnected,
    walletConnect,
    walletDisconnect,
    getBalance,
    hasEnoughFunds,
    getConnectionStatus,
  };
};
