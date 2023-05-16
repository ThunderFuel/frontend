import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { cancelOrder, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { contracts, exchangeContractId, provider, strategyAuctionContractId } from "global-constants";
import { Provider } from "fuels";

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
  const { wallet } = useAppSelector((state) => state.wallet);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);

  const onComplete = () => {
    const prov = new Provider("https://beta-3.fuel.network/graphql");
    setContracts(contracts, prov);
    nftdetailsService.getAuctionIndex([selectedNFT.id]).then((res) => {
      cancelOrder(exchangeContractId, provider, wallet, strategyAuctionContractId, res.data[selectedNFT.id], false)
        .then((res) => {
          console.log(res);
          nftdetailsService.tokenCancelAuction(selectedNFT.id);
          setApproved(true);
        })
        .catch(() => setStartTransaction(false));
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
        <CheckoutProcess onComplete={onComplete} data={checkoutProcessTexts} approved={approved} />
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
          name={selectedNFT.name}
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
