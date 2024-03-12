import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconShoppingCart, IconTrash } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { removeAll } from "store/cartSlice";
import { CheckoutType, setCheckout, setIsInsufficientBalance, toggleCheckoutModal } from "store/checkoutSlice";
import { useWallet } from "hooks/useWallet";
import { toggleWalletModal } from "store/walletSlice";

const CollectionFooter = () => {
  const { hasEnoughFunds } = useWallet();
  const dispatch = useAppDispatch();
  const selectedCartItemCount = useAppSelector((state) => state.cart.itemCount);
  const selectedCartTotalAmount = useAppSelector((state) => state.cart.totalAmount);
  const { isConnected } = useAppSelector((state) => state.wallet);

  if (selectedCartItemCount <= 0) {
    return null;
  }

  const onToggleCheckoutModal = async () => {
    if (!isConnected) {
      dispatch(toggleWalletModal());
    } else
      hasEnoughFunds().then((res: any) => {
        dispatch(setIsInsufficientBalance(!res));
        dispatch(
          setCheckout({
            type: CheckoutType.Standard,
            onCheckoutComplete: () => window.dispatchEvent(new CustomEvent("CompleteCheckout")),
          })
        );
        dispatch(toggleCheckoutModal());
      });
  };

  return (
    <div className="sticky border-t border-t-gray bg-bg z-20 bottom-0">
      <div className="flex items-center justify-between py-3 px-5 lg:px-0">
        <div className="flex gap-2 text-headline-02 text-gray-light">
          <IconShoppingCart />
          <span className="hidden lg:flex">YOUR CART</span>
        </div>
        <div className="flex gap-3">
          <Button
            className="btn-secondary uppercase px-4"
            onClick={() => {
              dispatch(removeAll());
            }}
          >
            <span className="hidden lg:flex">
              Clear {selectedCartItemCount} {selectedCartItemCount <= 1 ? "ıtem" : "ıtems"}
            </span>
            <IconTrash />
          </Button>
          <Button className="uppercase" onClick={onToggleCheckoutModal}>
            buy {selectedCartItemCount} {selectedCartItemCount <= 1 ? "ıtem" : "ıtems"} - {selectedCartTotalAmount} eth
            <IconArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionFooter;
