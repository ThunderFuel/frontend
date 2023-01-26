import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import Checkout from "./Checkout";
import InsufficientFund from "./InsufficientFund";
import { CheckoutType, toggleCheckoutModal } from "store/checkoutSlice";
import BidCheckout from "./BidCheckout";
import MakeOfferCheckout from "./MakeOfferCheckout";
import CancelOfferCheckout from "./CancelOfferCheckout";
import UpdateOfferCheckout from "./UpdateOfferCheckout";
import ConfirmListingCheckout from "./ConfirmListingCheckout";
import AcceptOfferCheckout from "./AcceptOfferCheckout";
import CancelAuctionCheckout from "./CancelAuctionCheckout";
import CancelBid from "./CancelBid";
import TransferCheckout from "./TransferCheckout";

const Index = () => {
  const dispatch = useAppDispatch();
  const { show, isInsufficientBalance, checkoutType } = useAppSelector((state) => state.checkout);
  const onClose = () => {
    dispatch(toggleCheckoutModal());
  };

  switch (checkoutType) {
    case CheckoutType.MakeOffer:
      return <MakeOfferCheckout show={show} onClose={onClose} />;
    case CheckoutType.PlaceBid:
      return <BidCheckout show={show} onClose={onClose} />; //cart item-checkoutanimation-bid balance uyari
    //
    case CheckoutType.CancelOffer:
      return <CancelOfferCheckout show={show} onClose={onClose} />;
    case CheckoutType.UpdateOffer:
      return <UpdateOfferCheckout show={show} onClose={onClose} />;
    case CheckoutType.AcceptOffer:
      return <AcceptOfferCheckout show={show} onClose={onClose} />;
    case CheckoutType.ConfirmListing:
      return <ConfirmListingCheckout show={show} onClose={onClose} />;
    //todo accept bid
    case CheckoutType.Transfer:
      return <TransferCheckout show={show} onClose={onClose} />;
    //
    case CheckoutType.CancelAuction:
      return <CancelAuctionCheckout show={show} onClose={onClose} />; //DESIGNDA YOK!
    case CheckoutType.CancelBid:
      return <CancelBid show={show} onClose={onClose} />; //DESIGNDA YOK!
    default:
      return isInsufficientBalance ? <InsufficientFund show={show} onClose={onClose} /> : <Checkout show={show} onClose={onClose} />;
  }
};

export default Index;
