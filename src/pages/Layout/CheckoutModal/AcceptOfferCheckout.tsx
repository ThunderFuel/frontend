import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconSpinner, IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import { useWallet } from "hooks/useWallet";
import { Approved, FooterCloseButton, TransactionFailed, TransactionRejected } from "./MakeOfferCheckout";

const checkoutProcessTexts = {
  title1: "Confirm offer",
  description1: "Proceed in your wallet and confirm accepting offer.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your NFT sold!",
  description3: "Congrats, your NFT succesfully sold.",
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

const AcceptOfferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { checkoutPrice, currentItem, onCheckoutComplete } = useAppSelector((state) => state.checkout);
  const { wallet, user } = useAppSelector((state) => state.wallet);
  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);
  const { handleAcceptOffer } = useWallet();

  console.log(currentItem);

  const onComplete = () => {
    handleAcceptOffer({ user, wallet, setStartTransaction, setIsFailed, setApproved, currentItem, onCheckoutComplete, wagmiSteps, setWagmiSteps, setStepData });
  };

  React.useEffect(() => {
    if (show) {
      onComplete();
    }
  }, [show]);

  const viewOnBlockchain = approved && <button className="body-small text-gray-light underline"></button>;

  return (
    <Modal
      bodyClassName="!w-full !max-w-[600px]"
      title="Accept Offer"
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
          <Approved title="Offer Accepted Successfully!" />

          <div className="flex flex-col w-full">
            <CartItem text={"Offer"} name={currentItem.tokenName ?? currentItem.tokenOrder} image={currentItem.tokenImage} price={+checkoutPrice} id={0} titleSlot={viewOnBlockchain} />
          </div>
        </div>
      ) : (
        <div className="flex-center flex-col w-full gap-8 px-[25px] pt-5 pb-[50px]">
          <div className="flex flex-col w-full">
            <CartItem text={"Offer"} name={currentItem.tokenName ?? currentItem.tokenOrder} image={currentItem.tokenImage} price={+checkoutPrice} id={0} titleSlot={viewOnBlockchain} />
          </div>

          <IconSpinner className="animate-spin text-white w-10 h-10" />

          <div className="flex flex-col gap-2">
            <h5 className="text-h5 text-white text-center">Confirm in Wallet</h5>
            <span className="text-gray-light body-medium text-center">Waiting for you to confirm the transaction in your wallet.</span>
          </div>
        </div>
      )}
    </Modal>
    // <Modal backdropDisabled={true} className="checkout" title="Accept Offer" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
    //   <div className="flex flex-col p-5">
    //     <CartItem text={"Offer"} name={currentItem.tokenName ?? currentItem.tokenOrder} image={currentItem.tokenImage} price={+checkoutPrice} id={0} titleSlot={viewOnBlockchain}></CartItem>
    //   </div>
    //   <div className="flex border-t border-gray">{checkoutProcess}</div>
    // </Modal>
  );
};

export default AcceptOfferCheckout;
