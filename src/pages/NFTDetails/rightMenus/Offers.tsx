import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconCancel, IconClock, IconOffer } from "icons";
import RightMenu from "../components/RightMenu";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { useParams } from "react-router";
import EthereumPrice from "components/EthereumPrice";

export function formatDate(dateString: string) {
  if (dateString === null) return;

  const dateObject = new Date(dateString);

  return dateObject.toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateTime(dateString: string) {
  if (dateString === null) return;

  const dateObject = new Date(dateString);

  return dateObject.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

const Box = ({ item, isExpired, ownOffer }: { item: any; isExpired?: boolean; ownOffer?: boolean }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col border border-gray rounded-lg text-head6 font-spaceGrotesk text-white">
      <div className={`flex w-full p-[15px]  gap-x-[15px]  ${isExpired ? "opacity-50" : ""}`}>
        <img src={item.user?.image} className="self-start w-8 h-8 rounded-full" alt="profile-image" />
        <div className="flex flex-col gap-y-[10px]">
          <span>
            {item.user?.userName} on {formatDate(item.createdAt)}
          </span>
          <div className="flex  items-center p-[6px] gap-x-1 border text-bodyMd border-gray rounded-[5px]">
            <IconClock className="w-[15px] h-[15px] flex-shrink-0" />
            Expires on {formatDateTime(item.expireTime)}
          </div>
        </div>
        <div className="flex h-fit grow justify-end">
          <EthereumPrice price={item.price} priceClassName="text-head6 font-spaceGrotesk text-white" />
        </div>
      </div>
      {ownOffer && !isExpired && (
        <div className="flex border-t border-gray">
          <Button
            className="btn w-full btn-sm no-bg border-none text-white"
            onClick={() => {
              dispatch(setCheckout({ type: CheckoutType.CancelOffer, item: item }));
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
  const { user } = useAppSelector((state) => state.wallet);
  const isOwner = () => {
    return user.id === selectedNFT.user.id;
  };

  const { nftId } = useParams();
  const [offers, setOffers] = useState<any>([]);

  const fetchOffers = async () => {
    const response = await nftdetailsService.getOffers({ tokenId: selectedNFT.id, page: 1, pageSize: 10 });
    setOffers(response.data);
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
            dispatch(setRightMenu(RightMenuType.MakeOffer));
          }}
        >
          MAKE OFFER <IconOffer />
        </Button>
      )}
      {offers.map((offer: any, index: any) => {
        const expTime = new Date(offer.expireTime).getTime();
        const currentTime = new Date().getTime();

        return <Box item={offer} isExpired={currentTime > expTime} key={index} ownOffer={user.id === offer?.makerUserId && offer.status === 1}></Box>;
      })}
    </RightMenu>
  );
};

export default Offers;
