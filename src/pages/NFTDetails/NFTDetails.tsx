import React, { useState, useEffect } from "react";
import { AssetMockNFT1 } from "assets";
import clsx from "clsx";
import ImageBar from "./components/ImageBar";
import LeftMenu from "./components/LeftMenu";
import ListNFT from "./rightMenus/ListNFT";
import PlaceBid from "./rightMenus/PlaceBid";
import MakeOffer from "./rightMenus/MakeOffer";
import UpdateOffer from "./rightMenus/UpdateOffer";
import Activity from "./rightMenus/Activity";
import Bids from "./rightMenus/Bids";
import Offers from "./rightMenus/Offers";
import { useAppDispatch, useAppSelector } from "store";
import { setRightMenu } from "store/NFTDetailsSlice";

const NFTDetails = () => {
  const dispatch = useAppDispatch();
  const { rightMenuType } = useAppSelector((state) => state.nftdetails);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(rightMenuType !== "");
  }, [rightMenuType]);

  const resetMenuState = () => {
    setIsActive(false);
    dispatch(setRightMenu(""));
  };

  function handlePageNavigation() {
    switch (rightMenuType) {
      case "activity":
        return <Activity onBack={() => resetMenuState()} />;
      case "bids":
        return <Bids onBack={() => resetMenuState()} />;
      case "listnft":
        return <ListNFT onBack={() => resetMenuState()} />;
      case "makeoffer":
        return <MakeOffer onBack={() => resetMenuState()} />;
      case "offers":
        return <Offers onBack={() => resetMenuState()} />;
      case "placebid":
        return <PlaceBid onBack={() => resetMenuState()} />;
      case "updateoffer":
        return <UpdateOffer onBack={() => resetMenuState()} />;
      case "updatelisting":
        return <ListNFT updateListing={true} onBack={() => resetMenuState()} />;
      default:
        return <></>;
    }
  }

  return (
    <div className="relative flex justify-between">
      <div className="w-2/5">
        {/* <LeftMenu onChange={() => setIsActive(true)} />
         */}
        <LeftMenu />
      </div>
      <div className={clsx("absolute right-0 top-0 h-full z-20 bg-bg-light w-3/5 duration-300 transform", isActive && "-translate-x-2/3")}>
        <div className="sticky z-20 top-[112px]">
          <div className="flex gap-x-5 px-[100px] py-10">
            <img src={AssetMockNFT1} />
            <ImageBar />
          </div>
        </div>
      </div>
      <div className="w-2/5 h-fit">{handlePageNavigation()}</div>
    </div>
  );
};

export default NFTDetails;
