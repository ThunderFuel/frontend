import React from "react";
import Button from "components/Button";
import Img from "components/Img";
import ActivityItemDescription from "components/ActivityDescription";
import EthereumPrice from "components/EthereumPrice";
import { IconCircleRemoveWhite, IconClock, IconHand } from "icons";
import { AssetCollectionItem1 } from "assets";

const Activity = () => {
  return (
    <div className="flex flex-col px-5 py-6">
      <div className="flex items-center justify-between">
        <div className="text-headline-02 text-gray-light uppercase">3 offers made</div>
        <Button className="btn-secondary btn-sm">
          cancel all offers <IconCircleRemoveWhite />
        </Button>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <div key={item} className="">
              <div className="flex items-start justify-between p-2.5 gap-5 border-t border-x border-gray rounded-t-md">
                <div className="overflow-hidden rounded-md w-16 h-16">
                  <Img className="w-full" src={AssetCollectionItem1} />
                </div>
                <div className="flex flex-col gap-5 text-white flex-1">
                  <div className="flex flex-col gap-2.5">
                    <h6>Genuine Undead #1293</h6>
                    <ActivityItemDescription>Bid placed by 409x792 on 12 Oct 2022</ActivityItemDescription>
                  </div>
                  <div className="inline-flex">
                    <div className="flex items-center border border-gray rounded-md gap-1 p-2.5 body-medium">
                      <IconClock className="w-4 h-5" />
                      Expires on 16 Oct 2022, 12:00 PM GMT+2
                    </div>
                  </div>
                </div>
                <EthereumPrice className="text-white" price={0.99} />
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
        })}
      </div>
    </div>
  );
};

export default Activity;
