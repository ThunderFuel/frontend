/* eslint-disable @typescript-eslint/no-unused-vars */
import BaseProvider from "./BaseProvider";
import { type Fuel, Provider } from "fuels";
import userService from "../api/user/user.service";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { formatTimeBackend, formatTimeContract, isObjectEmpty, toGwei } from "utils";
import {
  bulkPurchase,
  executeOrder,
  setContracts,
  depositAndOffer,
  placeOrder,
  cancelOrder,
  bulkCancelOrder,
  bulkListing,
  updateOrder,
  type TakerOrder,
} from "thunder-sdk/src/contracts/thunder_exchange";
import { assetManagerContractId, contracts, exchangeContractId, FUEL_PROVIDER, FUEL_PROVIDER_URL, poolContractId, strategyAuctionContractId, strategyFixedPriceContractId } from "global-constants";
import { handleTransactionError } from "pages/Layout/CheckoutModal/components/CheckoutProcess";
import offerService from "api/offer/offer.service";
import collectionsService from "api/collections/collections.service";
import { transfer } from "thunder-sdk/src/contracts/erc721";
import { deposit, withdraw } from "thunder-sdk/src/contracts/pool";
import type { FUEL_TYPE } from "hooks/useFuelExtension";
import { EventDispatchFetchBalances } from "pages/Layout/Header/Header";
import { localStore } from "hooks/useLocalStorage";

class FuelProvider extends BaseProvider {
  provider: Fuel;

  constructor(provider: Fuel | undefined) {
    super();
    if (!provider) throw new Error("Provider is not defined");
    this.provider = provider;
  }

  getProviderType() {
    return "fuel";
  }

  async getBaseAssetId() {
    return (await FUEL_PROVIDER).getBaseAssetId();
  }

  async handleWithdraw({ wallet, amount, user, setIsDisabled, setStartTransaction, setIsFailed, setApproved }: any) {
    const _baseAssetId = await this.getBaseAssetId();

    try {
      await withdraw(poolContractId, FUEL_PROVIDER_URL, wallet, toGwei(amount).toNumber(), _baseAssetId, assetManagerContractId);
      // userService.updateBidBalance(user.id, amount).then(() => setIsDisabled(false));
      setIsDisabled(false);
      setApproved(true);
      window.dispatchEvent(new CustomEvent(EventDispatchFetchBalances));
    } catch (e: any) {
      console.log({ e });
      setIsDisabled(false);

      if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
        setStartTransaction(false);
      else setIsFailed(true);
    }
  }

  async handleDeposit({ wallet, amount, user, setIsDisabled, setStartTransaction, setIsFailed, setApproved }: any) {
    const _baseAssetId = await this.getBaseAssetId();

    try {
      await deposit(poolContractId, FUEL_PROVIDER_URL, wallet, toGwei(amount).toNumber(), _baseAssetId, assetManagerContractId);
      // userService.updateBidBalance(user.id, amount).then(() => setIsDisabled(false));
      setIsDisabled(false);
      setApproved(true);
      window.dispatchEvent(new CustomEvent(EventDispatchFetchBalances));
    } catch (e: any) {
      console.log({ e });
      setIsDisabled(false);

      if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
        setStartTransaction(false);
      else setIsFailed(true);
    }
  }

  async handleTransfer({ address, selectedNFT, wallet, user, setApproved, setStartTransaction, setIsFailed }: any) {
    const _provider = await this.getProvider();
    const toAddress = address;
    transfer(selectedNFT.collection.contractAddress, _provider as unknown as any, wallet, user.walletAddress, toAddress, selectedNFT.tokenOrder)
      .then(() => {
        // nftdetailsService.tokenTransfer(selectedNFT.id, tempAddress === "" ? address : tempAddress);
        setApproved(true);
      })
      .catch((e) => {
        console.log(e);
        if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
          setStartTransaction(false);
        else setIsFailed(true);
      });
  }

