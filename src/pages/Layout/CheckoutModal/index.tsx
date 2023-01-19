import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import Checkout from "./Checkout";
import InsufficientFund from "./InsufficientFund";
import { toggleCheckoutModal } from "store/checkoutSlice";
import BidCheckout from "./BidCheckout";

const Index = () => {
  const dispatch = useAppDispatch();
  const { show, isInsufficientBalance, checkoutType } = useAppSelector((state) => state.checkout);
  const onClose = () => {
    dispatch(toggleCheckoutModal());
  };

  if (checkoutType === "PlaceBid") return <BidCheckout show={show} onClose={onClose} />;
  if (checkoutType === "MakeOffer") return <BidCheckout show={show} onClose={onClose} />;

  return isInsufficientBalance ? <InsufficientFund show={show} onClose={onClose} /> : <Checkout show={show} onClose={onClose} />;
};

export default Index;
