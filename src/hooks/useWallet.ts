import { useAppDispatch, useAppSelector } from "store";
import { getSerializeAddress, setAddress, setIsConnected, setUser, setWallet } from "../store/walletSlice";
import { useErrorModal } from "../pages/Layout/ErrorModal";
import { useSelector } from "react-redux";
import { FUEL_TYPE, useFuelExtension } from "./useFuelExtension";

export const useWallet = () => {
  const getWalletAddress = useSelector(getSerializeAddress);
  const dispatch = useAppDispatch();
  const { totalAmount } = useAppSelector((state) => state.cart);
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const { setGatewayType, selectedGateway, clearGatewayType } = useFuelExtension();

  const hasEnoughFunds = async (buyNowItemPrice?: any) => {
    return selectedGateway().hasEnoughFunds(buyNowItemPrice, getWalletAddress, user.walletAddress, totalAmount);
  };

  const getConnectionStatus = async () => {
    return selectedGateway()?.isConnected();
  };

  const getBalance = async () => {
    if (isConnected) {
      return selectedGateway().getBalance(getWalletAddress, user.walletAddress);
    }

    return null;
  };

  const walletConnectGateway = (type: FUEL_TYPE, activeConnector: number) => {
    setGatewayType(type);

    return walletConnect(activeConnector);
  };
  const walletConnect = async (activeConnector?: number) => {
    if (!isConnected) {
      try {
        const { connect, user, wallet, fuelAddress, address } = await selectedGateway().walletConnect(activeConnector);
        dispatch(setIsConnected(connect));
        dispatch(setAddress(fuelAddress ?? address));
        dispatch(setUser(user));
        dispatch(setWallet(wallet));

        return connect;
      } catch (e) {
        useErrorModal(e);
      }
    }
  };

  const walletDisconnect = async () => {
    try {
      await selectedGateway().walletDisconnect(() => {
        dispatch(setIsConnected(false));
        clearGatewayType();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    walletConnect,
    walletDisconnect,
    getBalance,
    hasEnoughFunds,
    getConnectionStatus,
    walletConnectGateway,
  };
};
