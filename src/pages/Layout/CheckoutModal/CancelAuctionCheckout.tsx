/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import { setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { contracts } from "global-constants";
import { FuelProvider } from "api";

const checkoutProcessTexts = {
  title1: "Confirm your canceling auction",
  description1: "Proceed in your wallet and confirm canceling auction.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your auction is canceled!",
  description3: "Your auction succesfully canceled.",
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

const CancelAuctionCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const onComplete = () => {
    throw new Error("DAHA HAZIR DEGIL");
    // setContracts(contracts, FuelProvider);
    // nftdetailsService.getAuctionIndex([selectedNFT.id]).then((res) => {
    //   cancelOrder(exchangeContractId, provider, wallet, strategyAuctionContractId, res.data[selectedNFT.id], false)
    //     .then(() => {
    //       nftdetailsService.tokenCancelAuction(selectedNFT.id);
    //       setApproved(true);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
    //         setStartTransaction(false);
    //       else setIsFailed(true);
    //     });
    // });
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
          <CheckoutProcess onComplete={onComplete} data={checkoutProcessTexts} approved={approved} failed={isFailed} />
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

  // const viewOnBlockchain = approved && <button className="body-small text-gray-light underline">View on Blockchain</button>;

  return (
    <Modal backdropDisabled={true} className="checkout" title="Cancel Auction" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
      <div className="flex flex-col p-5">
        <CartItem
          text={selectedNFT.highestBid ? "Highest Bid" : ""}
          name={selectedNFT.name ?? selectedNFT.tokenOrder}
          image={selectedNFT.image}
          price={selectedNFT.highestBid ? selectedNFT.highestBid.price : ""}
          id={0}
        ></CartItem>
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default CancelAuctionCheckout;
