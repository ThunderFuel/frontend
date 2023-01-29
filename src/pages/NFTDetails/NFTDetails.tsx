import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import collectionsService from "api/collections/collections.service";
import { CollectionItemResponse } from "api/collections/collections.type";

const NFTDetails = () => {
  const { nftId } = useParams();

  const dispatch = useAppDispatch();
  const { rightMenuType } = useAppSelector((state) => state.nftdetails);
  const [isActive, setIsActive] = useState(false);
  const [nft, setNft] = useState<CollectionItemResponse>({} as any);

  const fetchCollection = async () => {
    const response = await collectionsService.getCollection({ id: nftId });
    setNft(response.data);
  };

  useEffect(() => {
    setIsActive(rightMenuType !== RightMenuType.None);
  }, [rightMenuType]);

  useEffect(() => {
    fetchCollection();
  }, [nftId]);

  const resetMenuState = () => {
    setIsActive(false);
    dispatch(setRightMenu(RightMenuType.None));
  };

  const Component = React.useMemo(() => {
    switch (rightMenuType) {
      case RightMenuType.Activities:
        return Activity;
      case RightMenuType.Bids:
        return Bids;
      case RightMenuType.ListNFT:
        return ListNFT;
      case RightMenuType.MakeOffer:
        return MakeOffer;
      case RightMenuType.Offers:
        return Offers;
      case RightMenuType.PlaceBid:
        return PlaceBid;
      case RightMenuType.UpdateOffer:
        return UpdateOffer;
      case RightMenuType.UpdateListing:
        return ListNFT;
      default:
        return React.Fragment;
    }
  }, [rightMenuType]);

  return (
    <div className="relative flex justify-between">
      <div className="w-2/5">
        <LeftMenu nft={nft} />
      </div>
      <div className={clsx("absolute right-0 top-0 h-full z-20 bg-bg-light w-3/5 duration-300 transform", isActive && "-translate-x-2/3")}>
        <div className="sticky z-20 top-[112px]">
          <div className="flex gap-x-5 px-[100px] py-10">
            <img src={nft.image} />
            <ImageBar />
          </div>
        </div>
      </div>
      <div className="w-2/5 h-fit">
        <Component updateListing={true} onBack={() => resetMenuState()} />
      </div>
    </div>
  );
};

export default NFTDetails;
