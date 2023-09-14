import React, { useEffect, useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import NotFound from "components/NotFound";

import { IconDone, IconMilestone, IconSpinner, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { getCartTotal, removeAll, removeBuyNowItem } from "store/cartSlice";
import { isObjectEmpty } from "utils";
import { notNeededStepIds } from "./components/CheckoutProcess";
import { useWallet } from "hooks/useWallet";
import config from "config";

enum Status {
  notStarted = "notStarted",
  pending = "pending",
  done = "done",
  error = "error",
}

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

const CheckoutProcessItem = ({ title, description, status = Status.notStarted, isLast = false }: { title: string; description: string; status: Status; isLast?: boolean }) => {
  const isPending = status === Status.pending;
  const isFailed = status === Status.error;

  const icon: any = {
    [Status.notStarted]: <IconMilestone className="stroke-gray" />,
    [Status.pending]: <IconSpinner className="animate-spin" />,
    [Status.done]: <IconDone className="text-white" />,
    [Status.error]: <IconWarning className="text-red shrink-0" />,
  };

  return (
    <div className="flex items-center gap-x-[22px]">
      <div className="flex h-full justify-start mt-1 text-white"> {icon[status]}</div>
      <div className="flex flex-col text-gray-light gap-2">
        <div className={clsx("text-h5 transition-all duration-300", isPending || isFailed || (isLast && status === Status.done) ? "text-white" : "")}>{title}</div>
        <div
          className={clsx(
            "body-medium transition-all duration-300 overflow-hidden",
            isPending ? "h-5 opacity-100" : "h-0 opacity-0",
            isLast && (status === Status.done || status === Status.error) ? "h-auto opacity-100" : "h-0 opacity-0"
          )}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

const CheckoutProcess = ({ stepData, wagmiSteps = [], onComplete, approved, failed }: { stepData?: any; wagmiSteps?: any; onComplete: () => void; approved: any; failed: any }) => {
  const [transactionStatus, setTransactionStatus] = useState({
    // confirmTransaction: Status.pending,
    waitingForApproval: Status.pending,
    purchaseConfirm: Status.notStarted,
  });
  const [partiallyFailed, setPartiallyFailed] = useState(false);
  const isWagmi = config.getConfig("type") === "wagmi";

  const errorTitle = "Transaction failed";
  const errorDescription = "Transactions can fail due to network issues, gas fee increases, or because someone else bought the item before you.";

  const onSetTransactionStatus = (state: any) => {
    setTransactionStatus((prevState) => ({
      ...prevState,
      ...state,
    }));
  };
  const startTransactionProcess = async () => {
    // const confirmTransaction = (await mockTransaction()) as Status;
    // onSetTransactionStatus({
    //   confirmTransaction,
    //   waitingForApproval: Status.pending,
    // });

    if (approved || failed) {
      const waitingForApproval = Status.done;
      const purchaseConfirm = Status.done;
      onSetTransactionStatus({
        waitingForApproval,
        purchaseConfirm,
      });

      return;
    } else {
      const waitingForApproval = transactionStatus.waitingForApproval;
      onSetTransactionStatus({
        waitingForApproval,
      });
    }
    onComplete();
  };

  useEffect(() => {
    if (!failed) {
      setPartiallyFailed(false);
    } else setPartiallyFailed(true);
    startTransactionProcess();
  }, [approved, failed]);

  return (
    <div className="flex flex-col w-full ">
      <div className=" flex flex-col p-5 gap-y-[25px]  border-gray">
        {/* <CheckoutProcessItem status={transactionStatus.confirmTransaction} title="Confirm transaction" description="Proceed in your wallet and confirm transaction" /> */}
        {wagmiSteps.length > 0 ? (
          <>
            {wagmiSteps.map((step: any, idx: number) => {
              if (notNeededStepIds.includes(step.id)) return;
              else
                return (
                  <CheckoutProcessItem
                    key={`CheckoutProcessItem${idx}`}
                    status={step.items[0].status === "incomplete" ? Status.pending : Status.done}
                    title={step.action}
                    description={step.description}
                  />
                );
            })}
            <CheckoutProcessItem
              isLast={true}
              status={stepData?.currentStepItem?.status === "complete" ? Status.done : Status.notStarted}
              title={"Purchase completed!"}
              description={"Congrats your purchase is completed."}
            />
          </>
        ) : isWagmi ? (
          <></>
        ) : (
          <>
            <CheckoutProcessItem status={transactionStatus.waitingForApproval} title="Wait for approval" description="Waiting for transaction to be approved" />
            <CheckoutProcessItem
              status={partiallyFailed ? Status.error : transactionStatus.purchaseConfirm}
              title={partiallyFailed ? errorTitle : "Purchase completed!"}
              description={partiallyFailed ? errorDescription : "Congrats your purchase is completed."}
              isLast={true}
            />
          </>
        )}
        {/* {partiallyFailed && (
          <div className="flex justify-center gap-x-2 p-2.5 border bg-bg-light border-gray rounded-[5px]">
            <div className="flex">
              <IconWarning className="text-red" />
            </div>
            <div className="flex flex-col">
              <span className="text-h6 text-white">Transaction failed</span>
              <span className="body-small text-gray-light">Transactions can fail due to network issues, gas fee increases, or because someone else bought the item before you.</span>
            </div>
          </div>
        )} */}
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

  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);

  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const onComplete = async () => {
    const tokenIds = !isObjectEmpty(buyNowItem) ? [buyNowItem.id] : items.map((item: any) => item.id);
    try {
      handleCheckout({
        setApproved: (val: any) => setApproved(val),
        setWagmiSteps: (val: any) => setWagmiSteps(val),
        wagmiSteps: wagmiSteps,
        setStepData: (val: any) => setStepData(val),
        buyNowItem: buyNowItem,
        tokenIds: tokenIds,
        setSuccessCheckout: (val: any) => setSuccessCheckout(val),
        user: user,
        items: items,
        wallet: wallet,
        setStartTransaction: (val: any) => setStartTransaction(val),
        setIsFailed: (val: any) => setIsFailed(val),
      });
    } catch (e) {
      setIsFailed(true);
    }
  };

  React.useEffect(() => {
    if (!show && successCheckout) {
      if (!isObjectEmpty(buyNowItem)) dispatch(removeBuyNowItem());
      else dispatch(removeAll());
    }
  }, [show, successCheckout]);

  React.useEffect(() => {
    setApproved(false);
    setStartTransaction(false);
    setIsFailed(false);

    if (show) {
      setStartTransaction(true);
    }
  }, [show]);

  const checkoutProcess = (
    <div className="flex flex-col w-full items-center">
      {startTransaction ? (
        <>
          <CheckoutProcess stepData={stepData} wagmiSteps={wagmiSteps} onComplete={onComplete} approved={approved} failed={isFailed} />
          {isFailed && (
            <div className="flex flex-col w-full border-t border-gray">
              <Button className="btn-secondary m-5" onClick={onClose}>
                CLOSE
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col w-full border-t border-gray">
          <div className="flex w-full items-center gap-x-5 p-5 border-b border-gray">
            <IconWarning className="text-red" />
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
    <Modal backdropDisabled={true} className="checkout" title="Checkout" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
      <div className="flex flex-col p-5">
        {!isObjectEmpty(buyNowItem) ? (
          <CheckoutCartItems items={[buyNowItem]} itemCount={1} totalAmount={buyNowItem.price} approved={approved} />
        ) : items.length > 0 ? (
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
