import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import { contracts, exchangeContractId, provider, strategyFixedPriceContractId } from "global-constants";
import { cancelAllOrdersBySide, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { FuelProvider } from "../../../api";
import collectionsService from "api/collections/collections.service";

const checkoutProcessTexts = {
  title1: "Confirm your canceling listing",
  description1: "Proceed in your wallet and confirm canceling listing.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your listings are canceled!",
  description3: "Your listings are succesfully canceled.",
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

const CancelAllListingCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { wallet, user } = useAppSelector((state) => state.wallet);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const onComplete = () => {
    setContracts(contracts, FuelProvider);
    const params = { userId: user.id };

    cancelAllOrdersBySide(exchangeContractId, provider, wallet, strategyFixedPriceContractId, false)
      .then((res) => {
        if (res.transactionResult.status.type === "success") {
          collectionsService.cancelAllListings(params);
          setApproved(true);
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
          setStartTransaction(false);
        else setIsFailed(true);
      });
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
    <Modal backdropDisabled={true} className="checkout" title="Cancel All Listing" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default CancelAllListingCheckout;
