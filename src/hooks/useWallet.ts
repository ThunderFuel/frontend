import { useAppDispatch, useAppSelector } from "store";
import { getSerializeAddress, setAddress, setIsConnected, setIsConnecting, setUser, setWallet } from "../store/walletSlice";
import { useSelector } from "react-redux";
import { FUEL_TYPE, useFuelExtension } from "./useFuelExtension";
import { useAccount, useIsConnected, useWallet as useFuelWallet, useDisconnect } from "@fuels/react";
import { useCallback, useEffect } from "react";
import userService from "api/user/user.service";
import { toB256 } from "fuels";
import { isObjectEmpty } from "utils";

export const useWallet = () => {
  const getWalletAddress = useSelector(getSerializeAddress);
  const dispatch = useAppDispatch();
  const { totalAmount } = useAppSelector((state) => state.cart);
  const { user, isConnecting } = useAppSelector((state) => state.wallet);
  const { setGatewayType, wagmiGateway, clearGatewayType } = useFuelExtension();
  const { isConnected, refetch: refetchConnected, isFetching } = useIsConnected();
  const { account } = useAccount();
  const { wallet } = useFuelWallet({ account });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    refetchConnected();
  }, [refetchConnected]);

  const _connect = useCallback(async () => {
    const _user = await userService.userCreate({ walletAddress: account });

    dispatch(setUser(_user.data));
    dispatch(setIsConnecting(false));
  }, [account, dispatch]);

  useEffect(() => {
    if (isConnecting || isFetching) return;

    if (isConnected && wallet && account && user?.walletAddress === undefined) {
      dispatch(setIsConnecting(true));
      dispatch(setIsConnected(true));

      dispatch(setAddress(toB256(account as any) ?? ""));

      _connect();

      setGatewayType(FUEL_TYPE.FUEL);

      dispatch(setWallet(wallet));
    } else if (!isConnected && !isObjectEmpty(user)) {
      dispatch(setIsConnected(false));
      dispatch(setUser({}));
    }
  }, [isConnected, account, wallet, user, isConnecting, isFetching, _connect, setGatewayType, dispatch]);

  const hasEnoughFunds = useCallback(
    async (buyNowItemPrice?: any) => {
      return wagmiGateway?.hasEnoughFunds(buyNowItemPrice, getWalletAddress, user.walletAddress, totalAmount);
    },
    [wagmiGateway, getWalletAddress, totalAmount, user.walletAddress]
  );

  const hasEnoughBalance = useCallback(
    (balance: any, amount: any) => {
      return wagmiGateway?.hasEnoughBalance(balance, amount);
    },
    [wagmiGateway]
  );

  const getConnectionStatus = useCallback(async () => {
    return wagmiGateway?.isConnected();
  }, [wagmiGateway]);

  const getBalance = useCallback(async () => {
    if (isConnected) return wagmiGateway?.getBalance();

    return null;
  }, [wagmiGateway, isConnected, user.walletAddress]);

  const getBidBalance = useCallback(
    ({ contractAddress, user }: any) => {
      if (isConnected) {
        return wagmiGateway?.getBidBalance({ contractAddress, user });
      }

      return null;
    },
    [wagmiGateway, isConnected]
  );

  const walletConnectGateway = useCallback(
    (type: FUEL_TYPE, activeConnector: number) => {
      setGatewayType(type);

      return walletConnect(activeConnector, type);
    },
    [setGatewayType]
  );

  const walletConnect = useCallback(
    async (activeConnector?: number, type?: any) => {
      if (!isConnected) {
        try {
          const { connect, user, wallet, fuelAddress, address } = (await wagmiGateway?.walletConnect(activeConnector)) ?? {};
          dispatch(setIsConnected(connect));
          dispatch(setAddress(fuelAddress ?? address));
          dispatch(setUser(user));
          dispatch(setWallet(wallet));

          return true;
        } catch (e) {
          // useErrorModal(e);

          return false;
        }
      } else return true;
    },
    [wagmiGateway, dispatch, isConnected]
  );

  const walletDisconnect = useCallback(async () => {
    disconnect();
    try {
      await wagmiGateway?.walletDisconnect(() => {
        dispatch(setIsConnected(false));
        clearGatewayType();
      });
    } catch (e) {
      console.log(e);
    }
  }, [wagmiGateway, disconnect, dispatch, clearGatewayType]);

  const getProviderType = useCallback(() => {
    return wagmiGateway?.getProviderType();
  }, [wagmiGateway]);

  const handleDeposit = useCallback(
    ({ wallet, amount, user, setIsDisabled }: any) => {
      return wagmiGateway?.handleDeposit({ wallet, amount, user, setIsDisabled });
    },
    [wagmiGateway]
  );

  const handleWithdraw = useCallback(
    ({ wallet, amount, user, setIsDisabled }: any) => {
      return wagmiGateway?.handleWithdraw({ wallet, amount, user, setIsDisabled });
    },
    [wagmiGateway]
  );

  const handleCheckout = useCallback(
    ({ setWagmiSteps, setApproved, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed }: any) => {
      return wagmiGateway?.handleCheckout({ setWagmiSteps, setApproved, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed });
    },
    [wagmiGateway]
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
    return wagmiGateway?.handleConfirmListing({
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
    return wagmiGateway?.handleMakeOffer({
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
    return wagmiGateway?.handleCancelOffer({
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
    return wagmiGateway?.handleCancelListing({
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
    return wagmiGateway?.handleCancelAuction({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelAllOffersListings = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return wagmiGateway?.handleCancelAllOffersListings({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelAllOffers = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return wagmiGateway?.handleCancelAllOffers({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelAllListings = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return wagmiGateway?.handleCancelAllListings({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
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
    return wagmiGateway?.handlePlaceBid({
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
    return wagmiGateway?.handleAcceptOffer({ user, wallet, setStartTransaction, setIsFailed, setApproved, currentItem, onCheckoutComplete, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleAcceptBid = () => {
    return;
  };

  const handleBulkListing = ({ promises, user, handleOrders, bulkListItems, bulkUpdateItems, wallet, setApproved, setStartTransaction, setIsFailed, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return wagmiGateway?.handleBulkListing({
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
    return wagmiGateway?.handleTransfer({
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
    wagmiGateway?.handleUpdateOffer({
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
