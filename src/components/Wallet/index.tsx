import React, { useEffect, useState } from "react";
import ConnectWallet from "components/ConnectWalletModal";
import { useAppDispatch, useAppSelector } from "store";
import { setIsConnected, toggleWalletModal } from "store/walletSlice";
import Wallet from "./Wallet";
import { useWallet } from "hooks/useWallet";
import { useFuelExtension } from "hooks/useFuelExtension";

const Index = () => {
  const dispatch = useAppDispatch();
  const { walletConnect, getConnectionStatus } = useWallet();
  const { show, isConnected } = useAppSelector((state) => state.wallet);
  const { selectedGateway } = useFuelExtension();
  const [isAlreadyConnecting, setIsAlreadyReconnecting] = useState(false);

  async function handleConnection() {
    if (isConnected) return false;
    const status = await getConnectionStatus();

    if (status === "isReconnecting" && !isAlreadyConnecting) {
      setIsAlreadyReconnecting(true);
      setTimeout(async () => {
        handleConnection();
      }, 500);
    } else if (status === true) {
      const connected = await walletConnect();
      if (connected) dispatch(setIsConnected(true));
      else dispatch(setIsConnected(false));
    }
  }

  useEffect(() => {
    handleConnection();
  }, [selectedGateway()?.provider]);

  return isConnected ? <Wallet show={show} onClose={() => dispatch(toggleWalletModal())} /> : <ConnectWallet show={show} onClose={() => dispatch(toggleWalletModal())} />;
};

export default Index;
