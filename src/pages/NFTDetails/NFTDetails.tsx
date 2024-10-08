import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import ImageBar from "./components/ImageBar";
import LeftMenu from "./components/LeftMenu";
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
import NoContent from "components/NoContent";
import { useIsMobile } from "hooks/useIsMobile";
const body = document.querySelector("body");

const None = React.memo(() => {
  return <div />;
});
None.displayName = "None";

export const Image = ({ nft }: any) =>
  nft.image ? (
    <Img src={nft.image} className="lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2 h-full max-h-full max-w-full" />
  ) : (
    <NoContent className="rounded-md" />
  );

const NFTDetails = () => {
  const { nftId } = useParams();
  const isMobile = useIsMobile();
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
    if (isActive && body) {
      body.style.overflow = "hidden";
    } else if (body) {
      body.style.overflow = "auto";
    }
  }, [isActive]);

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
      case RightMenuType.MakeOffer:
        return MakeOffer;
      case RightMenuType.Offers:
        return Offers;
      case RightMenuType.PlaceBid:
        return PlaceBid;
      case RightMenuType.UpdateOffer:
        return UpdateOffer;
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
      <div className="flex flex-col relative lg:flex-row lg:justify-between container-nftdetails">
        <div className="lg:w-[42%] pb-[56px] lg:pb-0">
          <LeftMenu nft={nft} fetchCollection={fetchCollection} />
        </div>
        {!isMobile && (
          <div className={clsx("lg:absolute right-0 top-0 h-full z-20 bg-bg-light w-[58%] duration-300 transform", isActive && "-translate-x-[72.4%]")}>
            <div className="sticky z-20" style={{ top: "var(--headerHeight)" }}>
              <div className="flex justify-center image-height py-10">
                <div className="relative w-full image-width bg-gray rounded-md">
                  <Image nft={nft} />
                </div>
                <ImageBar nft={nft} toggleFullscreen={() => setshowFullscreenImage((prev) => !prev)} />
              </div>
            </div>
          </div>
        )}
        <div className="lg:w-[42%]" id="rightMenuWrapper">
          <Component
            onBack={() => {
              resetMenuState();
              fetchCollection();
            }}
          />
        </div>
        <FullScreenImage image={nft.image ?? ""} onClose={() => setshowFullscreenImage(false)} show={showFullscreenImage} />
      </div>
    </>
  );
};

export default NFTDetails;