  async handleUpdateOffer({ setBidBalanceUpdated, currentItem, checkoutPrice, checkoutExpireTime, selectedNFT, wallet, user, setApproved, setStartTransaction, setIsFailed }: any) {
    const _baseAssetId = await this.getBaseAssetId();

    offerService.getOffersIndex([selectedNFT?.bestOffer?.id]).then(async (res) => {
      const order = {
        isBuySide: true,
        maker: user.walletAddress,
        collection: selectedNFT.contractAddress,
        token_id: selectedNFT.tokenOrder,
        price: toGwei(checkoutPrice).toNumber(),
        amount: 1, //fixed
        nonce: res.data[selectedNFT?.bestOffer?.id],
        strategy: strategyFixedPriceContractId,
        payment_asset: _baseAssetId,
        expiration_range: formatTimeContract(checkoutExpireTime),
        extra_params: { extra_address_param: _baseAssetId, extra_contract_param: _baseAssetId, extra_u64_param: 0 }, // laim degilse null
      };

      const _provider = await this.getProvider();
      setContracts(contracts, _provider as any);

      userService.getBidBalance(user.id).then((res) => {
        const currentBidBalance = res.data;
        if (currentBidBalance < checkoutPrice) {
          const requiredBidAmount = (checkoutPrice - currentBidBalance).toFixed(9);
          depositAndOffer(exchangeContractId, FUEL_PROVIDER_URL, wallet, order, toGwei(requiredBidAmount).toNumber(), _baseAssetId, true)
            .then((res) => {
              if (res.transactionResult.isStatusSuccess) {
                // nftdetailsService.tokenUpdateOffer({
                //   id: currentItem?.id,
                //   price: checkoutPrice,
                //   expireTime: formatTimeBackend(checkoutExpireTime),
                // });
                // userService.updateBidBalance(user.id, Number(requiredBidAmount)).then(() => setBidBalanceUpdated(true));
                setBidBalanceUpdated(true);
                setApproved(true);
                window.dispatchEvent(new CustomEvent(EventDispatchFetchBalances));
              }
            })
            .catch((e) => {
              console.log(e);
              if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
                setStartTransaction(false);
              else setIsFailed(true);
            });
        } else
          updateOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, order)
            .then((res) => {
              if (res.transactionResult.isStatusSuccess) {
                // nftdetailsService.tokenUpdateOffer({
                //   id: currentItem?.id,
                //   price: checkoutPrice,
                //   expireTime: formatTimeBackend(checkoutExpireTime),
                // });
                setApproved(true);
                window.dispatchEvent(new CustomEvent(EventDispatchFetchBalances));
              }
            })
            .catch((e) => {
              console.log(e);
              if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
                setStartTransaction(false);
              else setIsFailed(true);
            });
      });
    });
  }
  async handleBulkListing({ promises, handleOrders, bulkListItems, bulkUpdateItems, wallet, setApproved, setStartTransaction, setIsFailed }: any) {
    // FOR BACKEND
    const _bulkListItems = bulkListItems.map((item: any) => {
      return { ...item, expireTime: formatTimeBackend(item.expireTime) };
    });
    // FOR BACKEND
    const _bulkUpdateItems = bulkUpdateItems.map((item: any) => {
      return { ...item, expireTime: formatTimeBackend(item.expireTime) };
    });

    const { bulkListMakerOders, bulkUpdateMakerOders } = await handleOrders({
      bulkListItems,
      bulkUpdateItems,
    });

    Promise.all(promises)
      .then(async () => {
        const _provider = await Provider.create(FUEL_PROVIDER_URL);

        setContracts(contracts, _provider as any);

        const bulkPlaceOrderRes = await bulkListing(exchangeContractId, FUEL_PROVIDER_URL, wallet, bulkListMakerOders, bulkUpdateMakerOders);

        if (bulkPlaceOrderRes?.transactionResult.isStatusSuccess) {
          if (bulkUpdateItems.length > 0) {
            // try {
            //   await collectionsService.updateBulkListing(_bulkUpdateItems);
            // } catch (e) {
            //   console.log("Error from updateBulkListing:", e);
            //   setIsFailed(true);
            // }
          }

          if (bulkListItems.length > 0) {
            // try {
            //   await collectionsService.bulkListing(_bulkListItems);
            // } catch (e) {
            //   console.log("Error from bulkListing:", e);
            //   setIsFailed(true);
            // }
          }

          setApproved(true);
        }
      })
      .catch((e) => {
        handleTransactionError({ error: e, setStartTransaction, setIsFailed });
      });
  }
  async handleAcceptOffer({ wallet, setStartTransaction, setIsFailed, setApproved, currentItem, onCheckoutComplete }: any) {
    const _baseAssetId = await this.getBaseAssetId();

    try {
      const { data } = await collectionsService.getCollection({ id: currentItem.tokenId });
      if (data.salable) {
        const result = await this.handleCancelListing({ selectedNFT: { id: currentItem.tokenId }, wallet, setApproved, setStartTransaction, setIsFailed, isAcceptOffer: true });

        if (result === false) {
          setIsFailed(true);

          return;
        }
      }
    } catch (error) {
      setIsFailed(true);
    }

    offerService.getOffersIndex([currentItem.id]).then(async (res) => {
      const order = {
        isBuySide: false,
        taker: currentItem.takerAddress,
        maker: currentItem.makerAddress,
        nonce: res.data[currentItem.id],
        price: toGwei(currentItem.price).toNumber(),
        collection: currentItem.contractAddress,
        token_id: currentItem.tokenOrder,
        strategy: strategyFixedPriceContractId,
        extra_params: { extra_address_param: _baseAssetId, extra_contract_param: _baseAssetId, extra_u64_param: 0 }, // lazim degilse null
      };

      const _provider = await this.getProvider();

      setContracts(contracts, _provider as any);

      executeOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, order, _baseAssetId)
        .then((res) => {
          if (res.transactionResult.isStatusSuccess) {
            onCheckoutComplete();
            setApproved(true);
            window.dispatchEvent(new CustomEvent(EventDispatchFetchBalances));
            // offerService.acceptOffer({ id: currentItem.id }).then(() => {
            //   // userService.updateBidBalance(currentItem.makerUserId, -currentItem.price);
            //   onCheckoutComplete();
            //   setApproved(true);
            // });
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
            setStartTransaction(false);
          else setIsFailed(true);
        });
    });
  }
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
  async handleCancelOffer({ cancelOfferItems, wallet, user, setApproved, setStartTransaction, setIsFailed, currentItem }: any) {
    const _provider = await this.getProvider();

    setContracts(contracts, _provider as any);

    if (cancelOfferItems?.length > 0) {
      // TODO
      // bulkCancelOrder(exchangeContractId, provider, wallet, [])
      //   .then((res: any) => {
      //     if (res.transactionResult.isStatusSuccess) {
      //       offerService.cancelAllOffer({ userId: user.id });
      //       setApproved(true);
      //     }
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //     if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
      //       setStartTransaction(false);
      //     else setIsFailed(true);
      //   });
    } else {
      offerService.getOffersIndex([currentItem.id]).then((res) => {
        cancelOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, strategyFixedPriceContractId, res.data[currentItem.id], true)
          .then((res) => {
            if (res.transactionResult.isStatusSuccess) {
              // nftdetailsService.cancelOffer(currentItem.id);
              setApproved(true);
            }
          })
          .catch((e) => {
            console.log(e);
            if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
              setStartTransaction(false);
            else setIsFailed(true);
          });
      });
    }
  }
  async handleCancelListing({ selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed, isAcceptOffer }: any) {
    const _provider = await this.getProvider();

    setContracts(contracts, _provider as any);

    try {
      const res = await nftdetailsService.getTokensIndex([selectedNFT.id]);
      const cancelRes = await cancelOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, strategyFixedPriceContractId, res.data[selectedNFT.id], false);
      if (cancelRes.transactionResult.isStatusSuccess) {
        if (isAcceptOffer) return true;

        // nftdetailsService.tokenCancelList(selectedNFT.id);
        setApproved(true);
      }
    } catch (e: any) {
      if (isAcceptOffer) return false;

      if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred")) {
        setStartTransaction(false);
      } else {
        setIsFailed(true);
      }
    }
  }
  async handleCancelAuction({ selectedNFT, wallet, setApproved, setStartTransaction, setIsFailed }: any) {
    const _provider = await this.getProvider();
    setContracts(contracts, _provider as any);
    nftdetailsService.getAuctionIndex([selectedNFT.id]).then((res) => {
      cancelOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, strategyAuctionContractId, res.data[selectedNFT.id], false)
        .then(() => {
          nftdetailsService.tokenCancelAuction(selectedNFT.id);
          setApproved(true);
        })
        .catch((e) => {
          console.log(e);
          if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
            setStartTransaction(false);
          else setIsFailed(true);
        });
    });
  }
  async handleCancelAllOffersListings({ user, wallet, setApproved, setStartTransaction, setIsFailed }: any) {
    const _provider = await this.getProvider();

    setContracts(contracts, _provider as any);
    const params = { userId: user.id };

    const response = await offerService.getAllOfferandListingIndexes({
      userId: user.id,
      getListings: true,
      getOffers: true,
    });

    const cancelOfferOrders = response.data.orderIndexes.map((index: any) => ({ strategy: strategyFixedPriceContractId, nonce: index, isBuySide: true }));
    const cancelListingOrders = response.data.listingIndexes.map((index: any) => ({ strategy: strategyFixedPriceContractId, nonce: index, isBuySide: false }));

    const allOrders = cancelOfferOrders.concat(cancelListingOrders);

    if (allOrders.length === 0) {
      setIsFailed(true);

      return;
    }

    bulkCancelOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, allOrders)
      .then((res) => {
        if (res?.transactionResult.isStatusSuccess) {
          setApproved(true);
          // offerService
          //   .cancelAllOfferAndListings(params)
          //   .then(() => setApproved(true))
          //   .catch(() => setIsFailed(true));
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
          setStartTransaction(false);
        else setIsFailed(true);
      });
  }
  async handleCancelAllOffers({ user, wallet, setApproved, setStartTransaction, setIsFailed }: any) {
    const _provider = await this.getProvider();

    setContracts(contracts, _provider as any);
    const params = { userId: user.id };

    const response = await offerService.getAllOfferandListingIndexes({
      userId: user.id,
      getListings: true,
      getOffers: true,
    });

    const cancelOrders = response.data.orderIndexes.map((index: any) => ({ strategy: strategyFixedPriceContractId, nonce: index, isBuySide: true }));

    if (cancelOrders.length === 0) {
      setIsFailed(true);

      return;
    }

    bulkCancelOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, cancelOrders)
      .then((res) => {
        if (res?.transactionResult.isStatusSuccess) {
          setApproved(true);
          // offerService
          //   .cancelAllOffer(params)
          //   .then(() => setApproved(true))
          //   .catch(() => setIsFailed(true));
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
          setStartTransaction(false);
        else setIsFailed(true);
      });
  }
  async handleCancelAllListings({ wallet, user, setApproved, setIsFailed, setStartTransaction }: any) {
    const _provider = await this.getProvider();
    setContracts(contracts, _provider as any);
    const params = { userId: user.id };

    const response = await offerService.getAllOfferandListingIndexes({
      userId: user.id,
      getListings: true,
      getOffers: true,
    });

    const cancelOrders = response.data.listingIndexes.map((index: any) => ({ strategy: strategyFixedPriceContractId, nonce: index, isBuySide: false }));

    if (cancelOrders.length === 0) {
      setIsFailed(true);

      return;
    }

    bulkCancelOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, cancelOrders)
      .then((res) => {
        if (res?.transactionResult.isStatusSuccess) {
          setApproved(true);
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
          setStartTransaction(false);
        else setIsFailed(true);
      });
  }

  async handleConfirmListing({
    checkoutExpireTime,
    checkoutPrice,
    user,
    wallet,
    setStartTransaction,
    setIsFailed,
    selectedNFT,
    checkoutIsAuction,
    checkoutAuctionStartingPrice,
    setApproved,
    updateListing,
  }: any) {
    const _provider = await this.getProvider();
    const _baseAssetId = await this.getBaseAssetId();

    setContracts(contracts, _provider as any);

    if (checkoutIsAuction) {
      const res = await nftdetailsService.getLastIndex(2, user.id);
      const order = [
        {
          isBuySide: false,
          maker: user.walletAddress,
          collection: selectedNFT.collection.contractAddress,
          token_id: selectedNFT.tokenOrder,
          price: 1,
          amount: 1,
          nonce: res.data + 1,
          strategy: strategyAuctionContractId,
          payment_asset: _baseAssetId,
          expiration_range: formatTimeContract(checkoutExpireTime),
          extra_params: {
            extra_address_param: _baseAssetId,
            extra_contract_param: _baseAssetId,
            extra_u64_param: checkoutAuctionStartingPrice ? checkoutAuctionStartingPrice : 0,
          },
        },
      ];

      try {
        const bulkPlaceOrderRes = await bulkListing(exchangeContractId, FUEL_PROVIDER_URL, wallet, order);

        if (bulkPlaceOrderRes?.transactionResult.isStatusSuccess) {
          await nftdetailsService.tokenOnAuction(selectedNFT.id, formatTimeBackend(checkoutExpireTime), checkoutAuctionStartingPrice !== 0 ? checkoutAuctionStartingPrice : undefined);
          setApproved(true);
        }
      } catch (e) {
        handleTransactionError({ error: e, setStartTransaction, setIsFailed });
      }
    } else if (updateListing) {
      const res = await nftdetailsService.getTokensIndex([selectedNFT?.id]);
      const order = [
        {
          isBuySide: false,
          maker: user.walletAddress,
          collection: selectedNFT.collection.contractAddress,
          token_id: selectedNFT.tokenOrder,
          price: toGwei(checkoutPrice).toNumber(),
          amount: 1,
          nonce: res.data[selectedNFT?.id],
          strategy: strategyFixedPriceContractId,
          payment_asset: _baseAssetId,
          expiration_range: formatTimeContract(checkoutExpireTime),
          extra_params: { extra_address_param: _baseAssetId, extra_contract_param: _baseAssetId, extra_u64_param: 0 },
        },
      ];

      try {
        const bulkPlaceOrderRes = await bulkListing(exchangeContractId, FUEL_PROVIDER_URL, wallet, [], order);

        if (bulkPlaceOrderRes?.transactionResult.isStatusSuccess) {
          // await nftdetailsService.tokenUpdateListing([
          //   {
          //     tokenId: selectedNFT.id,
          //     price: checkoutPrice,
          //     expireTime: formatTimeBackend(checkoutExpireTime),
          //   },
          // ]);
          setApproved(true);
        }
      } catch (e) {
        handleTransactionError({ error: e, setStartTransaction, setIsFailed });
      }
    } else {
      const res = await nftdetailsService.getLastIndex(0, user.id);
      const order = [
        {
          isBuySide: false,
          maker: user.walletAddress,
          collection: selectedNFT.collection.contractAddress,
          token_id: selectedNFT.tokenOrder,
          price: toGwei(checkoutPrice).toNumber(),
          amount: 1,
          nonce: res.data + 1,
          strategy: strategyFixedPriceContractId,
          payment_asset: _baseAssetId,
          expiration_range: formatTimeContract(checkoutExpireTime),
          extra_params: { extra_address_param: _baseAssetId, extra_contract_param: _baseAssetId, extra_u64_param: 0 },
        },
      ];

      try {
        const bulkPlaceOrderRes = await bulkListing(exchangeContractId, FUEL_PROVIDER_URL, wallet, order);

        if (bulkPlaceOrderRes?.transactionResult.isStatusSuccess) {
          // await nftdetailsService.tokenList([
          //   {
          //     tokenId: selectedNFT.id,
          //     price: checkoutPrice,
          //     expireTime: formatTimeBackend(checkoutExpireTime),
          //   },
          // ]);
          setApproved(true);
        }
      } catch (e) {
        handleTransactionError({ error: e, setStartTransaction, setIsFailed });
      }
    }
  }

  async handleCheckout({ setApproved, buyNowItem, tokenIds, user, items, setSuccessCheckout, wallet, setIsFailed, setStartTransaction }: any) {
    const _provider = await this.getProvider();
    const _baseAssetId = await this.getBaseAssetId();

    setContracts(contracts, _provider as any);

    try {
      const res = await nftdetailsService.getTokensIndex(tokenIds);
      // Prepare orders for bulk purchase
      const takerOrders: TakerOrder[] = items.map((item: any) => ({
        isBuySide: true,
        taker: user.walletAddress,
        maker: item.userWalletAddress,
        nonce: res.data[item.id],
        price: toGwei(item.price).toNumber(),
        token_id: item.tokenOrder,
        collection: item.contractAddress,
        strategy: strategyFixedPriceContractId,
        extra_params: {
          extra_address_param: _baseAssetId,
          extra_contract_param: _baseAssetId,
          extra_u64_param: 0,
        },
      }));

      // Call bulkPurchase instead of individual purchases
      const { transactionResult } = await bulkPurchase(exchangeContractId, FUEL_PROVIDER_URL, wallet, takerOrders, _baseAssetId);

      if (transactionResult.isStatusSuccess) {
        setIsFailed(false);
        setApproved(true);
        window.dispatchEvent(new CustomEvent("CompleteCheckout"));
        window.dispatchEvent(new CustomEvent(EventDispatchFetchBalances));
      } else {
        setIsFailed(true);
      }
    } catch (error) {
      setStartTransaction(false);
      console.error("handleCheckout failed:", error);
      setIsFailed(true);
    }
  }

  async handleMakeOffer({ setApproved, selectedNFT, setBidBalanceUpdated, setCurrentBidBalance, checkoutPrice, checkoutExpireTime, user, wallet, setStartTransaction, setIsFailed }: any) {
    const _provider = await this.getProvider();
    const _baseAssetId = await this.getBaseAssetId();

    setContracts(contracts, _provider as any);

    nftdetailsService
      .getLastIndex(1, user.id)
      .then((res) => {
        const order = {
          isBuySide: true,
          maker: user.walletAddress,
          collection: selectedNFT.contractAddress ?? selectedNFT.collection.contractAddress,
          token_id: selectedNFT.tokenOrder,
          price: toGwei(checkoutPrice).toNumber(),
          amount: 1, //fixed
          nonce: res.data + 1,
          strategy: strategyFixedPriceContractId,
          payment_asset: _baseAssetId,
          expiration_range: formatTimeContract(checkoutExpireTime),
          extra_params: { extra_address_param: _baseAssetId, extra_contract_param: _baseAssetId, extra_u64_param: 0 }, // laim degilse null
        };

        userService
          .getBidBalance(user.id)
          .then((res) => {
            setCurrentBidBalance(res.data);
            const _currentBidBalance = res.data;
            if (_currentBidBalance < checkoutPrice) {
              const requiredBidAmount = (checkoutPrice - _currentBidBalance).toFixed(9);
              depositAndOffer(exchangeContractId, FUEL_PROVIDER_URL, wallet, order, toGwei(requiredBidAmount).toNumber(), _baseAssetId, false)
                .then((res) => {
                  if (res.transactionResult.isStatusSuccess) {
                    setBidBalanceUpdated(true);
                    setApproved(true);
                    window.dispatchEvent(new CustomEvent(EventDispatchFetchBalances));
                  }
                })
                .catch(async (e) => {
                  const response = await userService.getUserOfferByNonce({
                    walletAddress: user.walletAddress,
                    nonce: order.nonce,
                    tokenOrder: selectedNFT.tokenOrder,
                    contractAddress: selectedNFT.contractAddress,
                  });

                  if (response.data === true) {
                    setBidBalanceUpdated(true);
                    setApproved(true);
                  } else {
                    console.log(e);

                    if (
                      e.message.includes("Request cancelled without user response!") ||
                      e.message.includes("Error: User rejected the transaction!") ||
                      e.message.includes("An unexpected error occurred") ||
                      e.message.includes("User canceled sending transaction")
                    )
                      setStartTransaction(false);
                    else setIsFailed(true);
                  }
                });
            } else
              placeOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, order)
                .then((res) => {
                  if (res.transactionResult.isStatusSuccess) {
                    setApproved(true);
                  }
                })
                .catch(async (e) => {
                  const response = await userService.getUserOfferByNonce({
                    walletAddress: user.walletAddress,
                    nonce: order.nonce,
                    tokenOrder: selectedNFT.tokenOrder,
                    contractAddress: selectedNFT.contractAddress ?? selectedNFT.collection.contractAddress,
                  });

                  if (response.data === true) {
                    setApproved(true);
                  } else {
                    console.log(e);

                    if (
                      e.message.includes("Request cancelled without user response!") ||
                      e.message.includes("Error: User rejected the transaction!") ||
                      e.message.includes("An unexpected error occurred")
                    )
                      setStartTransaction(false);
                    else setIsFailed(true);
                  }
                });
          })
          .catch(() => setIsFailed(true));
      })
      .catch(() => setIsFailed(true));
  }
  async handlePlaceBid({ selectedNFT, checkoutPrice, user, wallet, setStartTransaction, setIsFailed, setCurrentBidBalance, setApproved, setBidBalanceUpdated }: any) {
    const _provider = await this.getProvider();
    const _baseAssetId = await this.getBaseAssetId();

    setContracts(contracts, _provider as any);

    nftdetailsService.getAuctionIndex([selectedNFT.id]).then((res) => {
      const order = {
        isBuySide: true,
        maker: user.walletAddress,
        collection: selectedNFT.collection.contractAddress,
        token_id: selectedNFT.tokenOrder,
        price: toGwei(checkoutPrice).toNumber(),
        amount: 1,
        nonce: res.data[selectedNFT.id], //Auction bid de sabit tutabilirmisiz
        strategy: strategyAuctionContractId,
        payment_asset: _baseAssetId,
        expiration_range: 1, // Bid de fixed verebiliriz - onemli degil
        extra_params: { extra_address_param: _baseAssetId, extra_contract_param: _baseAssetId, extra_u64_param: 0 }, // laim degilse null
      };

      userService.getBidBalance(user.id).then((res) => {
        setCurrentBidBalance(res.data);
        const _currentBidBalance = res.data;
        if (_currentBidBalance < checkoutPrice) {
          const requiredBidAmount = (checkoutPrice - _currentBidBalance).toFixed(9);
          depositAndOffer(exchangeContractId, FUEL_PROVIDER_URL, wallet, order, toGwei(requiredBidAmount).toNumber(), _baseAssetId, false)
            .then((res) => {
              if (res.transactionResult.isStatusSuccess) {
                nftdetailsService.tokenPlaceBid({ tokenId: selectedNFT.id, userId: user.id, price: checkoutPrice });
                // userService.updateBidBalance(user.id, Number(requiredBidAmount)).then(() => setBidBalanceUpdated(true));
                setBidBalanceUpdated(true);
                setApproved(true);
              }
            })
            .catch((e) => {
              console.log(e);
              if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
                setStartTransaction(false);
              else setIsFailed(true);
            });
        } else
          placeOrder(exchangeContractId, FUEL_PROVIDER_URL, wallet, order)
            .then((res) => {
              if (res.transactionResult.isStatusSuccess) {
                nftdetailsService.tokenPlaceBid({ tokenId: selectedNFT.id, userId: user.id, price: checkoutPrice });
                setApproved(true);
              }
            })
            .catch((e) => {
              console.log(e);
              if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
                setStartTransaction(false);
              else setIsFailed(true);
            });
      });
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
    const _provider = await this.getProvider();
    const address = userWalletAddress ? userWalletAddress : walletAddress;
    const _baseAssetId = await this.getBaseAssetId();
    const balance = await _provider?.getBalance(address, _baseAssetId);

    return balance?.toNumber() / 1000000000;
  }

  async getBidBalance({ user }: any): Promise<any> {
    const result = await userService.getBidBalance(user.id);

    return result.data;
  }

  async getProvider(): Promise<Provider> {
    const _provider = await Provider.create(FUEL_PROVIDER_URL);

    return _provider as Provider as any;
  }

  async walletConnect(activeConnector: any, type: FUEL_TYPE): Promise<any> {
    try {
      let _type = "";
      const provider = await this.provider;
      if (type === "fuelet") _type = "Fuelet Wallet";
      // else if (type === "fuel_walletconnect") _type = "Metamask";
      else _type = "Fuel Wallet";

      try {
        await provider?.selectConnector(_type);
      } catch (error) {
        return;
      }

      const connect = await provider?.connect();
      if (!connect) {
        throw new Error("Not Connected");
      }

      const fuelAddress = await this.getAccounts();
      if (!fuelAddress) {
        throw new Error("Not Found Address");
      }

      const wallet = await provider?.getWallet(fuelAddress);
      if (!wallet) {
        throw new Error("Not Found Wallet");
      }

      const user = await userService.userCreate({ walletAddress: wallet.address });
      localStore.setItem("connected_account", user.data);

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
