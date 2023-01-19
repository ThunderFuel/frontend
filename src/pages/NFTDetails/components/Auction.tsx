import Button from "components/Button";
import { IconArrowRight, IconAuction, IconBid, IconEthereum } from "icons";
import React from "react";

const Auction = () => {
  const highestBid = null;
  const startingPrice = "0.99";

  return (
    <div className="flex flex-col border border-gray rounded-md bg-gray">
      <div className="flex justify-between bg-bg-light mb-[1px] p-5">
        <div className="flex flex-col gap-y-[5px]">
          <span className="text-headlineMd font-bigShoulderDisplay text-gray-light">{highestBid ? "HIGHEST BID" : "STARTING PRICE"}</span>
          <span className="flex text-h3 font-spaceGrotesk text-white items-center">
            {highestBid ? highestBid : startingPrice} <IconEthereum color="#838383" />
          </span>
        </div>
        <div className="flex flex-col gap-y-5 text-gray-light">
          <span className="flex items-center gap-x-2 text-headlineMd font-bigShoulderDisplay">
            <IconAuction width="17px" /> AUCTION ENDS IN
          </span>
          {/* TODO: countdown i hallet */}
        </div>
        <div className="flex h-fit items-center gap-x-[5px]"></div>
      </div>
      <div className="flex flex-col gap-y-[10px] bg-bg-light rounded-b p-5">
        <Button className="w-full text-button font-bigShoulderDisplay ">
          PLACE A BID
          <IconBid />
        </Button>
        {highestBid && (
          <Button className="btn-secondary no-bg ">
            SEE ALL BIDS <IconArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Auction;
