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
}

export default BaseProvider;
