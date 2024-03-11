import { useAppDispatch, useAppSelector } from "store";
import { getSerializeAddress, setAddress, setIsConnected, setUser, setWallet } from "../store/walletSlice";
import { ZeroBytes32 } from "fuels";
import { useSelector } from "react-redux";
import userService from "api/user/user.service";
import { FUEL_TYPE, useFuelExtension } from "./useFuelExtension";
import { useLocalStorage } from "./useLocalStorage";

export const useWallet = () => {
  const getWalletAddress = useSelector(getSerializeAddress);
  const dispatch = useAppDispatch();
  const { totalAmount } = useAppSelector((state) => state.cart);
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const { setGatewayType, selectedGateway: fuel, clearGatewayType } = useFuelExtension();

  const hasEnoughFunds = async (buyNowItemPrice?: any) => {
    try {
      const provider = await getProvider();
      const balance = await provider.getBalance(getWalletAddress === "" ? user.walletAddress : getWalletAddress, ZeroBytes32);

      return balance.toNumber() === 0 ? false : balance.toNumber() / 1000000000 >= (buyNowItemPrice !== undefined ? buyNowItemPrice : totalAmount);
    } catch {
      return false;
    }
  };

  const getConnectionStatus = async () => {
    if (!fuel()) return false;

    const hasConnector = await fuel().hasConnector();
    if (!hasConnector) {
      return false;
    }

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

  const walletConnectFuel = async () => {
    setGatewayType(FUEL_TYPE.FUEL);
    // await fuel().selectConnector(FuelConnectorName);

    return walletConnect();
  };
  const walletConnectFuelet = async () => {
    setGatewayType(FUEL_TYPE.FUELET);
    // await fuel().selectConnector(FueletConnectorName);

    return walletConnect();
  };
  const walletConnect = async () => {
    try {
      await fuel()
        .connect()
        .then((connected: any) => {
          if (!connected) return;
          getAccounts().then((fuelAddress) => {
            dispatch(setAddress(fuelAddress));
            if (fuelAddress !== null)
              fuel()
                .getWallet(fuelAddress)
                .then((wallet: any) => {
                  if (wallet !== null) {
                    userService.userCreate({ walletAddress: wallet.address }).then((user) => {
                      useLocalStorage().setItem("connected_account", user.data);
                      dispatch(setUser(user.data));
                      dispatch(setWallet(wallet));
                    });
                  }
                });
            dispatch(setIsConnected(connected));

            return connected;
          });
        })
        .catch(() => {
          useLocalStorage().removeItem("connected_account");
          dispatch(setUser({}));
          dispatch(setWallet({}));
          walletDisconnect();
          // console.log(e?.message);
        });
    } catch (e) {
      // useErrorModal(e);

      return false;
    }
  };

  const walletDisconnect = async () => {
    try {
      await fuel().disconnect();
      dispatch(setIsConnected(false));
      clearGatewayType();
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
