abstract class BaseProvider {
  abstract provider: any;

  abstract isConnected(): Promise<any> | undefined;

  abstract getAccounts(): Promise<any>;

  abstract getProvider(): Promise<any>;

  abstract getBalance(walletAddress: any, userWalletAddress: any): Promise<any>;

  abstract walletConnect(activeConnector?: number): Promise<any>;

  abstract hasEnoughFunds(buyNowItemPrice?: any, walletAddress?: any, userWalletAddress?: any, totalAmount?: any): Promise<any>;

  abstract walletDisconnect(callbackFn: any): any;

  abstract getBidBalance(contractAddress: any): any;

  abstract getProviderType(): any;
  //interface yaz
  abstract handleCheckout({ setApproved, setWagmiSteps, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed }: any): any;

  abstract handleConfirmListing({ setApproved, setWagmiSteps, wagmiSteps, setStepData, buyNowItem, tokenIds, setSuccessCheckout, user, items, wallet, setStartTransaction, setIsFailed }: any): any;

  abstract handleMakeOffer({
    checkoutExpireTime,
    checkoutPrice,
    checkoutExpireTimesetApproved,
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
  }: any): any;

  abstract handlePlaceBid({
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
  }: any): any;

  abstract handleAcceptOffer({ user, wallet, setStartTransaction, setIsFailed, setApproved, currentItem, onCheckoutComplete }: any): any;

  abstract handleAcceptBid({
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
  }: any): any;

  abstract handleBulkListing({ user, cancelOrderIds, cancelOfferItems, wallet, setApproved, setStartTransaction, setIsFailed, currentItem, wagmiSteps, setWagmiSteps, setStepData }: any): any;

  abstract handleTransfer({ address, selectedNFT, wallet, user, setApproved, setStartTransaction, setIsFailed, setWagmiSteps, setStepData }: any): any;

  abstract handleUpdateOffer({ address, selectedNFT, wallet, user, setApproved, setStartTransaction, setIsFailed, setWagmiSteps, setStepData }: any): any;

  abstract handleCancelOffer({ user, cancelOrderIds, cancelOfferItems, wallet, setApproved, setStartTransaction, setIsFailed, currentItem, wagmiSteps, setWagmiSteps, setStepData }: any): any;
  abstract handleCancelListing({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any): any;
  abstract handleCancelAuction({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any): any;
  abstract handleCancelAllOffersListings({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any): any;
  abstract handleCancelAllOffers({ cancelOrderIds, selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, user, wagmiSteps, setWagmiSteps, setStepData }: any): any;
  abstract handleCancelAllListings({ cancelOrderIds, wallet, user, setApproved, setIsFailed, setStartTransaction, wagmiSteps, setWagmiSteps, setStepData }: any): any;

  abstract hasEnoughBalance(balance: any, amount: any): any;
}

export default BaseProvider;
