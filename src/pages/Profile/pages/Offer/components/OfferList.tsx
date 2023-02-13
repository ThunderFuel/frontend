import React from "react";
import { IconCircleRemoveWhite, IconClock, IconHand, IconLikeHand } from "icons";
import Img from "components/Img/Img";
import ActivityItemDescription from "components/ActivityDescription";
import EthereumPrice from "components/EthereumPrice";
import NotFound from "components/NotFound";

import { dateFormat } from "utils";
import Button from "components/Button";
import { useOfferContext } from "../OfferContext";
import clsx from "clsx";

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

const OfferItem = ({ item, onAcceptOffer, onCancelOffer, onUpdateOffer }: any) => {
  return (
    <div>
      <div className={clsx("flex items-start justify-between p-2.5 gap-5 border-t border-x border-gray rounded-t-md", !item.isActiveOffer ? "border-b rounded-b-md" : "")}>
        <div className="overflow-hidden rounded-md w-16 h-16 bg-gray">
          <Img className="w-full" src={item?.tokenImage} />
        </div>
        <div className="flex flex-col gap-5 text-white flex-1">
          <div className="flex flex-col gap-2.5">
            <h6 className="text-h6">{item?.tokenName ?? "-"}</h6>
            <ActivityItemDescription
              activityType={item.activityType}
              fromUserContractAddress={item.fromUser?.walletAddress}
              toUserContractAddress={item.toUser?.walletAddress}
              createdTimeStamp={item.createdTimeStamp}
            />
          </div>
          <div className="inline-flex">
            {item.expireTime && (
              <div className="flex items-center border border-gray rounded-md gap-1 p-2.5 body-medium">
                <IconClock className="w-4 h-5" />
                Expires on {dateFormat(item.expireTime, "DD MMM YYYY, HH:ss A Z")}
              </div>
            )}
          </div>
        </div>
        <EthereumPrice className="text-white" price={item.price} />
      </div>
      {item.isActiveOffer ? (
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
  const { offers, onCancelAllOffer, onAcceptOffer, onCancelOffer, onUpdateOffer, filterValue } = useOfferContext();
  const isOffersMade = filterValue;
  const label = `${offers.length} ${isOffersMade ? " offers made" : " offers receıved"}`;
  const hasActiveOffer = offers.some((offer) => offer.isActiveOffer);

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
        {offers.map((item: any, k: any) => (
          <OfferItem key={`${item.id}_${k}`} item={item} onAcceptOffer={onAcceptOffer} onCancelOffer={onCancelOffer} onUpdateOffer={onUpdateOffer} />
        ))}
        {!offers.length && (
          <div className="flex-center">
            <NotFound>You didn’t make any offer yet.</NotFound>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferList;
