import React, { useEffect } from "react";
import ConnectWallet from "components/ConnectWalletModal";
import { useAppDispatch, useAppSelector } from "store";
import { setIsConnected, setUser, toggleWalletModal } from "store/walletSlice";
import Wallet from "./Wallet";
import { useWallet } from "hooks/useWallet";
import { useFuelExtension } from "hooks/useFuelExtension";
import { useLocalStorage } from "hooks/useLocalStorage";

const Index = () => {
  const dispatch = useAppDispatch();
  const { getConnectionStatus } = useWallet();
  const { show, isConnected } = useAppSelector((state) => state.wallet);
  const { selectedGateway: fuel } = useFuelExtension();
  const { walletConnect } = useWallet();

  useEffect(() => {
    if (!fuel()) return;

    getConnectionStatus().then((res) => {
      const userData = useLocalStorage().getItem("connected_account");
      if (res && userData) {
        dispatch(setUser(userData));
        dispatch(setIsConnected(true));
        walletConnect();
      } else {
        useLocalStorage().removeItem("connected_account");
      }
    });
  }, [fuel()]);

  return isConnected ? <Wallet show={show} onClose={() => dispatch(toggleWalletModal())} /> : <ConnectWallet show={show} onClose={() => dispatch(toggleWalletModal())} />;
};

export default Index;
