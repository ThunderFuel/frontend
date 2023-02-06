import React, { useEffect, useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import NotFound from "components/NotFound";

import { IconDone, IconMilestone, IconSpinner, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { getCartTotal } from "store/cartSlice";

enum Status {
  notStarted = "notStarted",
  pending = "pending",
  done = "done",
}

const mockTransaction = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(Status.done);
    }, 1000);
  });
};

const Footer = ({ approved }: { approved: boolean }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
      <div className={"flex w-full items-center justify-center p-5"}>
        <Button className="w-full tracking-widest">VIEW PURCHASE</Button>
      </div>
    </div>
  );
};

const CheckoutProcessItem = ({ title, description, status = Status.notStarted }: { title: string; description: string; status: Status }) => {
  const isPending = status === Status.pending;
  const icon: any = {
    [Status.notStarted]: <IconMilestone className="stroke-gray" />,
    [Status.pending]: <IconSpinner className="animate-spin" />,
    [Status.done]: <IconDone />,
  };

  return (
    <div className="flex items-center gap-x-[22px]">
      {icon[status]}
      <div className="flex flex-col text-gray-light gap-2">
        <div className={clsx("text-h5 transition-all duration-300", isPending && "text-white")}>{title}</div>
        <div className={clsx("body-medium transition-all duration-300 overflow-hidden", isPending ? "h-5 opacity-100" : " h-0 opacity-0")}>{description}</div>
      </div>
    </div>
  );
};

const CheckoutProcess = ({ onComplete }: { onComplete: () => void }) => {
  const [transactionStatus, setTransactionStatus] = useState({
    confirmTransaction: Status.pending,
    waitingForApproval: Status.notStarted,
    purchaseConfirm: Status.notStarted,
  });
  const [partiallyFailed, setPartiallyFailed] = useState(false);

  const onSetTransactionStatus = (state: any) => {
    setTransactionStatus((prevState) => ({
      ...prevState,
      ...state,
    }));
  };
  const startTransactionProcess = async () => {
    const confirmTransaction = (await mockTransaction()) as Status;
    onSetTransactionStatus({
      confirmTransaction,
      waitingForApproval: Status.pending,
    });

    const waitingForApproval = (await mockTransaction()) as Status;
    onSetTransactionStatus({
      waitingForApproval,
      purchaseConfirm: Status.pending,
    });

    const purchaseConfirm = (await mockTransaction()) as Status;
    onSetTransactionStatus({
      purchaseConfirm,
    });
  };

  React.useEffect(() => {
    setPartiallyFailed(false);
    startTransactionProcess().then(() => {
      onComplete();
    });
  }, []);

  return (
    <div className="flex flex-col w-full ">
      <div className=" flex flex-col p-5 gap-y-[25px]  border-gray">
        <CheckoutProcessItem status={transactionStatus.confirmTransaction} title="Confirm transaction" description="Proceed in your wallet and confirm transaction" />
        <CheckoutProcessItem status={transactionStatus.waitingForApproval} title="Wait for approval" description="Waiting for transaction to be approved" />
        <CheckoutProcessItem status={transactionStatus.purchaseConfirm} title="Purchase completed!" description="Congrats your purchase is completed." />

        {partiallyFailed && (
          <div className="flex justify-center gap-x-2 p-2.5 border bg-bg-light border-gray rounded-[5px]">
            <div className="flex">
              <IconWarning className="fill-red" />
            </div>
            <div className="flex flex-col">
              <span className="text-h6 text-white">1 item failed</span>
              <span className="body-small text-gray-light">Purchases can fail due to network issues, gas fee increases, or because someone else bought the item before you.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CheckoutCartItems = ({ items, itemCount, totalAmount, approved }: { items: any; itemCount: number; totalAmount: number; approved: boolean }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getImages = items.slice(0, itemCount > 3 ? 3 : itemCount).map((i: any) => i.image);
  const titleSlot = approved && (
    <div className="flex gap-x-2.5">
      <button className="body-small text-gray-light underline">View on Blockchain</button>
      <button className="body-small text-gray-light underline" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        <CartItem text="Total" name={`${itemCount} Items`} price={totalAmount} image={getImages} id={1} className={clsx(showDetails && "rounded-b-none")} titleSlot={titleSlot} />
      </div>
      <div className="overflow-hidden transition-all" style={{ height: showDetails ? `${ref.current?.scrollHeight}px` : 0 }} ref={ref}>
        <div className={clsx("p-2.5 gap-y-2.5 border-x border-b rounded-b-md border-gray")}>
          {items.map((item: any, i: number) => (
            <CartItem key={i} text="Price" name={item.name} price={item.price} image={item.image} id={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};
const Checkout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const dispatch = useAppDispatch();
  const { totalAmount, itemCount, items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);

  const onComplete = () => {
    setApproved(true);
  };

  React.useEffect(() => {
    setApproved(false);
    setStartTransaction(false);
    if (show) {
      setStartTransaction(true);
    }
  }, [show]);

  const checkoutProcess = (
    <div className="flex flex-col w-full items-center">
      {startTransaction ? (
        <CheckoutProcess onComplete={onComplete} />
      ) : (
        <div className="flex flex-col w-full border-t border-gray">
          <div className="flex w-full items-center gap-x-5 p-5 border-b border-gray">
            <IconWarning className="fill-red" />
            <span className="text-h5 text-white">You rejected the request in your wallet!</span>
          </div>
          <Button className="btn-secondary m-5" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Modal backdropDisabled={true} className="checkout" title="Checkout" show={show} onClose={onClose} footer={<Footer approved={approved} />}>
      <div className="flex flex-col p-5">
        {items.length > 0 ? (
          <CheckoutCartItems items={items} itemCount={itemCount} totalAmount={totalAmount} approved={approved} />
        ) : (
          <NotFound>Your cart is empty. Start adding NFTs to your cart to collect.</NotFound>
        )}
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default Checkout;
