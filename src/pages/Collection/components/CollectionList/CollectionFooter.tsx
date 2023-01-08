import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconTrash } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { removeAll } from "store/cartSlice";
import { toggleCheckoutModal } from "store/checkoutSlice";
import { useWallet } from "../../../../hooks/useWallet";

const CollectionFooter = () => {
  const { getBalance } = useWallet();
  const dispatch = useAppDispatch();
  const selectedCartItemCount = useAppSelector((state) => state.cart.itemCount);
  const selectedCartTotalAmount = useAppSelector((state) => state.cart.totalAmount);

  if (selectedCartItemCount <= 0) {
    return null;
  }

  const onToggleCheckoutModal = async () => {
    await getBalance();
    dispatch(toggleCheckoutModal());
  };

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
      <Button className="uppercase" onClick={onToggleCheckoutModal}>
        buy {selectedCartItemCount} ıtem - ${selectedCartTotalAmount} eth
        <IconArrowRight />
      </Button>
    </div>
  );
};

export default CollectionFooter;
