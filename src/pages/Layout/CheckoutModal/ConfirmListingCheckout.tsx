/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";

import { IconAccept, IconDone, IconEthereum, IconInfo, IconListed, IconSpinner } from "icons";
import { useAppSelector } from "store";
import { useWallet } from "hooks/useWallet";
import InputEthereum from "components/InputEthereum";
import collectionsService from "api/collections/collections.service";
import { formatPrice, isObjectEmpty } from "utils";
import EthereumPrice from "components/EthereumPrice";
import floorService from "api/floor/floor.service";
import { Approved, FooterCloseButton, TransactionFailed, TransactionRejected } from "./MakeOfferCheckout";

const Footer = ({
  approved,
  onClose,
  onSubmit,
  isOnConfirmStep,
  price,
  updateListing,
  startTransaction,
  isFailed,
}: {
  approved: boolean;
  onClose: any;
  onSubmit: () => void;
  isOnConfirmStep: boolean;
  price: any;
  updateListing?: boolean | undefined;
  startTransaction: boolean;
  isFailed: boolean;
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
          <Button className="w-full tracking-widest" disabled={!price || price === "" || price <= 0} onClick={onSubmit}>
            {updateListing ? "UPDATE LISTING" : "CONFIRM LISTING"}
            <IconListed />
          </Button>
        </div>
      )}
    </div>
  );
};

const ApprovedCartItemBottomPart = ({ price }: { price: number }) => {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex flex-col gap-[5px]">
        <div className="flex justify-between w-full text-h6">
          <span className="text-gray-light">Your Listing</span>
          <EthereumPrice price={price} priceClassName="body-medium !font-medium" />
        </div>
      </div>

      {/* <div className="flex gap-8">
        <span className="cursor-pointer body-medium !font-medium underline text-gray-light hover:text-white">View on Your Offers</span>
        <span className="cursor-pointer body-medium !font-medium underline text-gray-light hover:text-white">View on Blockchain</span>
      </div> */}
    </div>
  );
};

