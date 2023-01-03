/* eslint-disable @typescript-eslint/no-unused-vars */
import { AssetEmptyCart, AssetTableImageNft1 } from "assets";
import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import { IconDone, IconMilestone, IconSpinner, IconWarning } from "icons";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { getCartTotal } from "store/cartSlice";

export interface MyCartProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
const Checkout = ({ showModal, setShowModal }: MyCartProps) => {
  const { totalAmount, itemCount, items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  const getMultipleImages = () => {
    return items.slice(0, itemCount > 3 ? 3 : itemCount).map((i) => i.image);
  };

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [waitTransactionConfirm, setWaitTransactionConfirm] = useState(false);
  const [transactionConfirmed, setTransactionConfirmed] = useState(true);
  const [approved, setApproved] = useState(true);
  const [partiallyFailed, setPartiallyFailed] = useState(false);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const footer = (
    <div className="flex w-full items-center justify-center p-5">
      <Button className="w-full tracking-widest">VIEW PURCHASE</Button>
    </div>
  );

  const checkoutProcess = (
    <div className="flex flex-col w-full items-center">
      {transactionConfirmed || waitTransactionConfirm ? (
        <div className="flex flex-col w-full ">
          <div className=" flex flex-col p-5 gap-y-[25px]  border-gray">
            <div className="flex items-center gap-x-[22px]">
              {waitTransactionConfirm ? <IconSpinner /> : <IconDone />}
              <div className="flex flex-col">
                <span className="flex text-head5 font-spaceGrotesk text-white">Confirm transaction</span>
                {waitTransactionConfirm ? <span className="flex text-bodyMd font-spaceGrotesk text-gray-light">Proceed in your wallet and confirm transaction</span> : <></>}
              </div>
            </div>
            <div className="flex items-center gap-x-[22px]">
              {approved ? <IconDone /> : transactionConfirmed ? <IconSpinner /> : <IconMilestone stroke="#838383" />}
              <div className="flex flex-col">
                <span className="flex text-head5 font-spaceGrotesk text-white">Wait for approval</span>
                {transactionConfirmed !== approved ? <span className="flex text-bodyMd font-spaceGrotesk text-gray-light">Waiting for transaction to be approved</span> : <></>}
              </div>
            </div>
            <div className="flex items-center gap-x-[22px]">
              {approved ? <IconDone /> : <IconMilestone stroke="#838383" />}
              <div className="flex flex-col">
                <span className="flex text-head5 font-spaceGrotesk text-white">Purchase {partiallyFailed && "partially"} completed!</span>
                {approved ? <span className="flex text-bodyMd font-spaceGrotesk text-gray-light">Congrats your purchase is {partiallyFailed && "partially"} completed.</span> : <></>}
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
                    Purchases can fail due to network issues, gas fee increases, or because someone else bought the item before you.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full border-t border-gray">
          <div className="flex w-full items-center gap-x-5 p-5 border-b border-gray">
            <IconWarning fill="red" />
            <span className="text-head5 font-spaceGrotesk text-white">You rejected the request in your wallet! </span>
          </div>
          <Button
            className="btn-secondary m-5"
            onClick={() => {
              setShowModal(false);
            }}
          >
            CLOSE
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Modal className="checkout" title="Checkout" show={showModal} onClose={() => setShowModal(false)} footer={approved ? footer : undefined} checkoutProcess={checkoutProcess}>
      <div className="flex flex-col p-5">
        {items.length !== 0 ? (
          <>
            <div className="flex flex-col gap-2">
              <CartItem
                key={"checkoutCartItem"}
                text="Total"
                name={itemCount + " Items"}
                price={totalAmount}
                image={items[0].image}
                id={1}
                checkoutMultipleImages={getMultipleImages()}
                showDetails={approved ? showDetails : undefined}
                setShowDetails={approved ? setShowDetails : undefined}
                className={showDetails ? "rounded-b-none" : " "}
              ></CartItem>
            </div>
            {showDetails && (
              <div className="flex flex-col min-h-fit overflow-y-scroll no-scrollbar p-[10px] gap-y-[10px] w-full border-x border-b rounded-b-md border-gray">
                {items.map((i, index) => (
                  <CartItem key={index} text="Price" name={i.name} price={i.price} image={i.image} id={i.id}></CartItem>
                ))}
              </div>
            )}
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

export default Checkout;
