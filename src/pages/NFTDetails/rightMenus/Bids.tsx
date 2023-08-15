import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconAuction, IconBid, IconClock } from "icons";
import RightMenu from "../components/RightMenu";
import AuctionCountdown from "../components/AuctionCountdown";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { toggleWalletModal } from "store/walletSlice";
import { addressFormat, timeagoFormat } from "utils";
import Avatar from "components/Avatar/Avatar";
import ActivityList from "components/ActivityList/ActivityList";
import { ITableHeader } from "components/Table";
import EthereumPrice from "components/EthereumPrice/EthereumPrice";

// const Box = ({ children }: { children: React.ReactNode }) => {
//   return <div className="flex flex-col border border-gray rounded-lg text-head6 font-spaceGrotesk text-white">{children}</div>;
// };

const headers: ITableHeader[] = [
  {
    key: "from",
    text: `FROM`,
    width: "24%",
    align: "flex-start",
    sortValue: 1,
    render: (item) => (
      <div className={`flex w-full items-center p-[15px] gap-x-[15px]  ${item.isExpired ? "opacity-50" : ""}`}>
        <Avatar image={item?.userImage} userId={item?.makerUserId} className={"w-8 h-8 flex-shrink-0"} />
        <div className="flex  flex-col gap-y-[10px]">
          <span>{item.ownOffer ? <span className="text-green">you</span> : item.makerUserName ?? addressFormat(item.makerAddress)} </span>
        </div>
      </div>
    ),
    // renderHeader: (header) => <span>asasas</span>,
  },
  {
    key: "price",
    text: "PRICE",
    width: "20%",
    align: "flex-end",
    render: (item) => <EthereumPrice price={item.price} priceClassName="text-h6" />,
  },
  {
    key: "floor difference",
    text: "FLOOR DIFFERENCE",
    width: "28%",
    align: "flex-end",
    sortValue: 2,
    render: () => <span className="text-bodyMd font-spaceGrotesk">40% Below</span>,
    // renderHeader: (header) => <span>asasas</span>,
  },
  {
    key: "expires",
    text: "EXPIRES",
    width: "24%",
    align: "flex-end",
    sortValue: 3,
    render: (item) => (
      <span className="flex items-center gap-[5px] text-bodyMd font-spaceGrotesk">
        {timeagoFormat(item.expireTime)}
        <IconClock className="flex-shrink-0 w-[15px] h-[15px]" />
      </span>
    ),
  },
];

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

  // function isBidOwner(bidUserId: any) {
  //   return user?.id === bidUserId;
  // }

  return (
    <RightMenu title="Bids" onBack={onBack}>
      <div className="flex flex-col p-5 gap-y-5 border border-gray rounded-lg">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-2 text-headlineMd font-bigShoulderDisplay text-gray-light">
            <IconAuction width="17px" /> AUCTION ENDS IN
          </span>
          <AuctionCountdown expireTime={selectedNFT.expireTime ?? selectedNFT.onAuctionExpireTime} />
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
      {/* {bids.map((bid: any, index) => (
        <Box key={index}>
          <>
            <div className="flex items-center justify-between p-[15px]">
              <div className="flex items-center gap-x-[15px]">
                <Avatar image={bid?.user?.image} userId={bid?.user?.id} className={"w-8 h-8"} />
                <div>
                  {isBidOwner(bid?.user?.id) ? <span className="inline-block text-green">you</span> : bid.user.userName ?? addressFormat(bid.user.walletAddress)} on{" "}
                  {dateFormat(bid.createdAt, "MMM DD, YYYY")}
                </div>
              </div>
              <div className="flex">
                {bid.price}
                <IconEthereum height="21px" className="text-gray-light" />
              </div>
            </div>
          </>
        </Box>
      ))} */}
      <ActivityList noTitle={true} noContainerFluid={true} hideSidebar={true} activities={bids} headers={headers} />
    </RightMenu>
  );
};

export default Bids;
