import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconAccept, IconDone, IconInfo, IconSpinner, IconTransfer, IconWarning } from "icons";
import { useAppSelector } from "store";
import Input from "components/Input";
import { CheckoutProcess, handleTransactionError } from "./components/CheckoutProcess";
import { addressFormat } from "utils";
import { useWallet } from "hooks/useWallet";
import { Approved, FooterCloseButton, TransactionFailed, TransactionRejected } from "./MakeOfferCheckout";

const Footer = ({
  onClose,
  address,
  approved,
  isOnConfirmStep,
  startTransaction,
  isFailed,
  onSubmit,
}: {
  approved: boolean;
  address: string;
  onClose: any;
  isOnConfirmStep: boolean;
  startTransaction: boolean;
  isFailed: boolean;
  onSubmit: () => void;
}) => {
  if (isOnConfirmStep)
    return approved ? (
      <div className={"flex w-full gap-2.5 items-center justify-center p-5"}>
        <Button className="btn-primary w-full tracking-widest" onClick={onClose}>
          CLOSE
        </Button>
      </div>
    ) : !startTransaction || isFailed ? (
      <FooterCloseButton onClose={onClose} />
    ) : (
      <></>
    );

  return (
    <>
      <div className={clsx("transition-all duration-300 overflow-hidden", !startTransaction ? "h-fit opacity-100" : "h-0 opacity-0")}>
        <div className={"flex gap-2.5 w-full items-center justify-center p-5"}>
          <Button className="btn-secondary w-full tracking-widest" onClick={onClose}>
            CLOSE
          </Button>
          <Button className="w-full tracking-widest" disabled={address === ""} onClick={onSubmit}>
            TRANSFER
          </Button>
        </div>
      </div>
      <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
        <div className={"flex w-full items-center justify-center p-5"}>
          <Button className="w-full tracking-widest" onClick={onClose}>
            DONE
          </Button>
        </div>
      </div>
    </>
  );
};

const CartItemBottomPart = ({ address }: { address: string }) => {
  return (
    <div className="flex justify-between w-full">
      <span className="text-gray-light text-bodyMd font-medium">To Address</span>
      <span className="text-bodyMd font-medium text-white">{addressFormat(address)}</span>
    </div>
  );
};

const TransferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { wallet, user } = useAppSelector((state) => state.wallet);
  const { handleTransfer } = useWallet();

  const [approved, setApproved] = useState(false);
  const [address, setaddress] = useState("");
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const [isOnConfirmStep, setIsOnConfirmStep] = useState(false);

  const onComplete = () => {
    try {
      handleTransfer({
        address,
        selectedNFT,
        wallet,
        user,
        setApproved,
        setStartTransaction,
        setIsFailed,
        setWagmiSteps,
        setStepData,
        wagmiSteps,
      });
    } catch (e) {
      handleTransactionError({ error: e, setStartTransaction, setIsFailed });
    }
  };

  const onSubmit = () => {
    if (show) {
      setStartTransaction(true);
      setIsOnConfirmStep(true);
      onComplete();
    }
  };

  const viewOnBlockchain = approved && <button className="body-small text-gray-light underline"></button>;

  return (
    <Modal
      bodyClassName="!w-full !max-w-[600px]"
      backdropDisabled={true}
      className="checkout"
      show={show}
      onClose={onClose}
      footer={<Footer address={address} isOnConfirmStep={isOnConfirmStep} approved={approved} onClose={onClose} onSubmit={onSubmit} startTransaction={startTransaction} isFailed={isFailed} />}
    >
      {!approved && (
        <div className="sticky top-0 flex w-full justify-between border-b border-gray text-h6">
          <span className={clsx("flex items-center gap-2.5 w-full p-5 text-white", isOnConfirmStep ? "" : "bg-bg-light border-b border-white")}>
            {!isOnConfirmStep ? <IconTransfer /> : <IconDone className="text-green" />} Enter Address
          </span>

          <div className="flex-shrink-0 w-[1px] bg-gray" />

          <span className={clsx("flex items-center gap-2.5 w-full p-5 text-white", isOnConfirmStep ? "bg-bg-light border-b border-white" : "")}>
            {approved ? <IconDone className="text-green" /> : <IconAccept />} Confirm
          </span>
        </div>
      )}

      {isOnConfirmStep && !startTransaction ? (
        <TransactionRejected />
      ) : isOnConfirmStep && isFailed ? (
        <TransactionFailed />
      ) : approved ? (
        <div className="flex flex-col w-full gap-5 p-5">
          <Approved title="Item Transferred Successfully!" description="The item has been transferred successfully." />

          <CartItem
            className="w-full"
            name={selectedNFT.name ?? selectedNFT.tokenOrder}
            image={selectedNFT.image}
            BottomPart={<CartItemBottomPart address={address} />}
            id={0}
            titleSlot={viewOnBlockchain}
          />
        </div>
      ) : !isOnConfirmStep ? (
        <div className="flex flex-col w-full gap-5 p-5">
          <CartItem className="w-full" name={selectedNFT.name ?? selectedNFT.tokenOrder} image={selectedNFT.image} id={0} titleSlot={viewOnBlockchain} />

          <div className="flex flex-col gap-2">
            <h6 className="text-head6 font-spaceGrotesk text-white">Address</h6>

            <span className="flex items-center gap-x-[5px] text-bodySm font-spaceGrotesk text-gray-light">
              <IconInfo className="w-[17px] h-[17px]" />
              Items sent to the wrong address cannot be recovered
            </span>
            <Input onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setaddress(event.target.value)} value={address} type="text" maxLength={66} />
          </div>
        </div>
      ) : (
        <div className="flex-center flex-col w-full gap-8 px-[25px] pt-5 pb-[50px]">
          <CartItem
            className="w-full"
            BottomPart={<CartItemBottomPart address={address} />}
            name={selectedNFT.name ?? selectedNFT.tokenOrder}
            image={selectedNFT.image}
            id={0}
            titleSlot={viewOnBlockchain}
          />

          <IconSpinner className="animate-spin text-white w-10 h-10" />

          <div className="flex flex-col gap-2">
            <h5 className="text-h5 text-white text-center">Confirm in Wallet</h5>
            <span className="text-gray-light body-medium text-center">Waiting for you to confirm the transaction in your wallet.</span>
          </div>
        </div>
      )}
    </Modal>
    // <Modal
    //   backdropDisabled={true}
    //   className="checkout"
    //   title="Transfer Your NFT"
    //   show={show}
    //   onClose={onClose}
    //   footer={<Footer approved={approved} address={address} animationStarted={showTransactionAnimation} callback={setshowTransactionAnimation} onClose={onClose} />}
    // >
    //   <div className="flex flex-col p-5">
    //     {/*TODO price yerine string yazilabilmeli */}
    //     <CartItem text={"Address"} name={selectedNFT.name ?? selectedNFT.tokenOrder} image={selectedNFT.image} price={addressFormat(address)} id={0} titleSlot={viewOnBlockchain}></CartItem>
    //   </div>
    //   {showTransactionAnimation ? (
    //     <div className="flex border-t border-gray">{checkoutProcess}</div>
    //   ) : (
    //     <div className="flex flex-col p-5 gap-y-2 border-t border-gray">
    //       <h6 className="text-head6 font-spaceGrotesk text-white">Address</h6>
    //       <span className="flex items-center gap-x-[5px] text-bodySm font-spaceGrotesk text-gray-light">
    //         <IconInfo className="w-[17px] h-[17px]" />
    //         Items sent to the wrong address cannot be recovered
    //       </span>
    //       <Input onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setaddress(event.target.value)} value={address} type="text" maxLength={66} />
    //     </div>
    //   )}
    // </Modal>
  );
};

export default TransferCheckout;
