import { useAppDispatch, useAppSelector } from "store";
import { getSerializeAddress, setAddress, setIsConnected, setUser, setWallet } from "../store/walletSlice";
import { useSelector } from "react-redux";
import { FUEL_TYPE, useFuelExtension } from "./useFuelExtension";
import { useAccount, useIsConnected, useWallet as useFuelWallet, useDisconnect } from "@fuels/react";
import { useEffect } from "react";
import userService from "api/user/user.service";
import { toB256 } from "fuels";

export const useWallet = () => {
  const getWalletAddress = useSelector(getSerializeAddress);
  const dispatch = useAppDispatch();
  const { totalAmount } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.wallet);
  const { setGatewayType, selectedGateway, clearGatewayType } = useFuelExtension();
  const { isConnected, refetch: refetchConnected } = useIsConnected();
  const { account } = useAccount();
  const { wallet } = useFuelWallet(account);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    refetchConnected();
  }, [refetchConnected]);

  async function _connect() {
    const user = await userService.userCreate({ walletAddress: account });

    dispatch(setUser(user.data));
  }

  useEffect(() => {
    if (isConnected && wallet && account) {
      dispatch(setIsConnected(true));
      dispatch(setAddress(toB256(account as any) ?? ""));

      _connect();

      setGatewayType(FUEL_TYPE.FUEL);

      dispatch(setWallet(wallet));
    } else if (!isConnected) {
      dispatch(setIsConnected(false));
      dispatch(setUser({}));
    }
  }, [isConnected, account, wallet]);

  const hasEnoughFunds = async (buyNowItemPrice?: any) => {
    return selectedGateway().hasEnoughFunds(buyNowItemPrice, getWalletAddress, user.walletAddress, totalAmount);
  };

  const hasEnoughBalance = (balance: any, amount: any) => {
    return selectedGateway()?.hasEnoughBalance(balance, amount);
  };

  const getConnectionStatus = async () => {
    return selectedGateway()?.isConnected();
  };

  const getBalance = async () => {
    if (isConnected) return selectedGateway().getBalance(getWalletAddress, user.walletAddress);

    return null;
  };

  const getBidBalance = async ({ contractAddress, user }: any) => {
    if (isConnected) {
      return selectedGateway().getBidBalance({ contractAddress, user });
    }

    return null;
  };

  const walletConnectGateway = (type: FUEL_TYPE, activeConnector: number) => {
    setGatewayType(type);

    return walletConnect(activeConnector, type);
  };
  const walletConnect = async (activeConnector?: number, type?: any) => {
    if (!isConnected) {
      try {
        const { connect, user, wallet, fuelAddress, address } = await selectedGateway().walletConnect(activeConnector, type);
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
  };

  const walletDisconnect = async () => {
    disconnect();
    try {
      await selectedGateway().walletDisconnect(() => {
        dispatch(setIsConnected(false));
        clearGatewayType();
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getProviderType = () => {
    return selectedGateway().getProviderType();
  };

  const handleDeposit = ({ wallet, amount, user, setIsDisabled }: any) => {
    return selectedGateway().handleDeposit({ wallet, amount, user, setIsDisabled });
  };

  const handleWithdraw = ({ wallet, amount, user, setIsDisabled }: any) => {
    return selectedGateway().handleWithdraw({ wallet, amount, user, setIsDisabled });
  };

  const handleCheckout = ({ setWagmiSteps, setApproved, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed }: any) => {
    return selectedGateway().handleCheckout({ setWagmiSteps, setApproved, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed });
  };

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
    return selectedGateway().handleConfirmListing({
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
    return selectedGateway().handleMakeOffer({
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
    return selectedGateway().handleCancelOffer({
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
    return selectedGateway().handleCancelListing({
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
    return selectedGateway().handleCancelAuction({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelAllOffersListings = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway().handleCancelAllOffersListings({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelAllOffers = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway().handleCancelAllOffers({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelAllListings = ({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway().handleCancelAllListings({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData });
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
    return selectedGateway().handlePlaceBid({
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
    return selectedGateway().handleAcceptOffer({ user, wallet, setStartTransaction, setIsFailed, setApproved, currentItem, onCheckoutComplete, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleAcceptBid = () => {
    return;
  };

  const handleBulkListing = ({ promises, user, handleOrders, bulkListItems, bulkUpdateItems, wallet, setApproved, setStartTransaction, setIsFailed, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway().handleBulkListing({
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
    return selectedGateway().handleTransfer({
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
    selectedGateway().handleUpdateOffer({
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
