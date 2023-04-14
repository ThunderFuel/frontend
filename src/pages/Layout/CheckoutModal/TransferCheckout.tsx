import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconInfo, IconWarning } from "icons";
import { useAppSelector } from "store";
import Input from "components/Input";
import { CheckoutProcess } from "./components/CheckoutProcess";
import { addressFormat } from "utils";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { toB256 } from "fuels";

const checkoutProcessTexts = {
  title1: "Confirm transferring your NFT",
  description1: "Proceed in your wallet and confirm the transaction.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your NFT transferred!",
  description3: "Your NFT is succesfully transferred.",
};

const Footer = ({ address, callback, animationStarted, onClose }: { address: string; callback: any; animationStarted: boolean; onClose: any }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", !animationStarted ? "h-fit opacity-100" : "h-0 opacity-0")}>
      <div className={"flex flex-col gap-y-[10px] w-full items-center justify-center p-5"}>
        <Button className="w-full tracking-widest" disabled={address === ""} onClick={callback}>
          TRANSFER
        </Button>
        <Button className="btn-secondary w-full tracking-widest" onClick={onClose}>
          CLOSE
        </Button>
      </div>
    </div>
  );
};

const TransferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);

  const [approved, setApproved] = useState(false);
  const [address, setaddress] = useState("");
  const [startTransaction, setStartTransaction] = useState(false);
  const [showTransactionAnimation, setshowTransactionAnimation] = useState(false);

  const onComplete = () => {
    setApproved(true);
    let tempAddress = "";
    if (address.slice(0, 4) === "fuel") tempAddress = toB256(address as any);
    nftdetailsService.tokenTransfer(selectedNFT.id, tempAddress === "" ? address : tempAddress);
  };

  React.useEffect(() => {
    setshowTransactionAnimation(false);
    setApproved(false);
    setStartTransaction(false);
    if (show) {
      setStartTransaction(true);
    }
  }, [show]);

  const checkoutProcess = (
    <div className="flex flex-col w-full items-center">
      {startTransaction ? (
        <CheckoutProcess onComplete={onComplete} data={checkoutProcessTexts} />
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

  const viewOnBlockchain = approved && <button className="body-small text-gray-light underline"></button>;

  return (
    <Modal
      backdropDisabled={true}
      className="checkout"
      title="Transfer Your NFT"
      show={show}
      onClose={onClose}
      footer={<Footer address={address} animationStarted={showTransactionAnimation} callback={setshowTransactionAnimation} onClose={onClose} />}
    >
      <div className="flex flex-col p-5">
        {/*TODO price yerine string yazilabilmeli */}
        <CartItem text={"Address"} name={selectedNFT.name} image={selectedNFT.image} price={addressFormat(address)} id={0} titleSlot={viewOnBlockchain}></CartItem>
      </div>
      {showTransactionAnimation ? (
        <div className="flex border-t border-gray">{checkoutProcess}</div>
      ) : (
        <div className="flex flex-col p-5 gap-y-2 border-t border-gray">
          <h6 className="text-head6 font-spaceGrotesk text-white">Address</h6>
          <span className="flex items-center gap-x-[5px] text-bodySm font-spaceGrotesk text-gray-light">
            <IconInfo className="w-[17px] h-[17px]" />
            Items sent to the wrong address cannot be recovered
          </span>
          <Input onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setaddress(event.target.value)} value={address} type="text" maxLength={66} />
        </div>
      )}
    </Modal>
  );
};

export default TransferCheckout;
