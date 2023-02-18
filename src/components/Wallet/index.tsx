import React, { useEffect } from "react";
import ConnectWallet from "components/ConnectWalletModal";
import { useAppDispatch, useAppSelector } from "store";
import { setIsConnected, toggleWalletModal } from "store/walletSlice";
import Wallet from "./Wallet";
import { useWallet } from "hooks/useWallet";
import { useFuel } from "hooks/useFuel";

const Index = () => {
  const dispatch = useAppDispatch();
  const { walletConnect, getConnectionStatus } = useWallet();
  const { show, isConnected } = useAppSelector((state) => state.wallet);
  const [fuel] = useFuel();

  useEffect(() => {
    getConnectionStatus().then((res) => {
      if (res) {
        dispatch(setIsConnected(res));
        walletConnect();
      }
    });
  }, [fuel]);

  return isConnected ? <Wallet show={show} onClose={() => dispatch(toggleWalletModal())} /> : <ConnectWallet show={show} onClose={() => dispatch(toggleWalletModal())} />;
};

export default Index;
