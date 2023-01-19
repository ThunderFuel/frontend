import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconBid, IconEthereum } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { setCheckoutType, toggleCheckoutModal } from "store/checkoutSlice";
import RightMenu from "../components/RightMenu";
import InfoBox from "../components/InfoBox";
import CartItem from "../components/CartItem";
import BidInput from "../components/BidInput";

const bidDescription =
  "When you’re placing a bid you need to add funds to your bid balance. Required amount will be automatically added to your bid balance. You can withdraw your bid balance anytime.";

const PlaceBid = () => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);

  const footer = (
    <div className="flex flex-col text-head6 font-spaceGrotesk text-white">
      <div className="flex flex-col gap-y-2 px-5 py-2 border-b border-gray">
        <div className="flex justify-between">
          <span className="text-gray-light">Wallet Balance</span>
          <div className="flex items-center ">
            2.5
            <IconEthereum width="20px" color="gray" />
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-light">Bid Balance </span>
          <div className="flex items-center">
            1.25
            <IconEthereum width="20px" color="gray" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-x-3 px-5 py-5">
        <Button className="btn-secondary">
          ADD FUNDS <IconArrowRight />
        </Button>
        <Button
          onClick={() => {
            dispatch(setCheckoutType("PlaceBid"));
            dispatch(toggleCheckoutModal());
          }}
        >
          PLACE A BID <IconBid />
        </Button>
      </div>
    </div>
  );

  return (
    <RightMenu title="Place a Bid" footer={footer}>
      <InfoBox title="Placing a Bid" description={bidDescription} />
      <CartItem selectedNFT={selectedNFT} />
      <BidInput text="Bid" />
    </RightMenu>
  );
};

export default PlaceBid;
