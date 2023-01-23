import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import Checkout from "./Checkout";
import InsufficientFund from "./InsufficientFund";
import { toggleCheckoutModal } from "store/checkoutSlice";
import BidCheckout from "./BidCheckout";
import MakeOfferCheckout from "./MakeOfferCheckout";
import CancelOfferCheckout from "./CancelOfferCheckout";
import UpdateOfferCheckout from "./UpdateOfferCheckout";
import ConfirmListingCheckout from "./ConfirmListingCheckout";
import AcceptOfferCheckout from "./AcceptOfferCheckout";
import CancelAuctionCheckout from "./CancelAuctionCheckout";
import CancelBid from "./CancelBid";

const Index = () => {
  const dispatch = useAppDispatch();
  const { show, isInsufficientBalance, checkoutType } = useAppSelector((state) => state.checkout);
  const onClose = () => {
    dispatch(toggleCheckoutModal());
  };

  //TODO BUNLARDAN BIRBIRINE COK BENZEYENLERI TEK COMPONENT YAP
  if (checkoutType === "PlaceBid") return <BidCheckout show={show} onClose={onClose} />;
  if (checkoutType === "MakeOffer") return <MakeOfferCheckout show={show} onClose={onClose} />;
  if (checkoutType === "CancelOffer") return <CancelOfferCheckout show={show} onClose={onClose} />;
  if (checkoutType === "UpdateOffer") return <UpdateOfferCheckout show={show} onClose={onClose} />;
  if (checkoutType === "ConfirmListing") return <ConfirmListingCheckout show={show} onClose={onClose} />;
  if (checkoutType === "AcceptOffer") return <AcceptOfferCheckout show={show} onClose={onClose} />;
  if (checkoutType === "CancelAuction") return <CancelAuctionCheckout show={show} onClose={onClose} />;
  if (checkoutType === "CancelBid") return <CancelBid show={show} onClose={onClose} />;

  return isInsufficientBalance ? <InsufficientFund show={show} onClose={onClose} /> : <Checkout show={show} onClose={onClose} />;
};

export default Index;
