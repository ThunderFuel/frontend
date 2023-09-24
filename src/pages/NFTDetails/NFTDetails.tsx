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
import { RightMenuType, setPresetPrice, setRightMenu, setSelectedNFT, setYourCurrentOffer } from "store/NFTDetailsSlice";
import collectionsService from "api/collections/collections.service";
import { CollectionItemResponse } from "api/collections/collections.type";
import Img from "components/Img";
import "./nftdetails.css";
import FullScreenImage from "components/FullScreenImage";
import Listings from "./rightMenus/Listings";

const None = React.memo(() => {
  return <div />;
});
None.displayName = "None";
const NFTDetails = () => {
  const { nftId } = useParams();

  const dispatch = useAppDispatch();
  const { rightMenuType } = useAppSelector((state) => state.nftdetails);
  const { isConnected } = useAppSelector((state) => state.wallet);
  const { show } = useAppSelector((state) => state.checkout);

  const [isActive, setIsActive] = useState(false);
  const [nft, setNft] = useState<CollectionItemResponse>({} as any);
  const [showFullscreenImage, setshowFullscreenImage] = useState(false);

  const fetchCollection = async () => {
    const response = await collectionsService.getCollection({ id: nftId });
    setNft(response.data);
    dispatch(setSelectedNFT(response.data));
  };

  useEffect(() => {
    setIsActive(rightMenuType !== RightMenuType.None);
  }, [rightMenuType]);

  useEffect(() => {
    if (!isActive) {
      fetchCollection();
    }
  }, [nftId, isConnected, isActive, show]);

  useEffect(() => {
    if (!isConnected) {
      resetMenuState();
    }
  }, [isConnected]);

  useEffect(() => {
    return () => {
      resetMenuState();
      dispatch(setSelectedNFT({}));
    };
  }, []);

  const resetMenuState = () => {
    setIsActive(false);
    dispatch(setRightMenu(RightMenuType.None));
    dispatch(setPresetPrice(""));
    dispatch(setYourCurrentOffer(""));
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
      case RightMenuType.Listings:
        return Listings;
      default:
        return None;
    }
  }, [rightMenuType]);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="relative flex justify-between container-nftdetails">
        <div className="w-[42%]">
          <LeftMenu nft={nft} fetchCollection={fetchCollection} />
        </div>
        <div className={clsx("absolute right-0 top-0 h-full z-20 bg-bg-light w-[58%] duration-300 transform", isActive && "-translate-x-[72.4%]")}>
          <div className="sticky z-20" style={{ top: "var(--headerHeight)" }}>
            <div className="flex justify-center image-height py-10">
              <div className="relative w-full image-width bg-gray rounded-md">
                <Img src={nft.image} className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  h-full max-h-full max-w-full" />
              </div>
              <ImageBar nft={nft} toggleFullscreen={() => setshowFullscreenImage((prev) => !prev)} />
            </div>
          </div>
        </div>
        <div className="w-[42%]" id="rightMenuWrapper">
          <Component
            onBack={() => {
              resetMenuState();
              fetchCollection();
            }}
          />
        </div>
        <FullScreenImage image={nft.image} onClose={() => setshowFullscreenImage(false)} show={showFullscreenImage} />
      </div>
    </>
  );
};

export default NFTDetails;
