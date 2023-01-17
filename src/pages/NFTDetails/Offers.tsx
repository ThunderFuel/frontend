import React from "react";
import Button from "components/Button";
import { IconCancel, IconClock, IconEthereum, IconOffer } from "icons";
import RightMenu from "./components/RightMenu";
import { AssetTableImageNft1 } from "assets";

const Box = ({ expired, ownOffer }: { expired?: boolean; ownOffer?: boolean }) => {
  return (
    <div className="flex flex-col border border-gray rounded-lg text-head6 font-spaceGrotesk text-white">
      <div className={`flex w-full p-[15px]  gap-x-[15px]  ${expired ? "opacity-50" : ""}`}>
        <img src={AssetTableImageNft1} className="self-start w-8 rounded-full" alt="profile-image" />
        <div className="flex flex-col gap-y-[10px]">
          <span>09x910 on 12 Oct 2022</span>
          <div className="flex items-center p-[6px] gap-x-1 border text-bodyMd border-gray rounded-[5px]">
            <IconClock width="15px" height="15px" />
            Expires on 16 Oct 2022, 12:00 PM GMT+2
          </div>
        </div>
        <div className="flex h-fit grow justify-end">
          1.33
          <IconEthereum height="21px" className="text-gray-light" />
        </div>
      </div>
      {ownOffer && (
        <div className="flex border-t border-gray">
          <Button className="btn w-full btn-sm no-bg border-none text-white">
            CANCEL OFFER
            <IconCancel width="18px" />
          </Button>
          <div className="flex border-r border-gray"></div>
          <Button className="btn w-full btn-sm no-bg border-none text-white ">
            UPDATE OFFER
            <IconOffer width="18px" />
          </Button>
        </div>
      )}
    </div>
  );
};

const Offers = ({ onBack }: { onBack: any }) => {
  return (
    <RightMenu title="Offers" onBack={onBack}>
      <Button className="btn-secondary no-bg">
        MAKE OFFER <IconOffer />
      </Button>
      <Box></Box>
      <Box ownOffer={true}></Box>
      <Box expired={true}></Box>
    </RightMenu>
  );
};

export default Offers;
