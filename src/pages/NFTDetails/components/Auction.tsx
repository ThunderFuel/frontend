import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconAuction, IconBid, IconEthereum } from "icons";

import { useAppDispatch, useAppSelector } from "store";
import AuctionCountdown from "./AuctionCountdown";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import { toggleWalletModal } from "store/walletSlice";

const Auction = () => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const highestBid = JSON.stringify(selectedNFT.highestBid) !== "null";
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const [isOwner, setIsOwner] = React.useState(false);
  React.useEffect(() => {
    setIsOwner(user?.id === selectedNFT?.user?.id);
  }, [user, selectedNFT]);

  return (
    <div className="flex flex-col border border-gray rounded-md">
      <div className={`flex justify-between bg-bg-light p-5 ${isOwner && !highestBid ? "rounded-md" : ""}`}>
        <div className="flex flex-col gap-y-[5px]">
          <span className="text-headlineMd font-bigShoulderDisplay text-gray-light">{highestBid ? "HIGHEST BID" : "STARTING PRICE"}</span>
          <span className="flex text-h3 font-spaceGrotesk text-white items-center">
            {highestBid ? selectedNFT.highestBid?.price : selectedNFT.startingPrice ?? 0} <IconEthereum color="#838383" />
          </span>
        </div>
        <div className="flex flex-col gap-y-5 text-gray-light">
          <span className="flex items-center gap-x-2 text-headlineMd font-bigShoulderDisplay">
            <IconAuction width="17px" height="17px" /> AUCTION ENDS IN
          </span>
          <AuctionCountdown expireTime={selectedNFT.expireTime ?? selectedNFT.onAuctionExpireTime} />
        </div>
      </div>
      {!(isOwner && !highestBid) && (
        <div className="flex flex-col gap-y-[10px] bg-bg-light rounded-b p-5 border-t border-gray">
          {isOwner && highestBid ? (
            <>
              <Button
                className="w-full text-button font-bigShoulderDisplay"
                onClick={() => {
                  dispatch(setCheckout({ type: CheckoutType.AcceptOffer, price: selectedNFT.highestBid?.price }));
                  dispatch(toggleCheckoutModal());
                }}
              >
                ACCEPT BID
                <IconAuction />
              </Button>
            </>
          ) : (
            <>
              {!isOwner && (
                <Button
                  className="w-full text-button font-bigShoulderDisplay "
                  onClick={() => {
                    if (!isConnected) dispatch(toggleWalletModal());
                    else dispatch(setRightMenu(RightMenuType.PlaceBid));
                  }}
                >
                  PLACE A BID
                  <IconBid />
                </Button>
              )}
            </>
          )}
          {highestBid && (
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
      )}
    </div>
  );
};

export default Auction;
