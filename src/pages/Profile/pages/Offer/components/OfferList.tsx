import React from "react";
import { IconCircleCheck, IconCircleRemoveWhite, IconClock, IconHand, IconLikeHand, IconLink, IconWarning } from "icons";
import Img from "components/Img/Img";
import EthereumPrice from "components/EthereumPrice";
import NotFound from "components/NotFound";

import { addressFormat, dateFormat } from "utils";
import Button from "components/Button";
import { useOfferContext } from "../OfferContext";
import clsx from "clsx";
import { useProfile } from "../../../ProfileContext";
import { Link } from "react-router-dom";
import { getAbsolutePath } from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { OfferStatus } from "../../../../../api/offer/offer.type";

const OfferItemAcceptButton = ({ item, onAcceptOffer }: any) => {
  return (
    <Button className="btn-secondary btn-sm rounded-t-none w-full" onClick={() => onAcceptOffer(item)}>
      accept offer <IconLikeHand />
    </Button>
  );
};
const OfferItemUpdateButtons = ({ item, onCancelOffer, onUpdateOffer }: any) => {
  return (
    <div className="grid grid-cols-2">
      <Button className="btn-secondary btn-sm rounded-t-none border-r-0" onClick={() => onCancelOffer(item)}>
        cancel offer <IconCircleRemoveWhite />
      </Button>
      <Button className="btn-secondary btn-sm rounded-t-none" onClick={() => onUpdateOffer(item)}>
        update offer <IconHand />
      </Button>
    </div>
  );
};

const iconList = {
  [OfferStatus.AcceptedOffer]: IconCircleCheck,
  [OfferStatus.ExpiredOffer]: IconWarning,
  [OfferStatus.Cancelled]: IconWarning,
  [OfferStatus.ActiveOffer]: IconClock,
};

const OfferItemExpireLabel = ({ item }: any) => {
  if (!item.expireTime) {
    return null;
  }

  const Icon = iconList[item.status as OfferStatus] ?? IconClock;

  const formattedDate = dateFormat(item.expireTime, "DD MMM YYYY, HH:ss A Z");
  const description = item.isAccepted ? "Accepted" : item.isCanceled ? "Canceled" : item.isExpired ? "Expired" : `Expires on ${formattedDate}`;

  return (
    <div className={clsx("flex items-center border border-gray rounded-md gap-1 p-2.5 body-medium", item.isAccepted ? "text-green" : item.isCanceled ? "text-red" : "")}>
      <Icon className="w-4 h-5" />
      {description}
    </div>
  );
};
const OfferItem = ({ item, onAcceptOffer, onCancelOffer, onUpdateOffer }: any) => {
  const { options, userInfo } = useProfile();
  const path = getAbsolutePath(PATHS.NFT_DETAILS, { nftId: item?.tokenId });
  const isDisabled = item.isExpired || item.isCanceled;

  const getOfferMadeUserLabel = () => {
    if (options?.isProfile && item.isOfferMade) {
      return <span className={isDisabled ? "text-gray-light" : "text-green"}> you </span>;
    }
    if (item.isOfferMade) {
      return <span className={isDisabled ? "text-gray-light" : "text-white"}> {userInfo.userName ?? addressFormat(item.makerAddress)} </span>;
    }

    return <span className={isDisabled ? "text-gray-light" : "text-white"}> {addressFormat(item.makerAddress)} </span>;
  };

  return (
    <div>
      <div
        className={clsx(
          "flex items-start justify-between p-2.5 gap-5 border-t border-x border-gray rounded-t-md",
          !options?.isProfile ? "border-b rounded-b-md" : !item.isActiveOffer ? "border-b rounded-b-md" : ""
        )}
      >
        <Link to={path} className="w-16 h-16 rounded-md overflow-hidden relative group">
          <Img className={clsx("w-full", isDisabled ? "opacity-50" : "")} src={item.tokenImage ?? null} alt={item.tokenName} />
          <div className="opacity-0 ease-in-out transform duration-300 group-hover:opacity-100 absolute bg-gray bg-opacity-80 top-0 left-0 w-full h-full flex-center">
            <IconLink className="text-white" />
          </div>
        </Link>
        <div className={clsx("flex flex-col gap-5 flex-1", isDisabled ? "text-gray-light" : "text-white")}>
          <div className="flex flex-col gap-2.5">
            <h6 className="text-h6">{item?.tokenName ?? "-"}</h6>
            <div className="w-full body-medium text-gray-light">
              {!isDisabled ? "Bid placed by" : ""}
              {getOfferMadeUserLabel()}
              on <span className={isDisabled ? "text-gray-light" : "text-white"}>{dateFormat(item.createdAt, "DD MMM YYYY")}</span>
            </div>
          </div>
          <div className="inline-flex">
            <OfferItemExpireLabel item={item} />
          </div>
        </div>
        <EthereumPrice className={isDisabled ? "text-gray-light" : "text-white"} price={item.price} />
      </div>
      {options?.isProfile && item.isActiveOffer ? (
        !item.isOfferMade ? (
          <OfferItemAcceptButton onAcceptOffer={onAcceptOffer} item={item} />
        ) : (
          <OfferItemUpdateButtons onCancelOffer={onCancelOffer} onUpdateOffer={onUpdateOffer} item={item} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};
const OfferList = () => {
  const { onCancelAllOffer, onAcceptOffer, onCancelOffer, onUpdateOffer, filterValue, getOffers } = useOfferContext();
  const isOffersMade = filterValue.offerType === 1;
  const label = `${getOffers.length} ${isOffersMade ? " offers made" : " offers receıved"}`;
  const hasActiveOffer = getOffers.some((offer: any) => offer.isActiveOffer);

  return (
    <div className="flex flex-col p-5 pr-7 gap-5 flex-1">
      <div className="flex items-center justify-between">
        <div className="text-headline-02 text-gray-light uppercase">{label}</div>
        {isOffersMade && hasActiveOffer ? (
          <Button className="btn-secondary btn-sm" onClick={onCancelAllOffer}>
            cancel all offers <IconCircleRemoveWhite />
          </Button>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        {getOffers.map((item: any, k: any) => (
          <OfferItem key={`${item.id}_${k}`} item={item} onAcceptOffer={onAcceptOffer} onCancelOffer={onCancelOffer} onUpdateOffer={onUpdateOffer} />
        ))}
        {!getOffers.length && (
          <div className="flex-center">
            <NotFound>You didn’t make any offer yet.</NotFound>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferList;
