import { AssetEmptyCart } from "assets";
import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import { IconArrowRight, IconEthereum } from "icons";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { clearCart, getCartTotal } from "store/cartSlice";

export interface MyCartProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowCheckoutModal: Dispatch<SetStateAction<boolean>>;
}
const MyCart = ({ showModal, setShowModal, setShowCheckoutModal }: MyCartProps) => {
  const { totalAmount, itemCount, items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  const footer = (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex w-full px-5 py-2 justify-between border-y border-gray">
        <span className="text-head6 font-spaceGrotesk text-gray-light">Total</span>
        <span className="flex items-center text-white">
          {totalAmount} <IconEthereum color="rgb(131,131,131)" />
        </span>
      </div>
      <div className="flex w-full p-5">
        <Button
          className="w-full"
          onClick={() => {
            setShowModal(false);
            setShowCheckoutModal(true);
          }}
        >
          PROCEED TO CHECKOUT <IconArrowRight />
        </Button>
      </div>
    </div>
  );

  return (
    <Modal className="cart" title="My Cart" onClose={() => setShowModal(false)} show={showModal} footer={items.length !== 0 ? footer : undefined}>
      <div className="flex flex-col h-full px-5 pt-5">
        {items.length !== 0 ? (
          <>
            <div className="flex justify-between items-center pb-5">
              <span className="text-headlineMd font-bigShoulderDisplay text-white">{itemCount} ITEMS</span>
              <button className="text-headlineSm font-bigShoulderDisplay text-gray-light" onClick={() => dispatch(clearCart())}>
                CLEAR ALL
              </button>
            </div>
            <div className="flex flex-col h-[calc(100vh-265px)] gap-2 overflow-y-scroll no-scrollbar ">
              {items.map((i, index) => (
                <CartItem key={index} text="Price" name={i.name} price={i.price} image={i.image} id={i.id}></CartItem>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <img src={AssetEmptyCart}></img>
            <span className="text-bodyLg font-spaceGrotesk text-gray-light w-[320px] text-center">Your cart is empty. Start adding NFTs to your cart to collect.</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MyCart;
