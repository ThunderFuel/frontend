/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import clsx from "clsx";
import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import { IconAccept, IconDone, IconInfo, IconOffer, IconSpinner, IconWarning } from "icons";
import { useAppSelector } from "store";
import { useWallet } from "hooks/useWallet";
import config from "config";
import InputEthereum from "components/InputEthereum";
import { toGwei } from "utils";
import Balances from "pages/NFTDetails/components/Balances";
import EthereumPrice from "components/EthereumPrice";
import collectionsService from "api/collections/collections.service";

const Footer = ({ approved, onClose, onSubmit, isOnConfirmStep }: { approved: boolean; onClose: any; onSubmit: () => void; isOnConfirmStep: boolean }) => {
  if (isOnConfirmStep)
    return approved ? (
      <div className={"flex w-full gap-2.5 items-center justify-center p-5"}>
        <Button className="btn-primary w-full tracking-widest" onClick={onClose}>
          CLOSE
        </Button>
      </div>
    ) : (
      <></>
    );

  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", "h-[96px] opacity-100")}>
      {approved ? (
        <div className={"flex w-full gap-2.5 items-center justify-center p-5"}>
          <Button className="btn-primary w-full tracking-widest" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      ) : (
        <div className={"flex w-full gap-2.5 items-center justify-center p-5"}>
          <Button className="btn-secondary w-full tracking-widest" onClick={onClose}>
            CANCEL
          </Button>
          <Button className="w-full tracking-widest" onClick={onSubmit}>
            MAKE OFFER
            <IconOffer />
          </Button>
        </div>
      )}
    </div>
  );
};

const OfferSubmitted = () => {
  return (
    <div className="flex-center flex-col gap-8 py-[50px] px-[25px]">
      <IconAccept className="text-white w-10 h-10" />

      <div className="flex flex-col gap-2">
        <h5 className="text-h5 text-white text-center">Offer Submitted Successfully!</h5>
        <span className="text-gray-light body-medium text-center">You'll receive a notification once the owner accepts it. You can manage your offers in the "Offers" tab of your profile.</span>
      </div>
    </div>
  );
};

const ApprovedCartItemBottomPart = ({ floorPrice, price }: { price: number; floorPrice?: number }) => {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex flex-col gap-[5px]">
        {floorPrice && (
          <div className="flex justify-between w-full text-h6">
            <span className="text-gray-light">Floor Price</span>
            <EthereumPrice price={floorPrice} priceClassName="body-medium !font-medium" />
          </div>
        )}
        <div className="flex justify-between w-full text-h6">
          <span className="text-green">Your Offer</span>
          <EthereumPrice price={price} priceClassName="body-medium !font-medium text-green" iconClassName="text-green" />
        </div>
      </div>

      {/* <div className="flex gap-8">
        <span className="cursor-pointer body-medium !font-medium underline text-gray-light hover:text-white">View on Your Offers</span>
        <span className="cursor-pointer body-medium !font-medium underline text-gray-light hover:text-white">View on Blockchain</span>
      </div> */}
    </div>
  );
};

const InitialCartItemBottomPart = ({ floorPrice, bestOffer }: { floorPrice?: number; bestOffer?: number }) => {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex flex-col gap-[5px]">
        {floorPrice && (
          <div className="flex justify-between w-full text-h6">
            <span className="text-gray-light">Floor Price</span>
            <EthereumPrice price={floorPrice} priceClassName="body-medium !font-medium" />
          </div>
        )}
        {bestOffer && (
          <div className="flex justify-between w-full text-h6">
            <span className="text-orange">Best Offer</span>
            <EthereumPrice price={bestOffer} priceClassName="body-medium !font-medium text-orange" iconClassName="text-orange" />
          </div>
        )}
      </div>
    </div>
  );
};

const MakeOfferCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const { checkoutExpireTime, currentItemId } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);
  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [bidBalanceUpdated, setBidBalanceUpdated] = useState(false);
  const [currentBidBalance, setCurrentBidBalance] = useState(0);
  const [isFailed, setIsFailed] = useState(false);
  const { getBalance, hasEnoughBalance, handleMakeOffer, getBidBalance } = useWallet();

  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const [isOnConfirmStep, setIsOnConfirmStep] = useState(false);
  const [offer, setoffer] = useState<any>("");
  const [balance, setbalance] = useState<any>(0);
  const [bidBalance, setBidBalance] = useState<number>(0);

  React.useEffect(() => {
    if (show && currentItemId)
      collectionsService.getCollection({ id: currentItemId }).then((res: any) => {
        setSelectedNFT(res.data);
      });

    // setApproved(false);
    // setStartTransaction(false);
    // if (show) {
    //   setStartTransaction(true);
    // }
  }, [show, currentItemId]);

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
      handleMakeOffer({
        checkoutExpireTime,
        checkoutPrice: offer,
        setApproved,
        setWagmiSteps,
        wagmiSteps,
        setStepData,
        user,
        wallet,
        setStartTransaction,
        setIsFailed,
        selectedNFT,
        setBidBalanceUpdated,
        setCurrentBidBalance,
      });
    } catch (error) {
      setIsFailed(true);
    }
  };

  const onSubmit = () => {
    if (show) {
      setIsOnConfirmStep(true);
      onComplete();
    }
  };

  const bidBalanceControl = () => {
    return <span className="font-bold whitespace-nowrap">{parseFloat((offer - bidBalance).toFixed(9))} ETH</span>;
  };

  return (
    <Modal backdropDisabled={true} className="checkout" show={show} onClose={onClose} footer={<Footer isOnConfirmStep={isOnConfirmStep} approved={approved} onClose={onClose} onSubmit={onSubmit} />}>
      <div className="sticky top-0 flex w-full justify-between border-b border-gray text-h6">
        <span className={clsx("flex items-center gap-2.5 w-full p-5 text-white", isOnConfirmStep ? "" : "bg-bg-light border-b border-white")}>
          {!isOnConfirmStep ? <IconOffer /> : <IconDone className="text-green" />} Make Offer
        </span>

        <div className="flex-shrink-0 w-[1px] bg-gray" />

        <span className={clsx("flex items-center gap-2.5 w-full p-5 text-white", isOnConfirmStep ? "bg-bg-light border-b border-white" : "")}>
          {approved ? <IconDone className="text-green" /> : <IconAccept />} Confirm
        </span>
      </div>

      {approved ? (
        <div className="flex flex-col w-full gap-5 p-5">
          <OfferSubmitted />

          <div className="flex w-full">
            <CartItem
              text="Your Offer"
              BottomPart={<ApprovedCartItemBottomPart floorPrice={selectedNFT?.collection?.floor} price={offer} />}
              price={offer}
              className="w-full"
              name={selectedNFT?.name ?? selectedNFT?.tokenOrder}
              image={selectedNFT?.image}
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
            <CartItem
              BottomPart={<InitialCartItemBottomPart floorPrice={selectedNFT?.collection?.floor} bestOffer={selectedNFT?.bestOffer?.price} />}
              className="w-full"
              name={selectedNFT?.name ?? selectedNFT?.tokenOrder}
              image={selectedNFT?.image ?? ""}
              id={0}
            />
          </div>

          <div className="flex flex-col gap-2 p-5">
            <h6 className="text-h6 text-white">Enter Price*</h6>
            <div className="flex gap-[5px] body-small text-gray-light">
              <IconInfo className="flex-shrink-0 w-[17px] h-[17px]" />
              {config.getConfig("type") === "fuel" ? (
                <span>When you’re placing a bid required amount will be automatically added to your bid balance.</span>
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
          </div>

          <div className="border-t border-gray px-5">
            <Balances balance={balance} onFetchBalance={fetchBalance} />
          </div>
        </>
      ) : (
        <div className="flex-center flex-col gap-8 border-t border-gray py-[50px] px-[25px]">
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

export default MakeOfferCheckout;
