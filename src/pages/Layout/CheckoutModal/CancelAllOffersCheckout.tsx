import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import Modal from "components/Modal";

import { IconSpinner } from "icons";
import { useAppSelector } from "store";
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

const CancelAllOffers = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { wallet, user } = useAppSelector((state) => state.wallet);
  const { cancelOrderIds } = useAppSelector((state) => state.checkout);
  const { handleCancelAllOffers } = useWallet();

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const onComplete = () => {
    handleCancelAllOffers({ user, wallet, setApproved, setStartTransaction, setIsFailed, cancelOrderIds, wagmiSteps, setWagmiSteps, setStepData });
  };

  React.useEffect(() => {
    if (show) {
      onComplete();
    }
  }, [show]);

  // const viewOnBlockchain = approved && <button className="body-small text-gray-light underline">View on Blockchain</button>;

  return (
    <Modal
      bodyClassName="!w-full !max-w-[600px]"
      title={approved || !startTransaction || isFailed ? "" : "Cancel All Offers"}
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
          <Approved title="All Offers Cancelled Successfully!" description="All of your offers have been cancelled." />
        </div>
      ) : (
        <div className="flex-center flex-col w-full gap-8 px-[25px] pt-5 pb-[50px]">
          <IconSpinner className="animate-spin text-white w-10 h-10" />

          <div className="flex flex-col gap-2">
            <h5 className="text-h5 text-white text-center">Confirm in Wallet</h5>
            <span className="text-gray-light body-medium text-center">Waiting for you to confirm the transaction in your wallet.</span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CancelAllOffers;
