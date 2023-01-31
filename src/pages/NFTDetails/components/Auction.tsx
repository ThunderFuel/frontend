import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconAuction, IconBid, IconEthereum } from "icons";

import { useAppDispatch, useAppSelector } from "store";
import AuctionCountdown from "./AuctionCountdown";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";

const Auction = () => {
  const dispatch = useAppDispatch();
  const { isOwner, hasBid, selectedNFT } = useAppSelector((state) => state.nftdetails);

  return (
    <div className="flex flex-col border border-gray rounded-md bg-gray">
      <div className="flex justify-between bg-bg-light mb-[1px] p-5">
        <div className="flex flex-col gap-y-[5px]">
          <span className="text-headlineMd font-bigShoulderDisplay text-gray-light">{selectedNFT.highestBid ? "HIGHEST BID" : "STARTING PRICE"}</span>
          <span className="flex text-h3 font-spaceGrotesk text-white items-center">
            {hasBid ? selectedNFT.highestBid : selectedNFT.startingPrice} <IconEthereum color="#838383" />
          </span>
        </div>
        <div className="flex flex-col gap-y-5 text-gray-light">
          <span className="flex items-center gap-x-2 text-headlineMd font-bigShoulderDisplay">
            <IconAuction width="17px" height="17px" /> AUCTION ENDS IN
          </span>
          <AuctionCountdown expireTime={selectedNFT.expireTime} />
        </div>
        <div className="flex h-fit items-center gap-x-[5px]"></div>
      </div>
      <div className="flex flex-col gap-y-[10px] bg-bg-light rounded-b p-5">
        {isOwner ? (
          <>
            <Button
              className="w-full text-button font-bigShoulderDisplay"
              onClick={() => {
                dispatch(setCheckout({ type: CheckoutType.AcceptOffer, price: selectedNFT.highestBid }));
                dispatch(toggleCheckoutModal());
              }}
            >
              ACCEPT BID
              <IconAuction />
            </Button>
          </>
        ) : (
          <>
            <Button
              className="w-full text-button font-bigShoulderDisplay "
              onClick={() => {
                dispatch(setRightMenu(RightMenuType.PlaceBid));
              }}
            >
              PLACE A BID
              <IconBid />
            </Button>
          </>
        )}
        {hasBid && (
          <Button
            className="btn-secondary no-bg "
            onClick={() => {
              dispatch(setRightMenu(RightMenuType.Bids));
            }}
          >
            SEE ALL BIDS <IconArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Auction;
