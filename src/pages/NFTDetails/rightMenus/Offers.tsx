import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconCancel, IconClock, IconOffer, IconWarning } from "icons";
import RightMenu from "../components/RightMenu";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { useParams } from "react-router";
import EthereumPrice from "components/EthereumPrice";
import Avatar from "components/Avatar";
import { addressFormat, dateFormat } from "utils";
import { toggleWalletModal } from "store/walletSlice";
import { OfferStatus } from "api/offer/offer.type";
import clsx from "clsx";

const Box = ({
  item,
  isExpired,
  ownOffer,
  isOwner,
  fetchOffers,
  isAccepted,
}: {
  item: any;
  isExpired?: boolean;
  ownOffer?: boolean;
  isOwner: () => boolean;
  fetchOffers: any;
  onBack: any;
  isAccepted: boolean;
}) => {
  const dispatch = useAppDispatch();
  const formattedDate = dateFormat(item.expireTime, "DD MMM YYYY, HH:ss A Z");

  const Icon = item.isExpired || item.isCanceled ? IconWarning : IconClock;
  const description = item.isCanceled ? "Canceled" : item.isExpired ? "Expired" : `Expires on ${formattedDate}`;

  const isDisabled = item.isExpired || item.isCanceled;

  return (
    <div className={clsx("flex flex-col border border-gray rounded-lg text-h6", isDisabled ? "text-gray-light" : "text-white")}>
      <div className={`flex w-full p-[15px] gap-x-[15px]  ${isExpired ? "opacity-50" : ""}`}>
        <Avatar image={item?.user?.image} userId={item?.user?.id} className={"w-8 h-8 flex-shrink-0"} />
        <div className="flex flex-col gap-y-[10px]">
          <span>
            {item.makerUserName ?? addressFormat(item.makerAddress)} on {dateFormat(item.createdAt, "MMM DD, YYYY")}
          </span>
          <div className="flex items-center p-[6px] gap-x-1 border text-bodyMd border-gray rounded-[5px]">
            <Icon className="w-[15px] h-[15px] flex-shrink-0" />
            {description}
          </div>
        </div>
        <div className="flex h-fit grow justify-end">
          <EthereumPrice price={item.price} priceClassName="text-h6" />
        </div>
      </div>
      {isOwner() && !isExpired && !isAccepted && (
        <div className="flex border-t border-gray">
          <Button
            className="btn w-full btn-sm no-bg border-none text-white"
            onClick={() => {
              dispatch(
                setCheckout({
                  type: CheckoutType.AcceptOffer,
                  item: item,
                  price: item.price,
                  onCheckoutComplete: fetchOffers,
                })
              );
              dispatch(toggleCheckoutModal());
            }}
          >
            ACCEPT OFFER
            <IconOffer width="18px" />
          </Button>
        </div>
      )}
      {ownOffer && !isExpired && (
        <div className="flex border-t border-gray">
          <Button
            className="btn w-full btn-sm no-bg border-none text-white"
            onClick={() => {
              dispatch(setCheckout({ type: CheckoutType.CancelOffer, item: item, onCheckoutComplete: fetchOffers }));
              dispatch(toggleCheckoutModal());
            }}
          >
            CANCEL OFFER
            <IconCancel width="18px" />
          </Button>
          <div className="flex border-r border-gray"></div>
          <Button
            className="btn w-full btn-sm no-bg border-none text-white"
            onClick={() => {
              dispatch(setCheckout({ item: item }));
              dispatch(setRightMenu(RightMenuType.UpdateOffer));
            }}
          >
            UPDATE OFFER
            <IconOffer width="18px" />
          </Button>
        </div>
      )}
    </div>
  );
};

const Offers = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const isOwner = () => {
    return user.id === selectedNFT.user.id;
  };

  const { nftId } = useParams();
  const [offers, setOffers] = useState<any>([]);

  const fetchOffers = async () => {
    const response = await nftdetailsService.getOffers({ tokenId: selectedNFT.id, page: 1, pageSize: 10 });
    const data = response.data.map((item: any) => ({
      ...item,
      isActiveOffer: item.status === OfferStatus.ActiveOffer,
      isExpired: item.status === OfferStatus.ExpiredOffer,
      isCanceled: item.status === OfferStatus.Cancelled,
      isAccepted: item.status === OfferStatus.AcceptedOffer,
    }));
    setOffers(data);
  };

  useEffect(() => {
    fetchOffers();
  }, [nftId]);

  return (
    <RightMenu title="Offers" onBack={onBack}>
      {!isOwner() && (
        <Button
          className="btn-secondary no-bg"
          onClick={() => {
            if (!isConnected) dispatch(toggleWalletModal());
            else dispatch(setRightMenu(RightMenuType.MakeOffer));
          }}
        >
          MAKE OFFER <IconOffer />
        </Button>
      )}
      {offers.map((offer: any, index: any) => {
        if (offer.isCanceled) {
          return <></>;
        }

        return (
          <Box
            item={offer}
            key={index}
            isOwner={isOwner}
            ownOffer={user.id === offer?.makerUserId && offer.isActiveOffer}
            fetchOffers={fetchOffers}
            onBack={onBack}
            isExpired={offer.isExpired}
            isAccepted={offer.isAccepted}
          />
        );
      })}
    </RightMenu>
  );
};

export default Offers;
