import React, { useCallback, useEffect } from "react";
import ConnectWallet from "components/ConnectWalletModal";
import { RootState, useAppDispatch, useAppSelector } from "store";
import { setIsConnected, setUser, toggleWalletModal } from "store/walletSlice";
import Wallet from "./Wallet";
import { useWallet } from "hooks/useWallet";
import { useFuelExtension } from "hooks/useFuelExtension";
import { useLocalStorage } from "hooks/useLocalStorage";

// Static selectors are not re-evaluated on every render, so they are more efficient
const selectWallet = (state: RootState) => state.wallet;

const Index = () => {
  const dispatch = useAppDispatch();
  const { getConnectionStatus, walletConnect } = useWallet();
  const { show, isConnected } = useAppSelector(selectWallet);
  const { fuelGateway, wagmiGateway } = useFuelExtension();
  const selectedGateway = fuelGateway || wagmiGateway;
  const { getItem, removeItem } = useLocalStorage();

  const handleConnection = useCallback(async () => {
    const status = await getConnectionStatus();
    const userData = getItem("connected_account");

    if (status && userData) {
      dispatch(setUser(userData));
      const connected = await walletConnect();

      if (connected) dispatch(setIsConnected(true));
      else dispatch(setIsConnected(false));
    } else {
      removeItem("connected_account");
    }
  }, [getConnectionStatus, walletConnect, dispatch, getItem, removeItem]);

  useEffect(() => {
    if (selectedGateway === undefined || isConnected) return;

    handleConnection();
  }, [selectedGateway, handleConnection, isConnected]);

  return isConnected ? <Wallet show={show} onClose={() => dispatch(toggleWalletModal())} /> : <ConnectWallet show={show} onClose={() => dispatch(toggleWalletModal())} />;
};

export default Index;