// const InitialCartItemBottomPart = ({ floorPrice, bestOffer }: { floorPrice?: number; bestOffer?: number }) => {
//   return (
//     <div className="flex flex-col gap-[15px]">
//       <div className="flex flex-col gap-[5px]">
//         {floorPrice && (
//           <div className="flex justify-between w-full text-h6">
//             <span className="text-gray-light">Floor Price</span>
//             <EthereumPrice price={floorPrice} priceClassName="body-medium !font-medium" />
//           </div>
//         )}
//         {bestOffer && (
//           <div className="flex justify-between w-full text-h6">
//             <span className="text-orange">Best Offer</span>
//             <EthereumPrice price={bestOffer} priceClassName="body-medium !font-medium text-orange" iconClassName="text-orange" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const ConfirmListingCheckout = ({ show, onClose, updateListing }: { show: boolean; onClose: any; updateListing?: boolean }) => {
  const nftdetails = useAppSelector((state) => state.nftdetails);
  const [selectedNFT, setSelectedNFT] = useState<any>(nftdetails.selectedNFT);
  const serviceFee = 2.5;
  const [topTrait, setTopTrait] = useState(0);

  const { checkoutIsAuction, checkoutAuctionStartingPrice, checkoutExpireTime, currentItemId, checkoutPrice } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);

  const { handleConfirmListing } = useWallet();

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const [isOnConfirmStep, setIsOnConfirmStep] = useState(false);
  const [price, setprice] = useState<any>(checkoutPrice ?? "");

  const calculateReceivingAmount = (price: any) => {
    return price - (price * serviceFee) / 100 - (price * selectedNFT.collection?.royaltyFee) / 100;
  };

  React.useEffect(() => {
    if (show && currentItemId && isObjectEmpty(selectedNFT))
      collectionsService.getCollection({ id: currentItemId }).then((res: any) => {
        console.log(res);
        setSelectedNFT(res.data);
      });
  }, [show, currentItemId, selectedNFT]);

  const fetchTopTrait = async () => {
    try {
      const responseTopTrait = await floorService.getTopTraitByTokenIds([selectedNFT.id]);

      setTopTrait(responseTopTrait.data[selectedNFT.id]);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchTopTrait();
  }, [selectedNFT]);

  const onComplete = async () => {
    try {
      handleConfirmListing({
        checkoutExpireTime,
        checkoutPrice: price,
        setWagmiSteps,
        wagmiSteps,
        setStepData,
        user,
        wallet,
        setStartTransaction,
        setIsFailed,
        selectedNFT,
        checkoutIsAuction,
        checkoutAuctionStartingPrice,
        setApproved,
        updateListing,
      });
    } catch (error) {
      console.log(error);
      setIsFailed(true);
    }
  };

  React.useEffect(() => {
    setApproved(false);
    setStartTransaction(false);
    if (show) {
      setStartTransaction(true);
    }
  }, [show]);

  const onSubmit = () => {
    if (show) {
      setIsOnConfirmStep(true);
      onComplete();
    }
  };

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "") && price > 0;
  };

  const warning = (
    <div className="flex gap-x-[5px] items-center text-bodySm text-orange">
      <IconInfo width="17px" /> Your price is below the floor price {selectedNFT?.collection?.floor} ETH
    </div>
  );

  return (
    <Modal
      bodyClassName="!w-full !max-w-[600px]"
      backdropDisabled={true}
      className="checkout"
      show={show}
      onClose={onClose}
      footer={
        <Footer
          price={price}
          isOnConfirmStep={isOnConfirmStep}
          approved={approved}
          onClose={onClose}
          onSubmit={onSubmit}
          updateListing={updateListing}
          startTransaction={startTransaction}
          isFailed={isFailed}
        />
      }
    >
      {isOnConfirmStep && (!startTransaction || isFailed) ? (
        <></>
      ) : (
        !approved && (
          <div className="flex w-full justify-between border-b border-gray text-h6">
            <span className={clsx("flex items-center gap-2.5 w-full p-5 text-white", isOnConfirmStep ? "" : "bg-bg-light border-b border-white")}>
              {!isOnConfirmStep ? <IconListed /> : <IconDone className="text-green" />} {updateListing ? "Update Listing" : "Listing"}
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
          <Approved
            title={updateListing ? "Item Listing Updated Successfully!" : "Item Listed Successfully!"}
            description="Your item is listed on the marketplace. You can review and manage your listings in your profile."
          />

          <div className="flex w-full">
            <CartItem
              text="Your Offer"
              BottomPart={<ApprovedCartItemBottomPart price={price} />}
              price={price}
              className="w-full"
              name={selectedNFT?.name ?? selectedNFT?.tokenOrder}
              image={selectedNFT?.image}
              id={0}
            />
          </div>
        </div>
      ) : !isOnConfirmStep ? (
        <div className="flex flex-col gap-5 p-5">
          <div className="flex">
            <CartItem className="w-full" name={selectedNFT?.name ?? selectedNFT?.tokenOrder} image={selectedNFT?.image ?? ""} id={0} />
          </div>

          <div className="flex flex-col text-h6 font-spaceGrotesk text-white gap-2.5">
            {"Enter Price*"}
            <InputEthereum maxLength="8" onChange={setprice} value={price} type="text" />

            {price !== "" && price < selectedNFT?.floorPrice && warning}
            <div className="flex text-bodyMd gap-x-2">
              {selectedNFT?.collection?.floor && (
                <div className="flex p-[10px] rounded-[5px] border border-gray cursor-pointer hover:bg-gray" onClick={() => setprice(selectedNFT.collection?.floor)}>
                  {selectedNFT?.collection ? formatPrice(selectedNFT?.collection?.floor) : "-"} ETH - Floor Price
                </div>
              )}
              {topTrait ? (
                <div className="flex p-[10px] rounded-[5px] border border-gray cursor-pointer hover:bg-gray" onClick={() => setprice(topTrait)}>
                  {formatPrice(topTrait)} ETH - Top Trait Price
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col gap-[5px]">
              <div className="flex w-full justify-between">
                <div className="text-gray-light">Service Fee</div>
                <div className="">2.5%</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="text-gray-light">Creator Earnings</div>
                <div className={`${selectedNFT?.collection?.royaltyFee ? "" : "text-gray-light"}`}>{selectedNFT?.collection?.royaltyFee ? `${selectedNFT?.collection?.royaltyFee} %` : "-"}</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="text-gray-light">You’ll Receive</div>
                <div className={`flex items-center ${isValidNumber(price) ? "text-green" : "text-gray-light"}`}>
                  {isValidNumber(price) ? formatPrice(calculateReceivingAmount(price)) : "-"} <IconEthereum />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-center flex-col gap-8 px-[25px] pt-5 pb-[50px]">
          <CartItem
            text="Your Offer"
            BottomPart={<ApprovedCartItemBottomPart price={price} />}
            price={price}
            className="w-full"
            name={selectedNFT?.name ?? selectedNFT?.tokenOrder}
            image={selectedNFT?.image}
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

export default ConfirmListingCheckout;
