import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";

import { Provider } from "fuels";
import { strategyFixedPriceContractId, provider, contracts, exchangeContractId } from "global-constants";
import { cancelAllOrders, cancelOrder, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import offerService from "api/offer/offer.service";
import { CheckoutCartItems } from "./Checkout";
import { useDispatch } from "react-redux";
import { removeCancelOfferItems } from "store/checkoutSlice";

const checkoutProcessTexts = {
  title1: "Confirm cancelling your offer",
  description1: "Proceed in your wallet and confirm cancelling offer",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your offer is canceled!",
  description3: "Your offer succesfully canceled.",
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

const CancelOfferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const dispatch = useDispatch();
  const { currentItem, cancelOfferItems, onCheckoutComplete } = useAppSelector((state) => state.checkout);
  const { wallet, user } = useAppSelector((state) => state.wallet);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);

  const onComplete = () => {
    const prov = new Provider("https://beta-3.fuel.network/graphql");
    setContracts(contracts, prov);
    if (cancelOfferItems?.length > 0) {
      cancelAllOrders(exchangeContractId, provider, wallet, strategyFixedPriceContractId)
        .then((res) => {
          console.log(res);
          if (res.transactionResult.status.type === "success") {
            offerService.cancelAllOffer({ userId: user.id }).then(() => onCheckoutComplete());
            dispatch(removeCancelOfferItems());
            setApproved(true);
          }
        })
        .catch((e) => {
          console.log(e);
          setStartTransaction(false);
        });
    } else {
      offerService.getOffersIndex([currentItem.id]).then((res) => {
        cancelOrder(exchangeContractId, provider, wallet, strategyFixedPriceContractId, res.data[currentItem.id], true)
          .then((res) => {
            console.log(res);
            if (res.transactionResult.status.type === "success") {
              nftdetailsService.cancelOffer(currentItem.id).then(() => onCheckoutComplete());
              setApproved(true);
            }
          })
          .catch((e) => {
            console.log(e);
            setStartTransaction(false);
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
    <Modal
      backdropDisabled={true}
      className="checkout"
      title={cancelOfferItems?.length > 0 ? "Cancel All Offers" : "Cancel Your Offer"}
      show={show}
      onClose={onClose}
      footer={<Footer approved={approved} onClose={onClose} />}
    >
      <div className="flex flex-col p-5">
        {cancelOfferItems?.length > 0 ? (
          <CheckoutCartItems items={cancelOfferItems} itemCount={cancelOfferItems.length} totalAmount={""} approved={approved}></CheckoutCartItems>
        ) : (
          <CartItem text={"Your Offer"} name={currentItem.tokenName} image={currentItem.tokenImage} price={currentItem.price} id={0}></CartItem>
        )}{" "}
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default CancelOfferCheckout;
