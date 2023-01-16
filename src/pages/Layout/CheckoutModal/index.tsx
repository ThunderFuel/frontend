import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import Checkout from "./Checkout";
import InsufficientFund from "./InsufficientFund";
import { toggleCheckoutModal } from "store/checkoutSlice";

const Index = () => {
  const dispatch = useAppDispatch();
  const { show, isInsufficientBalance } = useAppSelector((state) => state.checkout);
  const onClose = () => {
    dispatch(toggleCheckoutModal());
  };

  return !isInsufficientBalance ? <InsufficientFund show={show} onClose={onClose} /> : <Checkout show={show} onClose={onClose} />;
};

export default Index;
