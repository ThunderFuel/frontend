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
  const { getConnectionStatus, walletConnect } = useWallet();
  const { show, isConnected } = useAppSelector((state) => state.wallet);
  const { selectedGateway } = useFuelExtension();

  async function handleConnection() {
    const status = await getConnectionStatus();
    const userData = useLocalStorage().getItem("connected_account");

    if (status && userData) {
      dispatch(setUser(userData));
      const connected = await walletConnect();

      if (connected) dispatch(setIsConnected(true));
      else dispatch(setIsConnected(false));
    } else {
      useLocalStorage().removeItem("connected_account");
    }
  }

  useEffect(() => {
    if (selectedGateway() === undefined || isConnected) return;

    handleConnection();
  }, [selectedGateway()?.provider]);

  return isConnected ? <Wallet show={show} onClose={() => dispatch(toggleWalletModal())} /> : <ConnectWallet show={show} onClose={() => dispatch(toggleWalletModal())} />;
};

export default Index;
