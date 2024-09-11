import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
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

const CancelListingCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { cancelOrderIds, currentItem } = useAppSelector((state) => state.checkout);
  const { wallet, user } = useAppSelector((state) => state.wallet);
  const { handleCancelListing } = useWallet();

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const onComplete = () => {
    try {
      handleCancelListing({ user, selectedNFT, currentItem, cancelOrderIds, wallet, setApproved, setStartTransaction, setIsFailed, wagmiSteps, setWagmiSteps, setStepData });
    } catch (e) {
      setIsFailed(true);
      setStartTransaction(false);
    }
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
      title={approved || !startTransaction || isFailed ? "" : "Cancel Listing"}
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
          <Approved title="Listing Cancelled Successfully!" description="The listing has been cancelled." />

          <div className="flex flex-col w-full">
            <CartItem text="Listed at" name={selectedNFT?.name ?? selectedNFT?.tokenOrder} image={selectedNFT?.image} price={selectedNFT?.price} id={0} />
          </div>
        </div>
      ) : (
        <div className="flex-center flex-col w-full gap-8 px-[25px] pt-5 pb-[50px]">
          <div className="flex flex-col w-full">
            <CartItem text="Listed at" name={selectedNFT?.name ?? selectedNFT?.tokenOrder} image={selectedNFT?.image} price={selectedNFT?.price} id={0} />
          </div>

          <IconSpinner className="animate-spin text-white w-10 h-10" />

          <div className="flex flex-col gap-2">
            <h5 className="text-h5 text-white text-center">Confirm in Wallet</h5>
            <span className="text-gray-light body-medium text-center">Waiting for you to confirm the transaction in your wallet.</span>
          </div>
        </div>
      )}
    </Modal>
    // <Modal backdropDisabled={true} className="checkout" title="Cancel Listing" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
    //   <div className="flex flex-col p-5">
    //     <CartItem text="Listed at" name={selectedNFT?.name ?? selectedNFT?.tokenOrder} image={selectedNFT?.image} price={selectedNFT?.price} id={0}></CartItem>
    //   </div>
    //   <div className="flex border-t border-gray">{checkoutProcess}</div>
    // </Modal>
  );
};

export default CancelListingCheckout;
