import React, { useEffect, useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import NotFound from "components/NotFound";

import { IconSpinner } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { getCartTotal, removeAll, removeBuyNowItem } from "store/cartSlice";
import { isObjectEmpty } from "utils";
import { useWallet } from "hooks/useWallet";
import { Approved, FooterCloseButton, TransactionFailed, TransactionRejected } from "./MakeOfferCheckout";

const Footer = ({ approved, onClose }: { approved: boolean; onClose: any }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
      <div className={"flex w-full items-center justify-center p-5"}>
        <Button className="w-full tracking-widest" onClick={onClose}>
          DONE
        </Button>
      </div>
    </div>
  );
};

export const CheckoutCartItems = ({ items, itemCount, totalAmount, approved }: { items: any; itemCount: number; totalAmount: number | string; approved: boolean }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getImages = items.slice(0, itemCount > 3 ? 3 : itemCount).map((i: any) => (i.image ? i.image : i.tokenImage));
  const titleSlot = approved && (
    <div className="flex gap-x-2.5">
      {/* <button className="body-small text-gray-light underline">View on Blockchain</button> */}
      {itemCount !== 1 && (
        <button className="body-small text-gray-light underline" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        <CartItem
          text="Total"
          name={`${itemCount === 1 ? items[0].name ?? items[0].tokenOrder : itemCount + " Items"}`}
          price={totalAmount}
          image={getImages}
          id={1}
          className={clsx(showDetails && "rounded-b-none")}
          titleSlot={titleSlot}
        />
      </div>
      <div className="overflow-hidden transition-all" style={{ height: showDetails ? `${ref.current?.scrollHeight}px` : 0 }} ref={ref}>
        <div className={clsx("p-2.5 gap-y-2.5 border-x border-b rounded-b-md border-gray")}>
          {items.map((item: any, i: number) => (
            <CartItem key={i} text="Price" name={item.name ?? item.tokenOrder} price={item.price} image={item.image} id={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};
const Checkout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const [successCheckout, setSuccessCheckout] = React.useState(false);
  const dispatch = useAppDispatch();
  const { handleCheckout } = useWallet();
  const { totalAmount, itemCount, items, buyNowItem } = useAppSelector((state) => state.cart);
  const { user, wallet } = useAppSelector((state) => state.wallet);
  const [isFailed, setIsFailed] = useState(false);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(true);

  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const onComplete = async () => {
    const tokenIds = !isObjectEmpty(buyNowItem) ? [buyNowItem.id] : items.map((item: any) => item.id);

    try {
      handleCheckout({
        setApproved,
        setWagmiSteps,
        wagmiSteps,
        setStepData,
        buyNowItem,
        tokenIds,
        setSuccessCheckout,
        user,
        items,
        wallet,
        setStartTransaction,
        setIsFailed,
      });
    } catch (e) {
      console.log(e);
      setIsFailed(true);
    }
  };

  React.useEffect(() => {
    if (show) dispatch(getCartTotal());
  }, [items, show]);

  React.useEffect(() => {
    if (!show && successCheckout) {
      if (!isObjectEmpty(buyNowItem)) dispatch(removeBuyNowItem());
      else dispatch(removeAll());
      setWagmiSteps([]);
    }
  }, [show, successCheckout]);

  React.useEffect(() => {
    if (show) {
      onComplete();
    } else {
      setApproved(false);
      setStartTransaction(true);
      setIsFailed(false);
    }
  }, [show]);

  return (
    <Modal
      bodyClassName="!w-full !max-w-[600px]"
      title="Confirm Purchase"
      backdropDisabled={true}
      className="checkout"
      show={show}
      onClose={onClose}
      footer={!startTransaction || isFailed ? <FooterCloseButton onClose={onClose} /> : <Footer approved={approved} onClose={onClose} />}
    >
      {!startTransaction ? (
        <TransactionRejected />
      ) : isFailed ? (
        <TransactionFailed />
      ) : approved ? (
        <div className="flex flex-col w-full gap-5 p-5">
          <Approved title="Purchase Completed!" description="Your purchase was successful! You can view purchased items in your profile." />

          <div className="flex flex-col w-full">
            {!isObjectEmpty(buyNowItem) ? (
              <CheckoutCartItems items={[buyNowItem]} itemCount={1} totalAmount={buyNowItem.price} approved={approved} />
            ) : items.length > 0 ? (
              <CheckoutCartItems items={items} itemCount={itemCount} totalAmount={totalAmount} approved={approved} />
            ) : (
              <NotFound>Your cart is empty. Start adding NFTs to your cart to collect.</NotFound>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-center flex-col w-full gap-8 px-[25px] pt-5 pb-[50px]">
          <div className="flex flex-col w-full">
            {!isObjectEmpty(buyNowItem) ? (
              <CheckoutCartItems items={[buyNowItem]} itemCount={1} totalAmount={buyNowItem.price} approved={approved} />
            ) : items.length > 0 ? (
              <CheckoutCartItems items={items} itemCount={itemCount} totalAmount={totalAmount} approved={approved} />
            ) : (
              <NotFound>Your cart is empty. Start adding NFTs to your cart to collect.</NotFound>
            )}
          </div>

          <IconSpinner className="animate-spin text-white w-10 h-10" />

          <div className="flex flex-col gap-2">
            <h5 className="text-h5 text-white text-center">Confirm in Wallet</h5>
            <span className="text-gray-light body-medium text-center">Waiting for you to confirm the transaction in your wallet.</span>
          </div>
        </div>
      )}
    </Modal>
    // <Modal backdropDisabled={true} className="checkout" title="Checkout" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>

    //   <div className="flex border-t border-gray">{checkoutProcess}</div>
    // </Modal>
  );
};

export default Checkout;
