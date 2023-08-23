import React, { useState } from "react";
import { IconCircleCheck, IconCircleRemoveWhite, IconClock, IconHand, IconInfo, IconLikeHand, IconLink, IconWarning } from "icons";
import Img from "components/Img/Img";
import EthereumPrice from "components/EthereumPrice";
import NotFound from "components/NotFound";

import { addressFormat, dateFormat, timeagoFormat } from "utils";
import Button from "components/Button";
import { useOfferContext } from "../OfferContext";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { getAbsolutePath } from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { OfferStatus } from "api/offer/offer.type";
import { useAppSelector } from "store";
import Table, { ITableHeader } from "../../Table";
import LazyImg from "../../LazyImg";

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
      <Button
        className="btn-secondary btn-sm rounded-t-none border-r-0"
        onClick={() => {
          onCancelOffer(item);
        }}
      >
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
const OfferItem = ({ item, onAcceptOffer, onCancelOffer, onUpdateOffer, isOnHold = null, getBidBalance }: any) => {
  const { options, userInfo } = useProfile();
  const path = getAbsolutePath(PATHS.NFT_DETAILS, { nftId: item?.tokenId });
  const isDisabled = item.isExpired || item.isCanceled;
  const [offerOwnerBidBalance, setOfferOwnerBidBalance] = useState(null as any);

  const fetchBidBalance = async () => {
    try {
      const response = await getBidBalance(item.makerUserId);
      setOfferOwnerBidBalance(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    if (!item.isOfferMade && offerOwnerBidBalance === null) fetchBidBalance();
  }, []);

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
          <Img className={clsx("w-full", isDisabled ? "opacity-50" : "", isOnHold && item.isOfferMade ? "opacity-50" : "")} src={item.tokenImage ?? null} alt={item.tokenName} />
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
          {isOnHold && options?.isProfile && item.isActiveOffer ? (
            <div className="flex gap-1 rounded-[5px] p-[6px] border border-gray text-orange">
              <IconInfo className=" flex-shrink-0 w-[15px] h-[15px]" /> <span className="text-bodyMd">Offer exceeds your bid balance. Offer is on hold until you add funds to your bid balance.</span>
            </div>
          ) : (
            <></>
          )}
          {offerOwnerBidBalance < item.price && !item.isOfferMade && options?.isProfile && item.isActiveOffer ? (
            <div className="flex gap-1 rounded-[5px] p-[6px] border border-gray text-orange">
              <IconInfo className=" flex-shrink-0 w-[15px] h-[15px]" />{" "}
              <span className="text-bodyMd">Offer amount exceeds bidder`s current balance. Offer is on hold until bidder has enough bid balance.</span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <EthereumPrice className={isDisabled ? "text-gray-light" : "text-white"} price={item.price} />
      </div>
      {options?.isProfile && item.isActiveOffer ? (
        offerOwnerBidBalance < item.price && !item.isOfferMade ? (
          <div className="flex-center px-4 py-3 gap-[6px] border border-gray rounded-[5px] bg-gray text-gray-light">
            <span className="text-headline-02">ON HOLD</span>
            <IconHand className="w-[18px] h-[18px]" />
          </div>
        ) : !item.isOfferMade ? (
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

const OfferCollectionItem = ({ item }: any) => {
  return (
    <div className="flex w-full items-center p-2.5 gap-2.5">
      <LazyImg className="w-10 h-10 rounded-md" src={item.token.image} />
      <h6 className="text-h6 text-white">{item.token.name ?? "-"}</h6>
    </div>
  );
};

const defaultHeaders: ITableHeader[] = [
  {
    key: "item",
    text: `Item`,
    width: "20%",
    align: "flex-start",
    sortValue: 1,
    render: (item) => {
      console.log(item);

      return <OfferCollectionItem />;
    },
  },
  {
    key: "price",
    text: "PRICE",
    width: "20%",
    align: "flex-end",
    render: (item) => <EthereumPrice price={item?.price} priceClassName="text-h6" />,
  },
  {
    key: "quantity",
    text: `Quantity`,
    width: "20%",
    align: "flex-end",
    sortValue: 1,
    render: (item) => <span>{addressFormat(item?.fromUser?.walletAddress, 1)}</span>,
    // renderHeader: (header) => <span>asasas</span>,
  },
  {
    key: "to",
    text: `TO`,
    width: "20%",
    align: "flex-end",
    sortValue: 1,
    render: (item) => <span>{addressFormat(item?.toUser?.walletAddress, 1)}</span>,
  },

  {
    key: "date",
    text: "DATE",
    width: "20%",
    align: "flex-end",
    sortValue: 3,
    render: (item) => <span>{timeagoFormat(item?.createdAt)}</span>,
  },
];
console.log(defaultHeaders);
const OfferList = () => {
  const { user } = useAppSelector((state) => state.wallet);
  const { onCancelAllOffer, onAcceptOffer, onCancelOffer, onUpdateOffer, filterValue, getOffers, bidBalance, getBidBalance, options } = useOfferContext();
  const isOffersMade = filterValue.offerType === 1;
  const label = `${getOffers.length} ${isOffersMade ? " offers made" : " offers receıved"}`;
  const hasActiveOffer = getOffers.some((offer: any) => offer.isActiveOffer);

  return (
    <div className="flex flex-col p-5 pr-7 gap-5 flex-1">
      <div className="flex items-center justify-between">
        <div className="text-headline-02 text-gray-light uppercase">{label}</div>
        {isOffersMade && hasActiveOffer && options.isProfile ? (
          <Button className="btn-secondary btn-sm" onClick={onCancelAllOffer}>
            cancel all offers <IconCircleRemoveWhite />
          </Button>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <Table headers={[]} items={getOffers} />
        {getOffers.map((item: any, k: any) => {
          if (isOffersMade) {
            return <OfferItem key={`${item.id}_${k}`} item={item} onAcceptOffer={onAcceptOffer} onCancelOffer={onCancelOffer} onUpdateOffer={onUpdateOffer} isOnHold={item.price > bidBalance} />;
          } else {
            if (item.ownerId !== user.id) {
              // return false;
            }

            return <OfferItem key={`${item.id}_${k}`} item={item} onAcceptOffer={onAcceptOffer} onCancelOffer={onCancelOffer} onUpdateOffer={onUpdateOffer} getBidBalance={getBidBalance} />;
          }
        })}
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
