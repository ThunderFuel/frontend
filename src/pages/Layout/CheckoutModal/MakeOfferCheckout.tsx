import React, { useState } from "react";
import clsx from "clsx";
import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import { IconInfo, IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { depositAndPlaceOrder, placeOrder, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { NativeAssetId } from "fuels";
import { contracts, exchangeContractId, provider, strategyFixedPriceContractId, ZERO_B256 } from "global-constants";
import { formatTimeBackend, formatTimeContract, toGwei } from "utils";
import userService from "api/user/user.service";
import { FuelProvider } from "../../../api";

const checkoutProcessTexts = {
  title1: "Confirm transaction",
  description1: "Proceed in your wallet and confirm transaction",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your offer submitted!",
  description3: "Congrats, you offer succesfully submitted.",
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

const MakeOfferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { checkoutPrice, checkoutExpireTime } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);
  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [bidBalanceUpdated, setBidBalanceUpdated] = useState(false);
  const [currentBidBalance, setCurrentBidBalance] = useState(0);
  const [isFailed, setIsFailed] = useState(false);

  const onComplete = () => {
    nftdetailsService.getLastIndex(1, user.id).then((res) => {
      const order = {
        isBuySide: true,
        maker: user.walletAddress,
        collection: selectedNFT.collection.contractAddress,
        token_id: selectedNFT.tokenOrder,
        price: toGwei(checkoutPrice).toNumber(),
        amount: 1, //fixed
        nonce: res.data + 1,
        strategy: strategyFixedPriceContractId,
        payment_asset: NativeAssetId,
        expiration_range: formatTimeContract(checkoutExpireTime),
        extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
      };

      setContracts(contracts, FuelProvider);

      userService.getBidBalance(user.id).then((res) => {
        setCurrentBidBalance(res.data);
        const _currentBidBalance = res.data;
        console.log(_currentBidBalance);
        if (_currentBidBalance < checkoutPrice) {
          const requiredBidAmount = (checkoutPrice - _currentBidBalance).toFixed(9);
          depositAndPlaceOrder(exchangeContractId, provider, wallet, order, toGwei(requiredBidAmount).toNumber(), NativeAssetId)
            .then((res) => {
              console.log(res);
              if (res.transactionResult.status.type === "success") {
                nftdetailsService.makeOffer({
                  makerUserId: user.id,
                  tokenId: selectedNFT.id,
                  price: checkoutPrice,
                  priceType: 0,
                  expireTime: formatTimeBackend(checkoutExpireTime),
                });
                userService.updateBidBalance(user.id, Number(requiredBidAmount)).then(() => setBidBalanceUpdated(true));
                setApproved(true);
              }
            })
            .catch((e) => {
              console.log(e);
              if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
                setStartTransaction(false);
              else setIsFailed(true);
            });
        } else
          placeOrder(exchangeContractId, provider, wallet, order)
            .then((res) => {
              console.log(res);
              if (res.transactionResult.status.type === "success") {
                nftdetailsService.makeOffer({
                  makerUserId: user.id,
                  tokenId: selectedNFT.id,
                  price: checkoutPrice,
                  priceType: 0,
                  expireTime: formatTimeBackend(checkoutExpireTime),
                });
                setApproved(true);
              }
            })
            .catch((e) => {
              console.log(e);
              if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
                setStartTransaction(false);
              else setIsFailed(true);
            });
      });
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

  return (
    <Modal backdropDisabled={true} className="checkout" title="Make Offer" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
      <div className="flex flex-col p-5">
        <CartItem text={"Your Offer"} name={selectedNFT.name ?? selectedNFT.tokenOrder} image={selectedNFT.image} price={checkoutPrice} id={0}></CartItem>
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
      {bidBalanceUpdated && approved && (
        <div className="flex gap-x-2 p-[10px] m-5 rounded-[5px] bg-bg-light border border-gray">
          <IconInfo color="orange" />
          <div className="flex w-full flex-col gap-y-[6px] text-head6 font-spaceGrotesk text-white">
            {(checkoutPrice - currentBidBalance).toFixed(9)} ETH added to your balance.
            <span className="text-bodySm text-gray-light">
              In order to make this offer {(checkoutPrice - currentBidBalance).toFixed(9)} ETH added to your bid balance. You can always view and withdraw your bid balance from your wallet.
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MakeOfferCheckout;
