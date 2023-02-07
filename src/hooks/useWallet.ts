import { useAppDispatch, useAppSelector } from "store";
import { getSerializeAddress, setAddress, setIsConnected, setUser } from "../store/walletSlice";
import { ZeroBytes32 } from "fuels";
import React from "react";
import { useErrorModal } from "../pages/Layout/ErrorModal";
import { useSelector } from "react-redux";
import { useFuel } from "./useFuel";
import userService from "api/user/user.service";

export const useWallet = () => {
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const getWalletAddress = useSelector(getSerializeAddress);
  const dispatch = useAppDispatch();
  const { totalAmount } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.wallet);
  const [fuel] = useFuel();

  const hasEnoughFunds = async () => {
    try {
      const provider = await getProvider();
      const balance = await provider.getBalance(getWalletAddress === "" ? user.contractAddress : getWalletAddress, ZeroBytes32);

      return balance.toNumber() / 1000000000 >= totalAmount;
    } catch {
      return false;
    }
  };

  const getConnectionStatus = async () => {
    fuel.isConnected().then((res) => {
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
      const address = getWalletAddress;
      const balance = await provider.getBalance(address === "" ? user.contractAddress : address, ZeroBytes32);

      return balance.toNumber();
    } catch (e: any) {
      useErrorModal(e);
    }
  };

  const walletConnect = async () => {
    if (!isWalletConnected) {
      try {
        await fuel.connect().then((isConnected: any) => {
          getAccounts().then((res) => {
            dispatch(setAddress(res));
            if (res !== null)
              fuel.getWallet(res).then((res) => {
                if (res !== null) userService.userCreate(res.address?.toB256()).then((res) => dispatch(setUser(res.data)));
              });
            dispatch(setIsConnected(isConnected));
            setIsWalletConnected(isConnected);

            return isConnected;
          });
        });
      } catch (e) {
        useErrorModal(e);
      }
    }

    return isWalletConnected;
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
