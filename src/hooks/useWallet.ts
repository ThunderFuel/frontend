import { useAppDispatch, useAppSelector } from "store";
import { getSerializeAddress, setAddress, setIsConnected, setUser, setWallet } from "../store/walletSlice";
// import { useErrorModal } from "../pages/Layout/ErrorModal";
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

  const hasEnoughBalance = (balance: any, amount: any) => {
    return selectedGateway().hasEnoughBalance(balance, amount);
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
  const getBidBalance = async (contractAddress: any) => {
    if (isConnected) {
      return selectedGateway().getBidBalance(contractAddress);
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
        // useErrorModal(e);
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

  const getProviderType = () => {
    return selectedGateway().getProviderType();
  };

  const handleCheckout = ({ setWagmiSteps, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed }: any) => {
    return selectedGateway().handleCheckout({ setWagmiSteps, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed });
  };

  const handleConfirmListing = ({ setWagmiSteps, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed }: any) => {
    return selectedGateway().handleConfirmListing({ setWagmiSteps, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed });
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
    return selectedGateway().handleCancelOffer({ user, cancelOrderIds, cancelOfferItems, wallet, setApproved, setStartTransaction, setIsFailed, currentItem, wagmiSteps, setWagmiSteps, setStepData });
  };

  const handleCancelListing = ({ user, cancelOrderIds, cancelOfferItems, wallet, setApproved, setStartTransaction, setIsFailed, currentItem, wagmiSteps, setWagmiSteps, setStepData }: any) => {
    return selectedGateway().handleCancelListing({
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
  };
};
