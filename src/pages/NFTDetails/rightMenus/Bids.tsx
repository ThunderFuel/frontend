import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconAuction, IconBid, IconEthereum } from "icons";
import RightMenu from "../components/RightMenu";
import AuctionCountdown from "../components/AuctionCountdown";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { toggleWalletModal } from "store/walletSlice";
import { dateFormat } from "utils";
import Avatar from "components/Avatar/Avatar";

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

  function isBidOwner(bidUserId: any) {
    return user?.id === bidUserId;
  }

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
                <Avatar image={bid?.user?.image} userId={bid?.user?.id} className={"w-8 h-8"} />
                <div>
                  {isBidOwner(bid?.user?.id) ? <span className="inline-block text-green">you</span> : bid.user.userName} on {dateFormat(bid.createdAt, "MMM DD, YYYY")}
                </div>
              </div>
              <div className="flex">
                {bid.price}
                <IconEthereum height="21px" className="text-gray-light" />
              </div>
            </div>
          </>
        </Box>
      ))}
    </RightMenu>
  );
};

export default Bids;
