import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconInfo, IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess, handleTransactionError } from "./components/CheckoutProcess";
import { useWallet } from "hooks/useWallet";

const checkoutProcessTexts = {
  title1: "Confirm your offer",
  description1: "Proceed in your wallet and confirm your offer",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your offer submitted!",
  description3: "Your offer succesfully submitted.",
};
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

const UpdateOfferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { checkoutPrice, currentItem, checkoutExpireTime } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [bidBalanceUpdated, setBidBalanceUpdated] = useState(false);
  const [currentBidBalance, setCurrentBidBalance] = useState(0);
  const { handleUpdateOffer } = useWallet();
  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const onComplete = () => {
    const cancelOrderIds = ["0x0176f68aaf471ba2d1f4a0f03c4d051a12a67be607fb75b63bfe8141fd28d4b6"];
    try {
      handleUpdateOffer({
        setBidBalanceUpdated,
        setCurrentBidBalance,
        currentItem,
        checkoutPrice,
        checkoutExpireTime,
        cancelOrderIds,
        user,
        wallet,
        setApproved,
        setStartTransaction,
        setIsFailed,
        wagmiSteps,
        setWagmiSteps,
        setStepData,
      });
    } catch (e) {
      handleTransactionError({ error: e, setStartTransaction, setIsFailed });
    }

    return;
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
        <>
          <CheckoutProcess stepData={stepData} wagmiSteps={wagmiSteps} onComplete={onComplete} data={checkoutProcessTexts} approved={approved} failed={isFailed} />
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
    <Modal backdropDisabled={true} className="checkout" title="Update Your Offer" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
      <div className="flex flex-col p-5">
        <CartItem text={"Your Offer"} name={selectedNFT?.name ?? selectedNFT?.tokenOrder} image={selectedNFT?.image} price={checkoutPrice} id={0}></CartItem>
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
      {bidBalanceUpdated && approved && (
        <div className="flex gap-x-2 p-[10px] m-5 rounded-[5px] bg-bg-light border border-gray">
          <IconInfo color="orange" />
          <div className="flex w-full flex-col gap-y-[6px] text-head6 font-spaceGrotesk text-white">
            {parseFloat((checkoutPrice - currentBidBalance).toFixed(9))} ETH added to your balance.
            <span className="text-bodySm text-gray-light">
              In order to make this offer {parseFloat((checkoutPrice - currentBidBalance).toFixed(9))} ETH added to your bid balance. You can always view and withdraw your bid balance from your
              wallet.
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UpdateOfferCheckout;
