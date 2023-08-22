import BaseProvider from "./BaseProvider";
import { ZeroBytes32 } from "fuels";
import userService from "../api/user/user.service";

class FuelProvider extends BaseProvider {
  provider = <Window["fuel"]>window.fuel;

  constructor() {
    super();
  }

  async getAccounts(): Promise<any> {
    try {
      const accounts = await this.provider?.accounts();

      return accounts ? accounts[0] : null;
    } catch (e: any) {
      return null;
    }
  }

  async getBalance(walletAddress: any, userWalletAddress: any): Promise<any> {
    const isConnected = await this.isConnected();
    if (!isConnected) {
      return null;
    }
    const _provider = await this.getProvider();
    const address = walletAddress ? walletAddress : userWalletAddress;
    const balance = await _provider?.getBalance(address, ZeroBytes32);

    return balance?.toNumber() / 1000000000;
  }

  async getBidBalance(): Promise<any> {
    // userService.getBidBalance(userId).then((res) => console.log(res));
    return "";
  }

  async getProvider(): Promise<any> {
    return this.provider?.getProvider();
  }

  async walletConnect(): Promise<any> {
    try {
      const connect = await this.provider?.connect();
      if (!connect) {
        throw new Error("Not Connected");
      }

      const fuelAddress = await this.getAccounts();
      if (!fuelAddress) {
        throw new Error("Not Found Address");
      }

      const wallet = await this.provider?.getWallet(fuelAddress);
      if (!wallet) {
        throw new Error("Not Found Wallet");
      }

      const user = await userService.userCreate({ walletAddress: wallet.address });

      return {
        connect,
        user: user.data,
        wallet,
        fuelAddress,
      };
    } catch (e) {
      console.log(e);

      return Promise.reject(e);
    }
  }

  async hasEnoughFunds(buyNowItemPrice?: any, walletAddress?: any, userWalletAddress?: any, totalAmount?: any): Promise<any> {
    try {
      const balance = await this.getBalance(walletAddress, userWalletAddress);
      if (!balance.toNumber()) {
        return false;
      }

      return balance.toNumber() / 1000000000 >= (buyNowItemPrice ? buyNowItemPrice : totalAmount);
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

  isConnected(): Promise<any> | undefined {
    return this.provider?.isConnected();
  }
}

export default FuelProvider;
