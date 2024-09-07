import React, { useState } from "react";
import clsx from "clsx";

import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconAccept, IconDone, IconInfo, IconOffer, IconSpinner, IconWarning } from "icons";
import { useAppSelector } from "store";
import { handleTransactionError } from "./components/CheckoutProcess";
import { useWallet } from "hooks/useWallet";
import collectionsService from "api/collections/collections.service";
import { isObjectEmpty, toGwei } from "utils";
import { ApprovedCartItemBottomPart, CartItemLoadingBottomPart, Footer, InitialCartItemBottomPart, Approved, TransactionFailed, TransactionRejected } from "./MakeOfferCheckout";
import config from "config";
import InputEthereum from "components/InputEthereum";
import Balances from "pages/NFTDetails/components/Balances";

const UpdateOfferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const nftdetails = useAppSelector((state) => state.nftdetails);
  const { currentItem, checkoutExpireTime, cancelOrderIds, currentItemId } = useAppSelector((state) => state.checkout);
  const [selectedNFT, setSelectedNFT] = useState<any>(!isObjectEmpty(nftdetails.selectedNFT) ? nftdetails.selectedNFT : currentItem);
  const { user, wallet } = useAppSelector((state) => state.wallet);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [bidBalanceUpdated, setBidBalanceUpdated] = useState(false);
  const [currentBidBalance, setCurrentBidBalance] = useState(0);
  const { handleUpdateOffer } = useWallet();
  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const { getBalance, hasEnoughBalance, handleMakeOffer, getBidBalance } = useWallet();

  const [isOnConfirmStep, setIsOnConfirmStep] = useState(false);
  const [offer, setoffer] = useState<any>("");
  const [balance, setbalance] = useState<any>(0);
  const [bidBalance, setBidBalance] = useState<number>(0);

  React.useEffect(() => {
    if (show && currentItemId && isObjectEmpty(selectedNFT))
      collectionsService.getCollection({ id: currentItemId }).then((res: any) => {
        setSelectedNFT(res.data);
      });
  }, [show, currentItemId, selectedNFT]);

  function fetchBalance() {
    getBalance().then((res) => setbalance(res ? res : 0));
  }
  function fetchBidBalance() {
    if (user.walletAddress === undefined) return;
    getBidBalance({ contractAddress: user.walletAddress, user: user }).then((res) => {
      setBidBalance(res);
    });
  }

  React.useEffect(() => {
    fetchBalance();
    fetchBidBalance();
  }, []);

  const onComplete = () => {
    try {
      handleUpdateOffer({
        setBidBalanceUpdated,
        setCurrentBidBalance,
        currentItem,
        checkoutPrice: offer,
        checkoutExpireTime,
        cancelOrderIds,
        user,
        wallet,
        setApproved,
        setStartTransaction,
        setIsFailed,
        wagmiSteps,
        setWagmiSteps,
        setStepData,
        selectedNFT,
      });
    } catch (e) {
      handleTransactionError({ error: e, setStartTransaction, setIsFailed });
    }

    return;
  };

  const onSubmit = () => {
    if (show) {
      setStartTransaction(true);
      setIsOnConfirmStep(true);
      onComplete();
    }
  };

  const bidBalanceControl = () => {
    return <span className="font-bold whitespace-nowrap">{parseFloat((offer - bidBalance).toFixed(9))} ETH</span>;
  };

  return (
    <Modal
      bodyClassName="!w-full !max-w-[600px]"
      backdropDisabled={true}
      className="checkout"
      show={show}
      onClose={onClose}
      footer={
        <Footer isOnConfirmStep={isOnConfirmStep} approved={approved} onClose={onClose} onSubmit={onSubmit} startTransaction={startTransaction} isFailed={isFailed} primaryActionText="Update Offer" />
      }
    >
      {isOnConfirmStep && (!startTransaction || isFailed) ? (
        <></>
      ) : (
        !approved && (
          <div className="sticky top-0 flex w-full justify-between border-b border-gray text-h6">
            <span className={clsx("flex items-center gap-2.5 w-full p-5 text-white", isOnConfirmStep ? "" : "bg-bg-light border-b border-white")}>
              {!isOnConfirmStep ? <IconOffer /> : <IconDone className="text-green" />} Update Your Offer
            </span>

            <div className="flex-shrink-0 w-[1px] bg-gray" />

            <span className={clsx("flex items-center gap-2.5 w-full p-5 text-white", isOnConfirmStep ? "bg-bg-light border-b border-white" : "")}>
              {approved ? <IconDone className="text-green" /> : <IconAccept />} Confirm
            </span>
          </div>
        )
      )}

      {isOnConfirmStep && !startTransaction ? (
        <TransactionRejected />
      ) : isOnConfirmStep && isFailed ? (
        <TransactionFailed />
      ) : approved ? (
        <div className="flex flex-col w-full gap-5 p-5">
          <Approved title="Offer Updated Successfully!" />

          <div className="flex w-full">
            <CartItem
              text="Your Offer"
              BottomPart={<ApprovedCartItemBottomPart floorPrice={selectedNFT?.collection?.floor} price={offer} />}
              price={offer}
              className="w-full"
              name={selectedNFT?.name ?? selectedNFT?.tokenOrder}
              image={selectedNFT?.image ?? selectedNFT.tokenImage}
              id={0}
            />
          </div>

          {bidBalanceUpdated && approved && (
            <div className="flex gap-x-2 p-[10px] rounded-[5px] bg-bg-light border border-gray">
              <IconInfo color="orange" />
              <div className="flex w-full flex-col gap-y-[6px] text-head6 font-spaceGrotesk text-white">
                {parseFloat((offer - currentBidBalance).toFixed(9))} ETH added to your balance.
                <span className="text-bodySm text-gray-light">
                  In order to make this offer {parseFloat((offer - currentBidBalance).toFixed(9))} ETH added to your bid balance. You can always view and withdraw your bid balance from your wallet.
                </span>
              </div>
            </div>
          )}
        </div>
      ) : !isOnConfirmStep ? (
        <>
          <div className="flex p-5">
            <CartItem className="w-full" name={selectedNFT?.name ?? selectedNFT?.tokenOrder} image={selectedNFT?.image ?? selectedNFT.tokenImage} id={0} />
          </div>

          <div className="flex flex-col gap-2 p-5">
            <h6 className="text-h6 text-white">Your Offer*</h6>
            <div className="flex gap-[5px] body-small text-gray-light">
              <IconInfo className="flex-shrink-0 w-[17px] h-[17px]" />
              {config.getConfig("type") === "fuel" ? (
                <span>Required amount will be automatically added to your bid balance.</span>
              ) : (
                <span>If your offer is more than your bid balance, you will be prompted to convert your ETH into wETH in the following step.</span>
              )}
            </div>
            <InputEthereum maxLength="8" onChange={setoffer} value={offer} type="text" />
            {!hasEnoughBalance(balance, offer) && offer !== "" && (
              <div className="flex w-full items-center gap-x-[5px] text-red">
                <IconWarning width="17px" />
                <span className="text-bodySm font-spaceGrotesk">You don`t have enough funds to make this offer.</span>
              </div>
            )}
            {!toGwei(offer).eq(0) && balance >= toGwei(offer) && offer > bidBalance && (
              <div className="flex items-center gap-x-[5px] text-bodySm text-orange font-spaceGrotesk">
                <IconInfo width="17px" />
                <span>{bidBalanceControl()} will be automatically added your bid balance to place this bid.</span>
              </div>
            )}
            <div className="flex flex-col gap-[5px]">
              <Balances balance={balance} onFetchBalance={fetchBalance} />
              <InitialCartItemBottomPart floorPrice={selectedNFT?.collection?.floor} bestOffer={selectedNFT?.bestOffer?.price} currentOffer={selectedNFT?.currentOfferItemOffer} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-center flex-col gap-8 px-[25px] pt-5 pb-[50px]">
          <CartItem
            BottomPart={<CartItemLoadingBottomPart offer={offer} />}
            className="w-full"
            name={selectedNFT?.name ?? selectedNFT?.tokenOrder}
            image={selectedNFT?.image ?? selectedNFT?.tokenImage}
            id={0}
          />

          <IconSpinner className="animate-spin text-white w-10 h-10" />

          <div className="flex flex-col gap-2">
            <h5 className="text-h5 text-white text-center">Confirm in Wallet</h5>
            <span className="text-gray-light body-medium text-center">Waiting for you to confirm the transaction in your wallet.</span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UpdateOfferCheckout;
