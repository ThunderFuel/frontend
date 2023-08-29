import BaseProvider from "./BaseProvider";
import { NativeAssetId, ZeroBytes32 } from "fuels";
import userService from "../api/user/user.service";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { formatTimeBackend, formatTimeContract, isObjectEmpty, toGwei } from "utils";
import { bulkPurchase, executeOrder, setContracts, depositAndPlaceOrder, placeOrder } from "thunder-sdk/src/contracts/thunder_exchange";
import { contracts, exchangeContractId, provider, strategyFixedPriceContractId, ZERO_B256 } from "global-constants";
import { FuelProvider as _FuelProvider } from "../api";

class FuelProvider extends BaseProvider {
  handleMakeOffer({ setApproved, selectedNFT, setBidBalanceUpdated, setCurrentBidBalance, checkoutPrice, checkoutExpireTime, user, wallet, setStartTransaction, setIsFailed }: any) {
    nftdetailsService
      .getLastIndex(1, user.id)
      .then((res) => {
        const order = {
          isBuySide: true,
          maker: user.walletAddress,
          collection: selectedNFT.collection.contractAddress,
          token_id: selectedNFT.tokenOrder,
          price: toGwei(checkoutPrice).toNumber(),
          amount: 1, //fixed
          nonce: res.data + 1,
          strategy: strategyFixedPriceContractId,
          payment_asset: NativeAssetId,
          expiration_range: formatTimeContract(checkoutExpireTime),
          extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
        };

        setContracts(contracts, _FuelProvider);

        userService
          .getBidBalance(user.id)
          .then((res) => {
            setCurrentBidBalance(res.data);
            const _currentBidBalance = res.data;
            if (_currentBidBalance < checkoutPrice) {
              const requiredBidAmount = (checkoutPrice - _currentBidBalance).toFixed(9);
              depositAndPlaceOrder(exchangeContractId, provider, wallet, order, toGwei(requiredBidAmount).toNumber(), NativeAssetId)
                .then((res) => {
                  if (res.transactionResult.status.type === "success") {
                    nftdetailsService
                      .makeOffer({
                        makerUserId: user.id,
                        tokenId: selectedNFT.id,
                        price: checkoutPrice,
                        priceType: 0,
                        expireTime: formatTimeBackend(checkoutExpireTime),
                      })
                      .then(() => {
                        userService
                          .updateBidBalance(user.id, Number(requiredBidAmount))
                          .then(() => {
                            setBidBalanceUpdated(true);
                            setApproved(true);
                          })
                          .catch(() => setIsFailed(true));
                      })
                      .catch(() => setIsFailed(true));
                  }
                })
                .catch((e) => {
                  console.log(e);
                  if (
                    e.message.includes("Request cancelled without user response!") ||
                    e.message.includes("Error: User rejected the transaction!") ||
                    e.message.includes("An unexpected error occurred")
                  )
                    setStartTransaction(false);
                  else setIsFailed(true);
                });
            } else
              placeOrder(exchangeContractId, provider, wallet, order)
                .then((res) => {
                  if (res.transactionResult.status.type === "success") {
                    nftdetailsService
                      .makeOffer({
                        makerUserId: user.id,
                        tokenId: selectedNFT.id,
                        price: checkoutPrice,
                        priceType: 0,
                        expireTime: formatTimeBackend(checkoutExpireTime),
                      })
                      .then(() => setApproved(true))
                      .catch(() => setIsFailed(true));
                  }
                })
                .catch((e) => {
                  console.log(e);
                  if (
                    e.message.includes("Request cancelled without user response!") ||
                    e.message.includes("Error: User rejected the transaction!") ||
                    e.message.includes("An unexpected error occurred")
                  )
                    setStartTransaction(false);
                  else setIsFailed(true);
                });
          })
          .catch(() => setIsFailed(true));
      })
      .catch(() => setIsFailed(true));
  }

