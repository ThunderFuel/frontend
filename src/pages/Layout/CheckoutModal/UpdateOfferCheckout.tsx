import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";

import { NativeAssetId, Provider } from "fuels";
import { strategyFixedPriceContractId, provider, ZERO_B256, contracts, exchangeContractId } from "global-constants";
import { toGwei } from "utils";
import { depositAndPlaceOrder, placeOrder, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import offerService from "api/offer/offer.service";
import userService from "api/user/user.service";

const checkoutProcessTexts = {
  title1: "Confirm your offer",
  description1: "Proceed in your wallet and confirm your offer",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your offer submitted!",
  description3: "Your offer succesfully submitted.",
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

const UpdateOfferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { checkoutPrice, currentItem, checkoutExpireTime } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);

  const onComplete = () => {
    offerService.getOffersIndex([selectedNFT?.bestOffer?.id]).then((res) => {
      const order = {
        isBuySide: true,
        maker: user.walletAddress,
        collection: selectedNFT.collection.contractAddress,
        token_id: selectedNFT.tokenOrder,
        price: toGwei(checkoutPrice),
        amount: 1, //fixed
        nonce: res.data[selectedNFT?.bestOffer?.id],
        strategy: strategyFixedPriceContractId,
        payment_asset: NativeAssetId,
        expiration_range: Math.floor(checkoutExpireTime / 1000), // saniye olacak
        extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
      };
      console.log(order);

      const prov = new Provider("https://beta-3.fuel.network/graphql");
      setContracts(contracts, prov);

      userService.getBidBalance(user.id).then((res) => {
        const currentBidBalance = res.data;
        if (currentBidBalance < checkoutPrice) {
          const requiredBidAmount = checkoutPrice - currentBidBalance;
          depositAndPlaceOrder(exchangeContractId, provider, wallet, order, toGwei(requiredBidAmount), NativeAssetId)
            .then((res) => {
              console.log(res);
              if (res.transactionResult.status.type === "success") {
                nftdetailsService.tokenUpdateOffer({ id: currentItem?.id, price: checkoutPrice, expireTime: checkoutExpireTime });
                userService.updateBidBalance(user.id, checkoutPrice);
                setApproved(true);
              }
            })
            .catch(() => setStartTransaction(false));
        } else
          placeOrder(exchangeContractId, provider, wallet, order)
            .then((res) => {
              console.log(res);
              if (res.transactionResult.status.type === "success") {
                nftdetailsService.tokenUpdateOffer({ id: currentItem?.id, price: checkoutPrice, expireTime: checkoutExpireTime });
                setApproved(true);
              }
            })
            .catch(() => setStartTransaction(false));
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
        <CheckoutProcess onComplete={onComplete} data={checkoutProcessTexts} approved={approved} />
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

  return (
    <Modal backdropDisabled={true} className="checkout" title="Update Your Offer" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
      <div className="flex flex-col p-5">
        <CartItem text={"Your Offer"} name={selectedNFT?.name} image={selectedNFT?.image} price={checkoutPrice} id={0}></CartItem>
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default UpdateOfferCheckout;
