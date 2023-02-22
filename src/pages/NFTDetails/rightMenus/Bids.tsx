import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconAuction, IconBid, IconCancel, IconEthereum } from "icons";
import RightMenu from "../components/RightMenu";
import AuctionCountdown from "../components/AuctionCountdown";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { formatDate } from "./Offers";
import { toggleWalletModal } from "store/walletSlice";

const Box = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col border border-gray rounded-lg text-head6 font-spaceGrotesk text-white">{children}</div>;
};

const Bids = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const [bids, setBids] = useState([]);
  const [isOwner, setIsOwner] = React.useState(false);
  React.useEffect(() => {
    setIsOwner(user?.id === selectedNFT?.user?.id);
  }, [user]);

  const fetchBids = async () => {
    const response = await nftdetailsService.tokenGetBids({ page: 1, pageSize: 10, tokenId: selectedNFT.id });
    setBids(response.data);
  };

  useEffect(() => {
    fetchBids();
  }, [selectedNFT]);

  return (
    <RightMenu title="Bids" onBack={onBack}>
      <div className="flex flex-col p-5 gap-y-5 border border-gray rounded-lg">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-2 text-headlineMd font-bigShoulderDisplay text-gray-light">
            <IconAuction width="17px" /> AUCTION ENDS IN
          </span>
          <AuctionCountdown expireTime={selectedNFT.expireTime} />
        </div>
        {!isOwner && (
          <Button
            className="btn-secondary w-full text-button font-bigShoulderDisplay"
            onClick={() => {
              if (!isConnected) dispatch(toggleWalletModal());
              else dispatch(setRightMenu(RightMenuType.PlaceBid));
            }}
          >
            PLACE A BID
            <IconBid />
          </Button>
        )}
      </div>
      {bids.map((bid: any, index) => (
        <Box key={index}>
          <>
            <div className="flex items-center justify-between p-[15px]">
              <div className="flex items-center gap-x-[15px]">
                <img src={bid.user?.image} className="self-start h-8 w-8 rounded-full" alt="profile-image" />
                <div>
                  {isOwner ? <span className="inline-block text-green">you</span> : bid.user.userName} on {formatDate(bid.createdAt)}
                </div>
              </div>
              <div className="flex">
                {bid.price}
                <IconEthereum height="21px" className="text-gray-light" />
              </div>
            </div>
            {isOwner && (
              <>
                <div className="flex border-t border-gray"></div>
                <Button
                  className="btn w-full btn-sm no-bg border-none text-white"
                  onClick={() => {
                    dispatch(setCheckout({ type: CheckoutType.CancelBid }));
                    dispatch(toggleCheckoutModal());
                  }}
                >
                  CANCEL YOUR BID
                  <IconCancel width="18px" />
                </Button>
              </>
            )}
          </>
        </Box>
      ))}
    </RightMenu>
  );
};

export default Bids;
