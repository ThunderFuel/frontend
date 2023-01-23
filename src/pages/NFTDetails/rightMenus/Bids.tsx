import React from "react";
import { AssetTableImageNft1 } from "assets";
import Button from "components/Button";
import { IconAuction, IconBid, IconCancel, IconEthereum } from "icons";
import RightMenu from "../components/RightMenu";
import AuctionCountdown from "../components/AuctionCountdown";
import { useAppDispatch } from "store";
import { setRightMenu } from "store/NFTDetailsSlice";
import { setCheckout, toggleCheckoutModal } from "store/checkoutSlice";

const Box = ({ children, ownBid }: { ownBid?: boolean; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col border border-gray rounded-lg text-head6 font-spaceGrotesk text-white">
      {children}

      {ownBid && <></>}
    </div>
  );
};

const Bids = ({ onBack }: { onBack: any }) => {
  const Bids = [
    { bidOwner: "09x910", bidOwnerImage: AssetTableImageNft1, date: "12 Oct 2022", bidDetails: "09x910 on 12 Oct 2022", bidPrice: "0.99" },
    { bidOwner: "1", bidOwnerImage: AssetTableImageNft1, date: "12 Oct 2022", bidDetails: "09x910 on 12 Oct 2022", bidPrice: "0.99" },
  ];
  const isOwner = (address: string) => {
    return address === "1" ? true : false;
  };
  const dispatch = useAppDispatch();

  return (
    <RightMenu title="Bids" onBack={onBack}>
      <div className="flex flex-col p-5 gap-y-5 border border-gray rounded-lg">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-2 text-headlineMd font-bigShoulderDisplay text-gray-light">
            <IconAuction width="17px" /> AUCTION ENDS IN
          </span>
          <AuctionCountdown />
        </div>
        <Button
          className="btn-secondary w-full text-button font-bigShoulderDisplay"
          onClick={() => {
            dispatch(setRightMenu("placebid"));
          }}
        >
          PLACE A BID
          <IconBid />
        </Button>
      </div>
      {Bids.map((item) => (
        <Box key="1">
          <>
            <div className="flex items-center justify-between p-[15px]">
              <div className="flex items-center gap-x-[15px]">
                <img src={item.bidOwnerImage} className="self-start w-8 rounded-full" alt="profile-image" />
                <div>
                  {isOwner(item.bidOwner) ? <span className="inline-block text-green">you</span> : item.bidOwner} on {item.date}
                </div>
              </div>
              <div className="flex  ">
                {item.bidPrice}
                <IconEthereum height="21px" className="text-gray-light" />
              </div>
            </div>
            {isOwner(item.bidOwner) && (
              <>
                <div className="flex border-t border-gray"></div>
                <Button
                  className="btn w-full btn-sm no-bg border-none text-white"
                  onClick={() => {
                    dispatch(setCheckout({ type: "CancelBid" }));
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
