import { useAppDispatch, useAppSelector } from "store";
import { getSerializeAddress, setAddress, setIsConnected, setIsConnecting, setUser, setWallet } from "../store/walletSlice";
import { useSelector } from "react-redux";
import { FUEL_TYPE, useFuelExtension } from "./useFuelExtension";
import { useAccount as useFuelAccount, useIsConnected, useWallet as useFuelWallet, useDisconnect, useBalance as useFuelBalance, useFuel, useCurrentConnector } from "@fuels/react";
import { useCallback, useEffect, useMemo } from "react";
import userService from "api/user/user.service";
import { isObjectEmpty } from "utils";
import { useAccount, useBalance } from "wagmi";
import { bn, DECIMAL_FUEL, DECIMAL_WEI } from "fuels";
import { getDecimalPlaces } from "utils/getDecimalPlaces";

export const useWallet = () => {
  const getWalletAddress = useSelector(getSerializeAddress);
  const dispatch = useAppDispatch();
  const { totalAmount } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.wallet);
  const { setGatewayType, selectedGateway, clearGatewayType } = useFuelExtension();
  const { currentConnector } = useCurrentConnector();
  const isExternal = currentConnector?.external; // External means connectors that do not support Fuel's Network (e.g. Solana, EVM (e.g. MetaMask))

  const { isConnected, refetch: refetchConnected, isFetching } = useIsConnected();
  const { disconnect } = useDisconnect();
  // Account
  // const wagmiAccount = useAccount();
  const { account: fuelAccount } = useFuelAccount();
  const account = fuelAccount;
  // Balance
  // const { data: wagmiBalance } = useBalance({ address: wagmiAccount?.address });
  const { balance: fuelBalance } = useFuelBalance({ address: account });
  const balance = useMemo(() => {
    // if (isExternal) {
    //   return bn((wagmiBalance?.value || BigInt(0)).toString());
    // }

    return fuelBalance || bn("0");
  }, [fuelBalance]);

  const { wallet: fuelWallet } = useFuelWallet({ account: fuelAccount });
  const decimalUnits = DECIMAL_FUEL;

  // Just to keep updated, but ideally this should be used directly via hooks
  useEffect(() => {
    dispatch(setWallet(fuelWallet));
  }, [fuelWallet, dispatch]);

  useEffect(() => {
    dispatch(setIsConnected(isConnected));
  }, [isConnected, dispatch]);

  useEffect(() => {
    dispatch(setAddress(account ?? ""));
  }, [account, dispatch]);

  useEffect(() => {
    refetchConnected();
  }, [refetchConnected]);

  const _connect = useCallback(async () => {
    const _user = await userService.userCreate({ walletAddress: account });

    dispatch(setUser(_user.data));
    dispatch(setIsConnecting(false));
  }, [account, dispatch]);

  useEffect(() => {
    let abort = false;
    if (isConnected && account && user?.walletAddress === undefined) {
      // _connect().then(() => {
      //   !abort && setGatewayType(FUEL_TYPE.WAGMI_METAMASK);
      // });

      _connect();
    }

    return () => {
      abort = true;
    };
  }, [isConnected, account, user, _connect, setGatewayType]);

  const walletConnect = useCallback(async () => {
    return currentConnector
      ?.connect()
      .then(() => true)
      .catch(() => false);
  }, [currentConnector]);

  const hasEnoughFunds = useCallback(
    async (buyNowItemPrice = "0.000") => {
      const buyDecimalCases = getDecimalPlaces(buyNowItemPrice);
      const balanceStringified = balance.format({
        units: decimalUnits,
        precision: buyDecimalCases,
      });

      return Number.parseFloat(balanceStringified) >= Number.parseFloat(buyNowItemPrice);
    },
    [balance, decimalUnits]
  );

  const hasEnoughBalance = useCallback(
    (amount: any) => {
      return selectedGateway?.hasEnoughBalance(balance, amount);
    },
    [selectedGateway, balance]
  );

  const getConnectionStatus = useCallback(async () => {
    return selectedGateway?.isConnected();
  }, [selectedGateway]);

  // We should rather use hooks directly whenever possible
  const getBalance = useCallback(
    (precision = 4) => {
      return balance?.format({
        units: decimalUnits,
        precision: precision,
      });
    },
    [balance, decimalUnits]
  );

  const getBidBalance = useCallback(
    ({ contractAddress, user }: any) => {
      if (isConnected) {
        return selectedGateway?.getBidBalance({ contractAddress, user });
      }

      return null;
    },
    [selectedGateway, isConnected]
  );

  const walletConnectGateway = useCallback(
    (type: FUEL_TYPE) => {
      setGatewayType(type);

      return walletConnect();
    },
    [setGatewayType, walletConnect]
  );

  const walletDisconnect = useCallback(async () => {
    disconnect();
    try {
      await selectedGateway?.walletDisconnect(() => {
        dispatch(setIsConnected(false));
        clearGatewayType();
      });
    } catch (e) {
      console.log(e);
    }
  }, [selectedGateway, disconnect, dispatch, clearGatewayType]);

  const getProviderType = useCallback(() => {
    return selectedGateway?.getProviderType();
  }, [selectedGateway]);

  const handleDeposit = useCallback(
    ({ wallet, amount, user, setIsDisabled }: any) => {
      return selectedGateway?.handleDeposit({ wallet, amount, user, setIsDisabled });
    },
    [selectedGateway]
  );

  const handleWithdraw = useCallback(
    ({ wallet, amount, user, setIsDisabled }: any) => {
      return selectedGateway?.handleWithdraw({ wallet, amount, user, setIsDisabled });
    },
    [selectedGateway]
  );

  const handleCheckout = useCallback(
    ({ setWagmiSteps, setApproved, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed }: any) => {
      return selectedGateway?.handleCheckout({ setWagmiSteps, setApproved, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed });
    },
    [selectedGateway]
  );

  const handleConfirmListing = ({
    cancelOrderIds,
    setWagmiSteps,
    wagmiSteps,
    setStepData,
    buyNowItem,
    tokenIds,
    setSuccessCheckout,
    user,
    items,
    wallet,
    setStartTransaction,
    setIsFailed,
    updateListing,
    checkoutPrice,
    checkoutExpireTime,
    setApproved,
    selectedNFT,
  }: any) => {
    return selectedGateway?.handleConfirmListing({
      setWagmiSteps,
      wagmiSteps,
      setStepData,
      buyNowItem,
      tokenIds,
      setSuccessCheckout,
      user,
      items,
      wallet,
      setStartTransaction,
      setIsFailed,
      updateListing,
      cancelOrderIds,
      checkoutPrice,
      checkoutExpireTime,
      setApproved,
      selectedNFT,
    });
  };

  const handleMakeOffer = ({
    setWagmiSteps,
    wagmiSteps,
    setStepData,
    buyNowItem,
    tokenIds,
    setSuccessCheckout,
    setApproved,
    user,
    items,
    wallet,
    setStartTransaction,
    setIsFailed,
    selectedNFT,
    setBidBalanceUpdated,
    setCurrentBidBalance,
    checkoutPrice,
    checkoutExpireTime,
  }: any) => {
    return selectedGateway?.handleMakeOffer({
      checkoutExpireTime,
      checkoutPrice,
      setWagmiSteps,
      wagmiSteps,
      setStepData,
      buyNowItem,
      setApproved,
      tokenIds,
      setSuccessCheckout,
      user,
      items,
      wallet,
      setStartTransaction,
      setIsFailed,
      selectedNFT,
      setBidBalanceUpdated,
      setCurrentBidBalance,
    });
  };

  const handleCancelOffer = ({ user, cancelOrderIds, cancelOfferItems, wallet, setApproved, setStartTransaction, setIsFailed, currentItem, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway?.handleCancelOffer({
      user,
      cancelOrderIds,
      cancelOfferItems,
      wallet,
      setApproved,
      setStartTransaction,
      setIsFailed,
      currentItem,
      wagmiSteps,
      setWagmiSteps,
      setStepData,
    });
  };

  const handleCancelListing = ({
    user,
    selectedNFT,
    cancelOrderIds,
    cancelOfferItems,
    wallet,
    setApproved,
    setStartTransaction,
    setIsFailed,
    currentItem,
    wagmiSteps,
    setWagmiSteps,
    setStepData,
  }: any) => {
    return selectedGateway?.handleCancelListing({
      user,
      selectedNFT,
      cancelOrderIds,
      cancelOfferItems,
      wallet,
      setApproved,
      setStartTransaction,
      setIsFailed,
      currentItem,
      wagmiSteps,
      setWagmiSteps,
      setStepData,
    });
  };
  const handleCancelAuction = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway?.handleCancelAuction({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelAllOffersListings = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway?.handleCancelAllOffersListings({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelAllOffers = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway?.handleCancelAllOffers({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelAllListings = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway?.handleCancelAllListings({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handlePlaceBid = ({
    selectedNFT,
    checkoutPrice,
    user,
    wallet,
    setStartTransaction,
    setIsFailed,
    setCurrentBidBalance,
    setApproved,
    setBidBalanceUpdated,
    setWagmiSteps,
    wagmiSteps,
    setStepData,
    checkoutExpireTime,
  }: any) => {
    return selectedGateway?.handlePlaceBid({
      selectedNFT,
      checkoutPrice,
      user,
      wallet,
      setStartTransaction,
      setIsFailed,
      setCurrentBidBalance,
      setApproved,
      setBidBalanceUpdated,
      setWagmiSteps,
      wagmiSteps,
      setStepData,
      checkoutExpireTime,
    });
  };

  const handleAcceptOffer = ({ user, wallet, setStartTransaction, setIsFailed, setApproved, currentItem, onCheckoutComplete, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway?.handleAcceptOffer({ user, wallet, setStartTransaction, setIsFailed, setApproved, currentItem, onCheckoutComplete, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleAcceptBid = () => {
    return;
  };

  const handleBulkListing = ({ promises, user, handleOrders, bulkListItems, bulkUpdateItems, wallet, setApproved, setStartTransaction, setIsFailed, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway?.handleBulkListing({
      promises,
      user,
      handleOrders,
      bulkListItems,
      bulkUpdateItems,
      wallet,
      setApproved,
      setStartTransaction,
      setIsFailed,
      wagmiSteps,
      setWagmiSteps,
      setStepData,
    });
  };

  const handleTransfer = ({ address, selectedNFT, wallet, user, setApproved, setStartTransaction, setIsFailed, setWagmiSteps, setStepData, quantity, wagmiSteps }: any) => {
    return selectedGateway?.handleTransfer({
      address,
      selectedNFT,
      wallet,
      user,
      setApproved,
      setStartTransaction,
      setIsFailed,
      setWagmiSteps,
      setStepData,
      quantity,
      wagmiSteps,
    });
  };

  const handleUpdateOffer = ({
    selectedNFT,
    user,
    cancelOrderIds,
    cancelOfferItems,
    wallet,
    setApproved,
    setStartTransaction,
    setIsFailed,
    currentItem,
    wagmiSteps,
    setWagmiSteps,
    setStepData,
    checkoutPrice,
    checkoutExpireTime,
  }: any) => {
    selectedGateway?.handleUpdateOffer({
      selectedNFT,
      user,
      cancelOrderIds,
      cancelOfferItems,
      wallet,
      setApproved,
      setStartTransaction,
      setIsFailed,
      currentItem,
      wagmiSteps,
      setWagmiSteps,
      setStepData,
      checkoutPrice,
      checkoutExpireTime,
    });
  };

  return {
    walletConnect,
    walletDisconnect,
    getBalance,
    hasEnoughFunds,
    getConnectionStatus,
    walletConnectGateway,
    getBidBalance,
    getProviderType,
    handleCheckout,
    handleConfirmListing,
    handleMakeOffer,
    hasEnoughBalance,
    handleCancelOffer,
    handleCancelListing,
    handleCancelAuction,
    handleCancelAllOffersListings,
    handleCancelAllOffers,
    handleCancelAllListings,
    handlePlaceBid,
    handleAcceptOffer,
    handleAcceptBid,
    handleBulkListing,
    handleTransfer,
    handleUpdateOffer,
    handleDeposit,
    handleWithdraw,
  };
};
