import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconInfo, IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";

const checkoutProcessTexts = {
  title1: "Confirm your bid",
  description1: "Proceed in your wallet and confirm the bid.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved.",
  title3: "Your bid is placed!",
  description3: "Congrats, you offer successfully placed.",
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

const BidCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { checkoutPrice } = useAppSelector((state) => state.checkout);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bidBalanceUpdated, setBidBalanceUpdated] = useState(false);

  const onComplete = () => {
    setApproved(true);
    nftdetailsService.tokenPlaceBid({ tokenId: selectedNFT.id, userId: 16, price: checkoutPrice });
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

  return (
    <Modal backdropDisabled={true} className="checkout" title="Place a Bid" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
      <div className="flex flex-col p-5">
        <CartItem text={"Your Bid"} name={selectedNFT.name} image={selectedNFT.image} price={+checkoutPrice} id={0}></CartItem>
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
      {bidBalanceUpdated && approved && (
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

export default BidCheckout;
