import React from "react";
import { IconCircleRemoveWhite, IconClock, IconHand } from "icons";
import Img from "components/Img/Img";
import ActivityItemDescription from "components/ActivityDescription";
import EthereumPrice from "components/EthereumPrice";
import NotFound from "components/NotFound";

import { dateFormat } from "utils";
import Button from "components/Button";

const OfferItem = ({ item }: any) => {
  return (
    <div>
      <div className="flex items-start justify-between p-2.5 gap-5 border-t border-x border-gray rounded-t-md">
        <div className="overflow-hidden rounded-md w-16 h-16 bg-gray">
          <Img className="w-full" src={item?.tokenImage} />
        </div>
        <div className="flex flex-col gap-5 text-white flex-1">
          <div className="flex flex-col gap-2.5">
            <h6 className="text-h6">{item?.tokenName ?? "-"}</h6>
            <ActivityItemDescription>Bid placed by 409x792 on 12 Oct 2022</ActivityItemDescription>
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
      <div className="grid grid-cols-2">
        <div className="flex border-y border-l border-gray rounded-b-md">
          <div className="flex-center w-full p-3 text-headline-02 uppercase text-white cursor-pointer hover:bg-bg-light">
            cancel offer <IconCircleRemoveWhite />
          </div>
        </div>
        <div className="flex border border-gray rounded-b-md">
          <div className="flex-center w-full p-3 text-headline-02 uppercase text-white cursor-pointer hover:bg-bg-light">
            update offer <IconHand />
          </div>
        </div>
      </div>
    </div>
  );
};
const OfferList = ({ offers }: any) => {
  return (
    <div className="flex flex-col p-5 pr-7 gap-5 flex-1">
      <div className="flex items-center justify-between">
        <div className="text-headline-02 text-gray-light uppercase">{offers.length} offers made</div>
        <Button className="btn-secondary btn-sm">
          cancel all offers <IconCircleRemoveWhite />
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {offers.map((item: any, k: any) => (
          <OfferItem key={`${item.id}_${k}`} item={item} />
        ))}
        {!offers.length && (
          <div className="flex-center">
            <NotFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferList;
