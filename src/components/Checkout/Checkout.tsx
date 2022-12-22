import { AssetEmptyCart, AssetTableImageNft1 } from "assets";
import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import { IconDone, IconMilestone, IconSpinner, IconWarning } from "icons";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

export interface MyCartProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
const Checkout = ({ showModal, setShowModal }: MyCartProps) => {
  const [totalCost, setTotalCost] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const mockData = [
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
      id: 20,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 30,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 40,
    },
    {
      name: "Genuine Undead #1289",
      image: AssetTableImageNft1,
      price: 10,
      id: 50,
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
  const [showDetails, setShowDetails] = useState(false);

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

  const getMultipleImages = () => {
    return cartData.slice(0, itemCount > 3 ? 3 : itemCount).map((i) => i.image);
  };

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [waitTransactionConfirm, setWaitTransactionConfirm] = useState(false);
  const [transactionConfirmed, setTransactionConfirmed] = useState(true);
  const [approved, setApproved] = useState(true);
  const [partiallyFailed, setPartiallyFailed] = useState(true);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const footer = (
    <div className="flex flex-col w-full h-full items-center">
      {transactionConfirmed || waitTransactionConfirm ? (
        <div className="flex flex-col w-full ">
          <div className=" flex flex-col p-5 gap-y-[25px] border-y border-gray">
            <div className="flex items-center gap-x-[22px]">
              {waitTransactionConfirm ? <IconSpinner /> : <IconDone />}
              <div className="flex flex-col">
                <span className="flex text-head5 font-spaceGrotesk text-white">Confirm transaction</span>
                {waitTransactionConfirm ? (
                  <span className="flex text-bodyMd font-spaceGrotesk text-gray-light">
                    Proceed in your wallet and confirm transaction
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex items-center gap-x-[22px]">
              {approved ? <IconDone /> : transactionConfirmed ? <IconSpinner /> : <IconMilestone stroke="#838383" />}
              <div className="flex flex-col">
                <span className="flex text-head5 font-spaceGrotesk text-white">Wait for approval</span>
                {transactionConfirmed !== approved ? (
                  <span className="flex text-bodyMd font-spaceGrotesk text-gray-light">
                    Waiting for transaction to be approved
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex items-center gap-x-[22px]">
              {approved ? <IconDone /> : <IconMilestone stroke="#838383" />}
              <div className="flex flex-col">
                <span className="flex text-head5 font-spaceGrotesk text-white">
                  Purchase {partiallyFailed && "partially"} completed!
                </span>
                {approved ? (
                  <span className="flex text-bodyMd font-spaceGrotesk text-gray-light">
                    Congrats your purchase is {partiallyFailed && "partially"} completed.
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {partiallyFailed && (
              <div className="flex justify-center gap-x-2 p-[10px] border bg-bg-light border-gray rounded-[5px]">
                <div className="flex">
                  <IconWarning fill="red" />
                </div>
                <div className="flex flex-col">
                  <span className="text-head6 font-spaceGrotesk text-white">1 item failed</span>
                  <span className="text-bodySm font-spaceGrotesk text-gray-light">
                    Purchases can fail due to network issues, gas fee increases, or because someone else bought the item
                    before you.
                  </span>
                </div>
              </div>
            )}
          </div>
          {approved ? (
            <div className="flex items-center justify-center p-5">
              <Button className="w-full tracking-widest">VIEW PURCHASE</Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="flex flex-col w-full border-t border-gray">
          <div className="flex w-full items-center gap-x-5 p-5 border-b border-gray">
            <IconWarning fill="red" />
            <span className="text-head5 font-spaceGrotesk text-white">You rejected the request in your wallet! </span>
          </div>
          <Button className="btn-secondary m-5">CLOSE</Button>
        </div>
      )}
    </div>
  );

  return (
    <Modal
      show={showModal}
      onClose={() => setShowModal(false)}
      className="checkout"
      title="Checkout"
      footer={cartData.length !== 0 ? footer : undefined}
    >
      <div className="flex flex-col h-full p-5">
        {cartData.length !== 0 ? (
          <>
            <div className="flex flex-col gap-2 overflow-y-scroll no-scrollbar ">
              <CartItem
                key={"checkoutCartItem"}
                text="Total"
                name={itemCount + " Items"}
                price={totalCost}
                image={mockData[0].image}
                id={1}
                removeItem={removeItem}
                checkoutMultipleImages={getMultipleImages()}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                className={showDetails ? "rounded-b-none" : " "}
              ></CartItem>
            </div>
            {showDetails && (
              <div className="flex flex-col min-h-fit max-h-[500px] overflow-y-scroll no-scrollbar p-[10px] gap-y-[10px] w-full border-x border-b rounded-b-md border-gray">
                {cartData.map((i, index) => (
                  <CartItem
                    key={index}
                    text="Price"
                    name={i.name}
                    price={i.price}
                    image={i.image}
                    id={i.id}
                    removeItem={removeItem}
                  ></CartItem>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <img src={AssetEmptyCart}></img>
            <span className="text-bodyLg font-spaceGrotesk text-gray-light w-[320px] text-center">
              Your cart is empty. Start adding NFTs to your cart to collect.
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default Checkout;
