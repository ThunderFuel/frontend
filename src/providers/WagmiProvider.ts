import BaseProvider from "./BaseProvider";
import userService from "../api/user/user.service";
import * as wagmi from "@wagmi/core";
import { connectors } from "index";

class WagmiProvider extends BaseProvider {
  provider = wagmi;

  constructor() {
    super();
  }

  async getAccounts(): Promise<any> {
    try {
      const account = this.provider?.getAccount();

      return account;
    } catch (e: any) {
      return null;
    }
  }

  async getBalance(): Promise<any> {
    const account = this.provider?.getAccount();
    if (account.address === undefined) return false;

    const balance = await this.provider?.fetchBalance({
      address: account.address,
    });

    return +balance.formatted;
  }

  async getBidBalance(contractAddress: any): Promise<any> {
    const account = this.provider?.getAccount();
    if (account.address === undefined) return false;

    const balance = await this.provider?.fetchBalance({
      address: account.address,
      token: contractAddress,
    });

    return +balance.formatted;
  }

  async getProvider(): Promise<any> {
    return "";
  }

  async walletConnect(activeConnector?: any): Promise<any> {
    try {
      const result = await this.provider?.connect({
        connector: connectors[activeConnector],
      });
      const user = await userService.userCreate({ walletAddress: result?.account });

      const account = this.provider?.getAccount();

      this.provider.watchNetwork((network) => console.log(network, "network changed"));

      return { user: user.data, address: account?.address, connect: account?.isConnected, fuelAddress: null };
    } catch (e) {
      console.log(e);

      return Promise.reject(e);
    }
  }

  async hasEnoughFunds(buyNowItemPrice?: any, walletAddress?: any, userWalletAddress?: any, totalAmount?: any): Promise<any> {
    try {
      const balance = await this.getBalance();
      // if (!balance.toNumber()) {
      //   return false;
      // }

      return balance >= (buyNowItemPrice ? buyNowItemPrice : totalAmount);
    } catch {
      return false;
    }
  }

  async walletDisconnect(callbackFn: any): Promise<any> {
    try {
      await this.provider?.disconnect();
      callbackFn();
    } catch (e) {
      console.log(e);
    }
  }

  isConnected(): any | undefined {
    const account = this.provider?.getAccount();

    return account?.isConnected;
  }
}

export default WagmiProvider;