  provider = <Window["fuel"]>window.fuel;

  constructor() {
    super();
  }

  getProviderType() {
    return "fuel";
  }

  handleConfirmListing() {
    throw new Error("Method not implemented.");
  }

  handleCheckout({ setApproved, buyNowItem, tokenIds, user, items, setSuccessCheckout, wallet, setIsFailed, setStartTransaction }: any) {
    nftdetailsService.getTokensIndex(tokenIds).then((res) => {
      if (!isObjectEmpty(buyNowItem)) {
        const order = {
          isBuySide: true,
          taker: user.walletAddress,
          maker: buyNowItem.userWalletAddress ?? buyNowItem.user.walletAddress,
          nonce: res.data[tokenIds[0]],
          price: toGwei(buyNowItem.price).toNumber(),
          token_id: buyNowItem.tokenOrder,
          collection: buyNowItem.contractAddress ?? buyNowItem.collection.contractAddress,
          strategy: strategyFixedPriceContractId,
          extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
        };

        setContracts(contracts, _FuelProvider);

        executeOrder(exchangeContractId, provider, wallet, order, NativeAssetId)
          .then((res) => {
            if (res.transactionResult.status.type === "success")
              nftdetailsService.tokenBuyNow(tokenIds, user.id).then((res) => {
                if (res.data) {
                  setSuccessCheckout(res.data);
                  setApproved(true);
                  window.dispatchEvent(new CustomEvent("CompleteCheckout"));
                }
              });
          })
          .catch((e) => {
            console.log(e);
            if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
              setStartTransaction(false);
            else setIsFailed(true);
          });
      } else if (tokenIds.length === 1) {
        const order = {
          isBuySide: true,
          taker: user.walletAddress,
          maker: items[0].userWalletAddress,
          nonce: res.data[items[0].id],
          price: toGwei(items[0].price).toNumber(),
          token_id: items[0].tokenOrder,
          collection: items[0].contractAddress,
          strategy: strategyFixedPriceContractId,
          extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
        };

        setContracts(contracts, _FuelProvider);

        executeOrder(exchangeContractId, provider, wallet, order, NativeAssetId)
          .then((res) => {
            if (res.transactionResult.status.type === "success")
              nftdetailsService.tokenBuyNow(tokenIds, user.id).then((res) => {
                if (res.data) {
                  setSuccessCheckout(res.data);
                  setApproved(true);
                  window.dispatchEvent(new CustomEvent("CompleteCheckout"));
                }
              });
          })
          .catch((e) => {
            console.log(e);
            if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
              setStartTransaction(false);
            else setIsFailed(true);
          });
      } else {
        nftdetailsService.getTokensIndex(tokenIds).then((res) => {
          const takerOrders = items.map((item: any) => {
            return {
              isBuySide: true,
              taker: user.walletAddress,
              maker: item.userWalletAddress,
              nonce: res.data[item.id],
              price: toGwei(item.price).toNumber(),
              token_id: item.tokenOrder,
              collection: item.contractAddress,
              strategy: strategyFixedPriceContractId,
              extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
            };
          });

          setContracts(contracts, _FuelProvider);

          bulkPurchase(exchangeContractId, provider, wallet, takerOrders, NativeAssetId)
            .then((res) => {
              if (res?.transactionResult.status.type === "success")
                nftdetailsService.tokenBuyNow(tokenIds, user.id).then((res) => {
                  if (res.data) {
                    setSuccessCheckout(res.data);
                    setApproved(true);
                    window.dispatchEvent(new CustomEvent("CompleteCheckout"));
                  }
                });
            })
            .catch((e) => {
              console.log(e);
              if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
                setStartTransaction(false);
              else setIsFailed(true);
            });
        });
      }
    });
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

  hasEnoughBalance(balance: any, amount: any): any {
    if (!balance) {
      return false;
    }

    return balance >= amount;
  }
}

export default FuelProvider;
