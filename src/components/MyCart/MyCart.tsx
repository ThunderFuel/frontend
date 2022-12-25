import { AssetEmptyCart, AssetTableImageNft1 } from "assets";
import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import { IconArrowRight, IconEthereum } from "icons";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

export interface MyCartProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowCheckoutModal: Dispatch<SetStateAction<boolean>>;
}
const MyCart = ({ showModal, setShowModal, setShowCheckoutModal }: MyCartProps) => {
  const [totalCost, setTotalCost] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const mockData = [
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 1,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 2,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 3,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 4,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 5,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 6,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 7,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 8,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 9,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 10,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 11,
    },
  ];

  const [cartData, setCartData] = useState(mockData);

  useEffect(() => {
    let temp = 0;
    cartData.forEach((i) => (temp += i.price));
    setTotalCost(temp);
    setItemCount(cartData.length);
  }, [cartData]);

  const removeItem = (id: number) => {
    const filtered = cartData.filter(function (i) {
      return i.id !== id;
    });
    setCartData(filtered);
  };

  const footer = (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex w-full px-5 py-2 justify-between border-y border-gray">
        <span className="text-head6 font-spaceGrotesk text-gray-light">Total</span>
        <span className="flex items-center text-white">
          {totalCost} <IconEthereum color="rgb(131,131,131)" />
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
    <Modal show={showModal} className="cart" title="My Cart" onClose={() => setShowModal(false)} footer={cartData.length !== 0 ? footer : undefined}>
      <div className="flex flex-col h-full px-5 pt-5">
        {cartData.length !== 0 ? (
          <>
            <div className="flex justify-between items-center pb-5">
              <span className="text-headlineMd font-bigShoulderDisplay text-white">{itemCount} ITEMS</span>
              <button className="text-headlineSm font-bigShoulderDisplay text-gray-light" onClick={() => setCartData([])}>
                CLEAR ALL
              </button>
            </div>
            <div className="flex flex-col h-[calc(100vh-265px)] gap-2 overflow-y-scroll no-scrollbar ">
              {cartData.map((i, index) => (
                <CartItem key={index} text="Price" name={i.name} price={i.price} image={i.image} id={i.id} removeItem={removeItem}></CartItem>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <img src={AssetEmptyCart} alt="" />
            <span className="text-bodyLg font-spaceGrotesk text-gray-light w-[320px] text-center">Your cart is empty. Start adding NFTs to your cart to collect.</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MyCart;
