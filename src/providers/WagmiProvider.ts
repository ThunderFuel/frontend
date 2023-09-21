/* eslint-disable @typescript-eslint/no-unused-vars */
import BaseProvider from "./BaseProvider";
import userService from "../api/user/user.service";
import * as wagmi from "@wagmi/core";
import { connectors } from "index";
import { createWalletClient, custom, formatEther, parseEther, parseGwei } from "viem";
import { Execute, getClient } from "@reservoir0x/reservoir-sdk";
import { linea, goerli } from "wagmi/chains";
import { formatTimeBackend } from "utils";
import { prepareWriteContract, writeContract, waitForTransaction, erc721ABI, readContract } from "@wagmi/core";
import { handleTransactionError } from "pages/Layout/CheckoutModal/components/CheckoutProcess";
import { erc1155ABI, goerliWethAddress, lineaWethAddress, wethABI } from "global-constants";
import { useDispatch } from "react-redux";
import { setNetworkId } from "store/walletSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
class WagmiProvider extends BaseProvider {
  provider = wagmi;
  dispatch: any;

  constructor() {
    super();
    this.dispatch = useDispatch();
  }

  private handleSteps({ steps, setApproved, wagmiSteps, setWagmiSteps, setStepData }: any) {
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

    const executableSteps = steps.filter((step: any) => step.items && step.items.length > 0);
    if (wagmiSteps.length === 0) setWagmiSteps(executableSteps);

    const stepCount = executableSteps.length;

    let currentStepItem: NonNullable<Execute["steps"][0]["items"]>[0] | undefined;

    const currentStepIndex = executableSteps.findIndex((step: any) => {
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
  }

  private async cancelOrder({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData, setStartTransaction, setIsFailed }: any) {
    try {
      const wallet = createWalletClient({
        account: user.walletAddress,
        chain: linea,
        transport: custom(window.ethereum),
      });

      const _client = getClient();

      return _client.actions
        .cancelOrder({
          ids: cancelOrderIds,
          chainId: linea.id,
          wallet,
          onProgress: (steps: Execute["steps"]) => {
            this.handleSteps({ steps, setApproved, wagmiSteps, setWagmiSteps, setStepData });
          },
          // options: {
          //     maker:
          //     token:
          // }
        })
        .catch((error) => {
          handleTransactionError({ error, setStartTransaction, setIsFailed });
        });
    } catch (error) {
      handleTransactionError({ error, setStartTransaction, setIsFailed });
    }
  }

  async handleWithdraw({ amount, setIsDisabled }: any) {
    try {
      const config = await prepareWriteContract({
        address: goerliWethAddress,
        abi: wethABI,
        functionName: "withdraw",
        args: [parseEther(amount.toString())],
      });

      const { hash } = await writeContract(config);
      const data = await waitForTransaction({
        hash,
      });

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  }

  async handleDeposit({ amount, setIsDisabled }: any) {
    try {
      const config = await prepareWriteContract({
        address: goerliWethAddress,
        abi: wethABI,
        functionName: "deposit",
        value: parseEther(amount.toString()),
      });

      const { hash } = await writeContract(config);
      const data = await waitForTransaction({
        hash,
      });

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  }

  async handleTransfer({ selectedNFT, address, setStartTransaction, setIsFailed }: any) {
    const isMultiEdition = false;

    if (isMultiEdition) {
      const config = await prepareWriteContract({
        address: "0x421A81E5a1a07B85B4d9147Bc521E3485ff0CA2F",
        abi: erc1155ABI,
        functionName: "safeTransferFrom",
        // args: [from, to, id, amount, 0],
      });

      const { hash } = await writeContract(config);
      const data = await waitForTransaction({
        hash,
      });
    } else {
      try {
        const config = await prepareWriteContract({
          address: "0x421A81E5a1a07B85B4d9147Bc521E3485ff0CA2F",
          abi: erc721ABI,
          functionName: "safeTransferFrom",
          args: ["0xb7f3b58C66770C81AC1FCb70e5580ddA60Edb08C", "0xb1A7559274Bc1e92c355C7244255DC291AFEDB00", BigInt(11)],
        });

        const { hash } = await writeContract(config);
        console.log({ hash });
        const data = await waitForTransaction({
          hash,
        });
        console.log({ data });
      } catch (error) {
        handleTransactionError({ error, setStartTransaction, setIsFailed });
      }
    }
  }

  async handleUpdateOffer({ checkoutPrice, checkoutExpireTime, user, setApproved, setStartTransaction, setWagmiSteps, setStepData, cancelOrderIds, wagmiSteps, setIsFailed }: any) {
    console.log("handleUpdateOffer");
    await this.handleCancelOffer({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData, setStartTransaction, setIsFailed });
    console.log("after cancel offer");

    await this.handleMakeOffer({ checkoutPrice, checkoutExpireTime, setApproved, setWagmiSteps, wagmiSteps, setStepData, user, setStartTransaction });
    console.log("after make offer");
  }

  async handleCancelOffer({ user, currentItem, setApproved, wagmiSteps, setWagmiSteps, setStepData, setIsFailed, setStartTransaction }: any) {
    const cancelOrderIds = [currentItem?.id];

    return this.cancelOrder({ user, cancelOrderIds, currentItem, setApproved, wagmiSteps, setWagmiSteps, setStepData, setIsFailed, setStartTransaction });
  }
  async handleCancelListing({ user, selectedNFT, currentItem, setApproved, wagmiSteps, setWagmiSteps, setStepData, setStartTransaction, setIsFailed }: any) {
    const { data } = await nftdetailsService.getListingOrderId({ id: selectedNFT.id });
    const cancelOrderIds = [data?.id];

    return this.cancelOrder({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData, setStartTransaction, setIsFailed });
  }
  handleCancelAuction({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData }: any) {
    this.cancelOrder({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData });
  }
  handleCancelAllOffersListings({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData }: any) {
    this.cancelOrder({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData });
  }
  handleCancelAllOffers({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData }: any) {
    this.cancelOrder({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData });
  }
  handleCancelAllListings({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData }: any) {
    this.cancelOrder({ user, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData });
  }

  async handleMakeOffer({ selectedNFT, checkoutPrice, checkoutExpireTime, setApproved, setWagmiSteps, wagmiSteps, setStepData, user, setStartTransaction }: any) {
    const wallet = createWalletClient({
      account: user.walletAddress,
      chain: linea,
      transport: custom(window.ethereum),
    });

    const _client = getClient();

    return _client.actions
      .placeBid({
        wallet,
        onProgress: (steps: Execute["steps"]) => {
          this.handleSteps({ steps, setApproved, wagmiSteps, setWagmiSteps, setStepData });
        },
        bids: [
          {
            token: selectedNFT.id, //contractAddress
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
        chainId: linea.id,
      })
      .catch((e) => {
        console.log(e);
        setStartTransaction(false);
      });
  }

  async handleConfirmListing({
    cancelOrderIds,
    selectedNFT,
    updateListing,
    setStartTransaction,
    setIsFailed,
    checkoutPrice,
    checkoutExpireTime,
    setApproved,
    setWagmiSteps,
    wagmiSteps,
    setStepData,
    user,
    buyNowItem,
    tokenIds,
    setSuccessCheckout,
    items,
  }: any) {
    if (updateListing) {
      await this.handleCancelListing({ user, selectedNFT, cancelOrderIds, setApproved, wagmiSteps, setWagmiSteps, setStepData, setStartTransaction, setIsFailed });
    }

    const wallet = createWalletClient({
      account: user.walletAddress,
      chain: linea,
      transport: custom(window.ethereum),
    });

    const _client = getClient();

    return _client.actions
      .listToken({
        wallet,
        listings: [
          {
            token: selectedNFT.id,
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
          this.handleSteps({ steps, setApproved, wagmiSteps, setWagmiSteps, setStepData });
        },
        chainId: linea.id,
      })
      .catch((e) => {
        console.log(e);
        setStartTransaction(false);
      });
  }

  handleCheckout({ tokenIds, setApproved, setWagmiSteps, wagmiSteps, setStepData, setStartTransaction }: any) {
    const _tokens = tokenIds.map((id: any) => ({
      token: id,
    }));

    const wallet = createWalletClient({
      chain: linea,
      transport: custom(window.ethereum),
    });

    const _client = getClient();

    _client.actions
      .buyToken({
        items: _tokens,
        wallet,
        chainId: linea.id,
        onProgress: (steps: Execute["steps"]) => {
          this.handleSteps({ steps, setApproved, wagmiSteps, setWagmiSteps, setStepData });
        },
        options: {
          partial: true,
        },
      })
      .catch((e) => {
        console.log(e);
        setStartTransaction(false);
      });
  }

  handleAcceptOffer({ user, setApproved, wagmiSteps, setWagmiSteps, setStepData }: any) {
    const wallet = createWalletClient({
      account: user.walletAddress,
      chain: goerli,
      transport: custom(window.ethereum),
    });

    const _client = getClient();

    _client.actions.acceptOffer({
      items: [{ token: "0x421A81E5a1a07B85B4d9147Bc521E3485ff0CA2F:9", quantity: 1 }],
      wallet,
      chainId: 5,
      onProgress: (steps: Execute["steps"]) => {
        this.handleSteps({ steps, setApproved, wagmiSteps, setWagmiSteps, setStepData });
      },
    });
  }

  handleBulkListing({ bulkListItems, bulkUpdateItems, setApproved, setWagmiSteps, wagmiSteps, setStepData, user }: any) {
    const listingObjectConstants = {
      orderKind: "seaport-v1.5",
      orderbook: "reservoir",
      options: {
        "seaport-v1.5": {
          useOffChainCancellation: true,
        },
      },
    };

    const listings = bulkListItems.map((item: any) => {
      return {
        ...listingObjectConstants,
        token: item.tokenId,
        weiPrice: parseEther(item.price.toString()).toString(),
        expirationTime: formatTimeBackend(item.expireTime).toString(),
      };
    });

    const wallet = createWalletClient({
      account: user.walletAddress,
      chain: linea,
      transport: custom(window.ethereum),
    });

    const _client = getClient();

    _client.actions.listToken({
      wallet,
      listings: listings,
      onProgress: (steps: Execute["steps"]) => {
        this.handleSteps({ steps, setApproved, wagmiSteps, setWagmiSteps, setStepData });
      },
      chainId: linea.id,
    });
  }

  /// NOT NEEDED \\\
  handleAcceptBid({
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
  }: any) {
    throw new Error("Method not implemented.");
  }
  handlePlaceBid({ setWagmiSteps, setApproved, wagmiSteps, setStepData, user, checkoutExpireTime, checkoutPrice }: any) {
    const wallet = createWalletClient({
      account: user.walletAddress,
      chain: goerli,
      transport: custom(window.ethereum),
    });

    const _client = getClient();

    const _expireTime = checkoutExpireTime;

    _client.actions.placeBid({
      wallet,
      onProgress: (steps: Execute["steps"]) => {
        this.handleSteps({ steps, setApproved, wagmiSteps, setWagmiSteps, setStepData });
      },
      bids: [
        {
          token: "0x421A81E5a1a07B85B4d9147Bc521E3485ff0CA2F:7",
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
    });
  }
  /// NOT NEEDED \\\

  hasEnoughBalance(balance: any, amount: any) {
    return balance >= amount;
  }

  getProviderType() {
    return "wagmi";
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

  async getBidBalance({ contractAddress }: any): Promise<any> {
    const data = await readContract({
      address: lineaWethAddress,
      abi: wethABI,
      functionName: "balanceOf",
      args: [contractAddress],
    });
    if (typeof data === "bigint") return formatEther(data);
  }

  async getProvider(): Promise<any> {
    return "";
  }

  async walletConnect(activeConnector?: any): Promise<any> {
    try {
      const account = this.provider?.getAccount();

      let walletAddress;
      if (account.isConnected) walletAddress = account.address;
      else {
        const result = await this.provider?.connect({
          connector: connectors[activeConnector],
        });

        walletAddress = result?.account;
      }
      const network = this.provider.getNetwork();

      this.dispatch(setNetworkId(network.chain?.id));
      const user = await userService.userCreate({ walletAddress: walletAddress });

      this.provider.watchNetwork((network) => {
        this.dispatch(setNetworkId(network.chain?.id));
      });

      return { user: user.data, address: walletAddress, connect: account?.isConnected, fuelAddress: null };
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
    if (account.isReconnecting) return "isReconnecting";
    else if (account?.connector === undefined) return false;
    else return account?.isConnected;
  }
}

export default WagmiProvider;
