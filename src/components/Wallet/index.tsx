import React, { useLayoutEffect } from "react";
import ConnectWallet from "components/ConnectWalletModal";
import { useAppDispatch, useAppSelector } from "store";
import { toggleWalletModal } from "store/walletSlice";
import Wallet from "./Wallet";
import { useWallet } from "hooks/useWallet";

const Index = () => {
  const dispatch = useAppDispatch();
  const { getConnectionStatus } = useWallet();
  const { show, isConnected } = useAppSelector((state) => state.wallet);

  useLayoutEffect(() => {
    getConnectionStatus();
  }, []);

  return isConnected ? <Wallet show={show} onClose={() => dispatch(toggleWalletModal())} /> : <ConnectWallet show={show} onClose={() => dispatch(toggleWalletModal())} />;
};

export default Index;
