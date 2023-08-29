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

  abstract hasEnoughBalance(balance: any, amount: any): any;
}

export default BaseProvider;
