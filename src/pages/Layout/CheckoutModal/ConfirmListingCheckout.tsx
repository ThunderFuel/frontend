import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { bulkPlaceOrder, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { ZERO_B256, contracts, exchangeContractId, provider, strategyAuctionContractId, strategyFixedPriceContractId, transferManagerContractId } from "global-constants";
import { formatTimeBackend, formatTimeContract, toGwei } from "utils";
import { NativeAssetId, Provider } from "fuels";

const checkoutProcessTexts = {
  title1: "Confirm your listing",
  description1: "Proceed in your wallet and confirm the listing.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your NFT listed!",
  description3: "Congrats, your NFT succesfully listed.",
};

const Footer = ({ approved, onClose }: { approved: boolean; onClose: any }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
      <div className={"flex w-full items-center justify-center p-5"}>
        <Button className="w-full tracking-widest" onClick={() => onClose()}>
          DONE
        </Button>
      </div>
    </div>
  );
};

const ConfirmListingCheckout = ({ show, onClose, updateListing }: { show: boolean; onClose: any; updateListing?: boolean }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { checkoutPrice, checkoutIsAuction, checkoutAuctionStartingPrice, checkoutExpireTime } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const onComplete = () => {
    if (checkoutIsAuction) {
      nftdetailsService.getLastIndex(2, user.id).then((res) => {
        const order = [
          {
            isBuySide: false,
            maker: user.walletAddress,
            collection: selectedNFT.collection.contractAddress,
            token_id: selectedNFT.tokenOrder,
            price: 1, // auction icin onemsiz
            amount: 1, // fixed
            nonce: res.data + 1,
            strategy: strategyAuctionContractId,
            payment_asset: NativeAssetId,
            expiration_range: formatTimeContract(checkoutExpireTime),
            extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: checkoutAuctionStartingPrice ? checkoutAuctionStartingPrice : 0 }, // laim degilse null
          },
        ];

        const prov = new Provider("https://beta-3.fuel.network/graphql");
        setContracts(contracts, prov);
        console.log(order);
        bulkPlaceOrder(exchangeContractId, provider, wallet, transferManagerContractId, order)
          .then((res) => {
            console.log(res);
            if (res.transactionResult.status.type === "success") {
              nftdetailsService.tokenOnAuction(selectedNFT.id, formatTimeBackend(checkoutExpireTime), checkoutAuctionStartingPrice !== 0 ? checkoutAuctionStartingPrice : undefined);
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
    } else if (updateListing) {
      nftdetailsService.getTokensIndex([selectedNFT?.id]).then((res) => {
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
            payment_asset: NativeAssetId,
            expiration_range: formatTimeContract(checkoutExpireTime),
            extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
          },
        ];

        const prov = new Provider("https://beta-3.fuel.network/graphql");
        setContracts(contracts, prov);
        console.log(order);
        bulkPlaceOrder(exchangeContractId, provider, wallet, transferManagerContractId, order)
          .then((res) => {
            console.log(res);
            if (res.transactionResult.status.type === "success") {
              nftdetailsService.tokenUpdateListing([{ tokenId: selectedNFT.id, price: checkoutPrice, expireTime: formatTimeBackend(checkoutExpireTime) }]);
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
    } else {
      nftdetailsService.getLastIndex(0, user.id).then((res) => {
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
            payment_asset: NativeAssetId,
            expiration_range: formatTimeContract(checkoutExpireTime),
            extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
          },
        ];

        const prov = new Provider("https://beta-3.fuel.network/graphql");
        setContracts(contracts, prov);
        console.log(order);
        bulkPlaceOrder(exchangeContractId, provider, wallet, transferManagerContractId, order)
          .then((res) => {
            console.log(res);
            if (res.transactionResult.status.type === "success") {
              nftdetailsService.tokenList([{ tokenId: selectedNFT.id, price: checkoutPrice, expireTime: formatTimeBackend(checkoutExpireTime) }]);
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
  };

  React.useEffect(() => {
    setApproved(false);
    setStartTransaction(false);
    if (show) {
      setStartTransaction(true);
    }
  }, [show]);

  const checkoutProcess = (
    <div className="flex flex-col w-full items-center">
      {startTransaction ? (
        <>
          <CheckoutProcess onComplete={onComplete} data={checkoutProcessTexts} approved={approved} failed={isFailed} />
          {isFailed && (
            <div className="flex flex-col w-full border-t border-gray">
              <Button className="btn-secondary m-5" onClick={onClose}>
                CLOSE
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col w-full border-t border-gray">
          <div className="flex w-full items-center gap-x-5 p-5 border-b border-gray">
            <IconWarning className="text-red" />
            <span className="text-h5 text-white">You rejected the request in your wallet!</span>
          </div>
          <Button className="btn-secondary m-5" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      )}
    </div>
  );

  const viewOnBlockchain = <button className="body-small text-gray-light underline"></button>;

  return (
    <Modal
      backdropDisabled={true}
      className="checkout"
      title={updateListing ? "Update Listing" : "Complete Listing"}
      show={show}
      onClose={onClose}
      footer={<Footer approved={approved} onClose={onClose} />}
    >
      <div className="flex flex-col p-5">
        {checkoutIsAuction ? (
          checkoutAuctionStartingPrice ? (
            <CartItem text={"Starting Price"} name={selectedNFT.name} image={selectedNFT.image} price={checkoutAuctionStartingPrice} id={0} titleSlot={viewOnBlockchain}></CartItem>
          ) : (
            <CartItem text={"Starting Price"} name={selectedNFT.name} image={selectedNFT.image} price={0} id={0} titleSlot={viewOnBlockchain}></CartItem>
          )
        ) : (
          <CartItem text={"Price"} name={selectedNFT.name} image={selectedNFT.image} price={checkoutPrice} id={0} titleSlot={viewOnBlockchain}></CartItem>
        )}
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default ConfirmListingCheckout;
