import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconInfo, IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcessItem } from "./Checkout";

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
        <Button className="w-full tracking-widest">DONE</Button>
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
    startTransactionProcess().then(() => {
      onComplete();
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col p-5 gap-y-[25px]  border-gray">
        <CheckoutProcessItem status={transactionStatus.confirmTransaction} title="Confirm your offer" description="Proceed in your wallet and confirm the offer." />
        <CheckoutProcessItem status={transactionStatus.waitingForApproval} title="Wait for approval" description="Waiting for transaction to be approved." />
        <CheckoutProcessItem status={transactionStatus.purchaseConfirm} title="Your offer submitted!" description="Congrats, your offer succesfully submitted." />
      </div>
    </div>
  );
};

const MakeOfferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { checkoutPrice } = useAppSelector((state) => state.checkout);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bidBalanceUpdated, setBidBalanceUpdated] = useState(false);

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
    <Modal className="checkout" title="Make Offer" show={show} onClose={onClose} footer={<Footer approved={approved} />}>
      <div className="flex flex-col p-5">
        <CartItem text={"Your Offer"} name={selectedNFT.name} image={selectedNFT.image} price={+checkoutPrice} id={0}></CartItem>
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
      {bidBalanceUpdated && (
        <div className="flex gap-x-2 p-[10px] m-5 rounded-[5px] bg-bg-light border border-gray">
          <IconInfo color="orange" />
          <div className="flex flex-col gap-y-[6px] text-head6 font-spaceGrotesk text-white">
            1.2 ETH added to your balance.
            <span className="flex text-bodySm text-gray-light">In order to place this bid 1.2 ETH added to your bid balance. You can always view and withdraw your bid balance from your wallet.</span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MakeOfferCheckout;
