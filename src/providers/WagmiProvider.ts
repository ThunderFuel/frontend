import BaseProvider from "./BaseProvider";
import userService from "../api/user/user.service";
import * as wagmi from "@wagmi/core";
import { connectors } from "index";
import { createWalletClient, custom, parseEther } from "viem";
import { Execute, getClient } from "@reservoir0x/reservoir-sdk";
import { linea, goerli } from "wagmi/chains";
import { formatTimeBackend } from "utils";

class WagmiProvider extends BaseProvider {
  hasEnoughBalance(balance: any, amount: any) {
    return balance >= amount;
  }
  handleMakeOffer({ checkoutPrice, checkoutExpireTime, setApproved, setWagmiSteps, wagmiSteps, setStepData, user, setStartTransaction }: any) {
    const wallet = createWalletClient({
      account: user.walletAddress,
      chain: goerli,
      transport: custom(window.ethereum),
    });

    const _client = getClient();

    _client.actions
      .placeBid({
        wallet,
        onProgress: (steps: Execute["steps"]) => {
          const incompleteItems = steps.flatMap((item: any) => {
            const incompleteSubItems = item.items.filter((subItem: any) => subItem.status === "incomplete");
            if (incompleteSubItems.length > 0) {
              return {
                ...item,
                items: incompleteSubItems,
              };
            }

            return [];
          });
          if (incompleteItems.length === 0) setApproved(true);

          const executableSteps = steps.filter((step) => step.items && step.items.length > 0);
          if (wagmiSteps.length === 0) setWagmiSteps(executableSteps);

          const stepCount = executableSteps.length;

          let currentStepItem: NonNullable<Execute["steps"][0]["items"]>[0] | undefined;

          const currentStepIndex = executableSteps.findIndex((step) => {
            currentStepItem = step.items?.find((item: any) => item.status === "incomplete");

            return currentStepItem;
          });

          const currentStep = currentStepIndex > -1 ? executableSteps[currentStepIndex] : executableSteps[stepCount - 1];

          if (currentStepItem) {
            setStepData({
              totalSteps: stepCount,
              stepProgress: currentStepIndex,
              currentStep,
              currentStepItem,
            });
          }
        },
        bids: [
          {
            token: "0x421A81E5a1a07B85B4d9147Bc521E3485ff0CA2F:3", //contractAddress
            orderKind: "seaport-v1.5",
            orderbook: "reservoir",
            weiPrice: parseEther(checkoutPrice.toString()).toString(),
            expirationTime: formatTimeBackend(checkoutExpireTime).toString(),
            options: {
              "seaport-v1.5": {
                useOffChainCancellation: true,
              },
            },
          },
        ],
        chainId: 5,
      })
      .catch((e) => {
        console.log(e);
        setStartTransaction(false);
      });
  }

  provider = wagmi;

  constructor() {
    super();
  }

  getProviderType() {
    return "wagmi";
  }

  handleConfirmListing({ checkoutPrice, checkoutExpireTime, setApproved, setWagmiSteps, wagmiSteps, setStepData, user }: any) {
    const wallet = createWalletClient({
      account: user.walletAddress,
      // chain: linea,
      transport: custom(window.ethereum),
    });

    const _client = getClient();

    _client.actions.listToken({
      wallet,
      listings: [
        {
          token: "0x421A81E5a1a07B85B4d9147Bc521E3485ff0CA2F:10",
          orderKind: "seaport-v1.5",
          orderbook: "reservoir",
          weiPrice: parseEther(checkoutPrice.toString()).toString(),
          expirationTime: formatTimeBackend(checkoutExpireTime).toString(),
          // fees: [`${wallet.account.address}:100`],
          options: {
            "seaport-v1.5": {
              useOffChainCancellation: true,
            },
          },
        },
      ],
      onProgress: (steps: Execute["steps"]) => {
        const incompleteItems = steps.flatMap((item: any) => {
          const incompleteSubItems = item.items.filter((subItem: any) => subItem.status === "incomplete");
          if (incompleteSubItems.length > 0) {
            return {
              ...item,
              items: incompleteSubItems,
            };
          }

          return [];
        });
        if (incompleteItems.length === 0) setApproved(true);

        const executableSteps = steps.filter((step) => step.items && step.items.length > 0);
        if (wagmiSteps.length === 0) setWagmiSteps(executableSteps);

        const stepCount = executableSteps.length;

        let currentStepItem: NonNullable<Execute["steps"][0]["items"]>[0] | undefined;

        const currentStepIndex = executableSteps.findIndex((step) => {
          currentStepItem = step.items?.find((item: any) => item.status === "incomplete");

          return currentStepItem;
        });

        const currentStep = currentStepIndex > -1 ? executableSteps[currentStepIndex] : executableSteps[stepCount - 1];

        if (currentStepItem) {
          setStepData({
            totalSteps: stepCount,
            stepProgress: currentStepIndex,
            currentStep,
            currentStepItem,
          });
        }
      },
      chainId: 5,
    });
  }

  handleCheckout({ setApproved, setWagmiSteps, wagmiSteps, setStepData }: any) {
    const wallet = createWalletClient({
      chain: linea,
      transport: custom(window.ethereum),
    });

    const _client = getClient();

    _client.actions.buyToken({
      items: [{ token: "0x421A81E5a1a07B85B4d9147Bc521E3485ff0CA2F:6" }], //contractAddress
      wallet,
      chainId: 5,
      onProgress: (steps: Execute["steps"]) => {
        const incompleteItems = steps.flatMap((item: any) => {
          const incompleteSubItems = item.items.filter((subItem: any) => subItem.status === "incomplete");
          if (incompleteSubItems.length > 0) {
            return {
              ...item,
              items: incompleteSubItems,
            };
          }

          return [];
        });
        if (incompleteItems.length === 0) setApproved(true);
        console.log(incompleteItems);

        const executableSteps = steps.filter((step) => step.items && step.items.length > 0);
        if (wagmiSteps.length === 0) setWagmiSteps(executableSteps);
        console.log(executableSteps);

        const stepCount = executableSteps.length;

        let currentStepItem: NonNullable<Execute["steps"][0]["items"]>[0] | undefined;

        const currentStepIndex = executableSteps.findIndex((step) => {
          currentStepItem = step.items?.find((item: any) => item.status === "incomplete");

          return currentStepItem;
        });

        const currentStep = currentStepIndex > -1 ? executableSteps[currentStepIndex] : executableSteps[stepCount - 1];

        if (currentStepItem) {
          setStepData({
            totalSteps: stepCount,
            stepProgress: currentStepIndex,
            currentStep,
            currentStepItem,
          });
        }
      },
      options: {
        partial: true,
      },
    });
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
