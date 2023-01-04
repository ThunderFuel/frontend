import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconTrash } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { removeAll } from "store/cartSlice";
import { toggleCheckoutModal } from "store/checkoutSlice";

const CollectionFooter = () => {
  const dispatch = useAppDispatch();
  const selectedCartItemCount = useAppSelector((state) => state.cart.itemCount);
  const selectedCartTotalAmount = useAppSelector((state) => state.cart.totalAmount);

  if (selectedCartItemCount <= 0) {
    return null;
  }

  return (
    <div className="sticky bottom-0 py-3 flex gap-3 items-center justify-end border-t border-t-gray bg-bg z-20">
      <Button
        className="btn-secondary uppercase"
        onClick={() => {
          dispatch(removeAll());
        }}
      >
        Clear {selectedCartItemCount} ıtem
        <IconTrash />
      </Button>
      <Button
        className="uppercase"
        onClick={() => {
          dispatch(toggleCheckoutModal());
        }}
      >
        buy {selectedCartItemCount} ıtem - ${selectedCartTotalAmount} eth
        <IconArrowRight />
      </Button>
    </div>
  );
};

export default CollectionFooter;
