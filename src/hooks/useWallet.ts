import { useAppDispatch, useAppSelector } from "store";
import { getSerializeAddress, setAddress, setIsConnected, setUser, setWallet } from "../store/walletSlice";
import { ZeroBytes32 } from "fuels";
import { useErrorModal } from "../pages/Layout/ErrorModal";
import { useSelector } from "react-redux";
import userService from "api/user/user.service";
import { isObjectEmpty } from "utils";
import { FUEL_TYPE, useFuelExtension } from "./useFuelExtension";

export const useWallet = () => {
  const getWalletAddress = useSelector(getSerializeAddress);
  const dispatch = useAppDispatch();
  const { totalAmount, buyNowItem } = useAppSelector((state) => state.cart);
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const { setGatewayType, selectedGateway: fuel } = useFuelExtension();

  const hasEnoughFunds = async () => {
    try {
      const provider = await getProvider();
      const balance = await provider.getBalance(getWalletAddress === "" ? user.walletAddress : getWalletAddress, ZeroBytes32);

      return balance.toNumber() === 0 ? false : balance.toNumber() / 1000000000 >= (!isObjectEmpty(buyNowItem) ? buyNowItem.price : totalAmount);
    } catch {
      return false;
    }
  };

  const getConnectionStatus = async () => {
    return fuel()?.isConnected();
  };

  const getAccounts = async () => {
    try {
      const accounts = await fuel().accounts();

      return accounts[0];
    } catch (e: any) {
      return null;
    }
  };

  const getProvider = async () => {
    return fuel().getProvider();
  };

  const getBalance = async () => {
    try {
      if (isConnected) {
        const provider = await getProvider();

        const address = getWalletAddress;
        const balance = await provider.getBalance(address === "" ? user.walletAddress : address, ZeroBytes32);

        return balance.toNumber();
      }
    } catch (e: any) {
      // useErrorModal(e);
    }
  };

  const walletConnectFuel = () => {
    setGatewayType(FUEL_TYPE.FUEL);

    return walletConnect();
  };
  const walletConnectFuelet = () => {
    setGatewayType(FUEL_TYPE.FUELET);

    return walletConnect();
  };
  const walletConnect = async () => {
    if (!isConnected) {
      try {
        await fuel()
          .connect()
          .then((connected: any) => {
            getAccounts().then((fuelAddress) => {
              dispatch(setAddress(fuelAddress));
              if (fuelAddress !== null)
                fuel()
                  .getWallet(fuelAddress)
                  .then((wallet: any) => {
                    if (wallet !== null)
                      userService.userCreate(wallet.address?.toB256()).then((user) => {
                        dispatch(setUser(user.data));
                        dispatch(setWallet(wallet));
                      });
                  });
              dispatch(setIsConnected(connected));

              return connected;
            });
          });
      } catch (e) {
        useErrorModal(e);
      }
    }

    return isConnected;
  };

  const walletDisconnect = async () => {
    try {
      await fuel().disconnect();
      dispatch(setIsConnected(false));
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
    walletConnectFuel,
    walletConnectFuelet,
  };
};
