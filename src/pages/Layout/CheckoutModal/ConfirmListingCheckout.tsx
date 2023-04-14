import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";

const checkoutProcessTexts = {
  title1: "Confirm your listing",
  description1: "Proceed in your wallet and confirm the listing.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your NFT listed!",
  description3: "Congrats, your NFT succesfully listed.",
};

const Footer = ({ approved, onClose }: { approved: boolean; onClose: any }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
      <div className={"flex w-full items-center justify-center p-5"}>
        <Button className="w-full tracking-widest" onClick={() => onClose()}>
          DONE
        </Button>
      </div>
    </div>
  );
};

const ConfirmListingCheckout = ({ show, onClose, updateListing }: { show: boolean; onClose: any; updateListing?: boolean }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { checkoutPrice, checkoutIsAuction, checkoutAuctionStartingPrice, checkoutExpireTime } = useAppSelector((state) => state.checkout);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);

  const onComplete = () => {
    setApproved(true);
    if (checkoutIsAuction) nftdetailsService.tokenOnAuction(selectedNFT.id, checkoutExpireTime, checkoutAuctionStartingPrice !== 0 ? checkoutAuctionStartingPrice : undefined);
    else if (updateListing) nftdetailsService.tokenUpdateListing([{ tokenId: selectedNFT.id, price: checkoutPrice, expireTime: checkoutExpireTime }]);
    else nftdetailsService.tokenList([{ tokenId: selectedNFT.id, price: checkoutPrice, expireTime: checkoutExpireTime }]);
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

  const viewOnBlockchain = <button className="body-small text-gray-light underline"></button>;

  return (
    <Modal
      backdropDisabled={true}
      className="checkout"
      title={updateListing ? "Update Listing" : "Complete Listing"}
      show={show}
      onClose={onClose}
      footer={<Footer approved={approved} onClose={onClose} />}
    >
      <div className="flex flex-col p-5">
        {checkoutIsAuction ? (
          checkoutAuctionStartingPrice ? (
            <CartItem text={"Starting Price"} name={selectedNFT.name} image={selectedNFT.image} price={checkoutAuctionStartingPrice} id={0} titleSlot={viewOnBlockchain}></CartItem>
          ) : (
            <CartItem text={"Starting Price"} name={selectedNFT.name} image={selectedNFT.image} price={0} id={0} titleSlot={viewOnBlockchain}></CartItem>
          )
        ) : (
          <CartItem text={"Price"} name={selectedNFT.name} image={selectedNFT.image} price={checkoutPrice} id={0} titleSlot={viewOnBlockchain}></CartItem>
        )}
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default ConfirmListingCheckout;
