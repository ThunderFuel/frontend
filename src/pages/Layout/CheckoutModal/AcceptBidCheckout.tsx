import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import offerService from "api/offer/offer.service";
import { executeOrder } from "thunder-sdk/src/contracts/thunder_exchange";
import { exchangeContractId, provider } from "global-constants";
import { toGwei } from "utils";
import userService from "api/user/user.service";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import FuelProvider from "providers/FuelProvider";

const checkoutProcessTexts = {
  title1: "Confirm bid",
  description1: "Proceed in your wallet and confirm accepting bid.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your NFT sold!",
  description3: "Congrats, your NFT succesfully sold.",
};

const Footer = ({ approved, onClose }: { approved: boolean; onClose: any }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
      <div className={"flex w-full items-center justify-center p-5"}>
        <Button className="w-full tracking-widest" onClick={onClose}>
          DONE
        </Button>
      </div>
    </div>
  );
};

const AcceptBidCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { checkoutPrice, currentItem } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const onComplete = async () => {
    const fuel = new FuelProvider();
    const _baseAssetId = await fuel.getBaseAssetId();

    nftdetailsService.getAuctionIndex([selectedNFT?.id]).then(async (res) => {
      const order = {
        isBuySide: false,
        taker: user.walletAddress,
        maker: selectedNFT.highestBid.walletAddress, //OMER ABI
        nonce: res.data[selectedNFT?.id],
        price: toGwei(checkoutPrice).toNumber(),
        collection: selectedNFT.collection.contractAddress,
        token_id: selectedNFT.tokenOrder,
        strategy: "", //TODO strategyid vardi ama kaldirildi auction
        extra_params: { extra_address_param: _baseAssetId, extra_contract_param: _baseAssetId, extra_u64_param: 0 }, // lazim degilse null
      };

      executeOrder(exchangeContractId, provider, wallet, order, _baseAssetId)
        .then((res) => {
          if (res.transactionResult.isStatusSuccess) {
            offerService.acceptOffer({ id: currentItem?.id });
            userService.updateBidBalance(selectedNFT?.bestOffer?.makerUserId, -checkoutPrice);
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

  const viewOnBlockchain = approved && <button className="body-small text-gray-light underline"></button>;

  return (
    <Modal backdropDisabled={true} className="checkout" title="Accept Bid" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
      <div className="flex flex-col p-5">
        <CartItem text={"Bid"} name={selectedNFT.name ?? selectedNFT.tokenOrder} image={selectedNFT.image} price={+checkoutPrice} id={0} titleSlot={viewOnBlockchain}></CartItem>
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default AcceptBidCheckout;
