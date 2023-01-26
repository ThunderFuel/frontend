import { AssetMockCreator, AssetTableImageNft1 } from "assets";
import clsx from "clsx";
import Button from "components/Button";
import { useWallet } from "hooks/useWallet";
import { IconAccept, IconArrowRight, IconCancel, IconContract, IconDocument, IconFee, IconLink, IconListed, IconOffer, IconToken, IconTwitter, IconUpdateListing, IconWallet } from "icons";
import React, { SVGProps, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import { RightMenuType, setRightMenu, toggleHasBid, toggleIsOwner } from "store/NFTDetailsSlice";
import Auction from "./Auction";
import BestOffer from "./BestOffer";
import FixedPrice from "./FixedPrice";
import MakeOffer from "./MakeOffer";
import MetadataTable from "./MetadataTable";
import { NFTData } from "./mockData";

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx("group flex items-center w-full py-4 pl-[10px] gap-x-[10px] rounded-[5px] border border-gray", className)}>{children}</div>;
};

const HoverButton = ({ Icon, text, btnClassName, onClick }: { Icon: React.FC<SVGProps<SVGSVGElement>>; text: string; btnClassName?: string; onClick?: any }) => {
  return (
    <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" onClick={onClick}>
      <Button className={clsx("btn-sm", btnClassName)}>
        {text}
        <Icon width="18px" height="18px" />
      </Button>
    </div>
  );
};

// const LeftMenu = ({ onChange }: { onChange: any }) => {
const LeftMenu = () => {
  const { collection, name, ownerName, collectionDesc, ownerImage, bestOffer, offerOwner, offerPicture, metadata, contractAddress, tokenId, creator, creatorsFee, lastActivity } = NFTData;

  const dispatch = useAppDispatch();
  const { isOwner, hasBid } = useAppSelector((state) => state.nftdetails);
  const { walletConnect } = useWallet();
  const [isListed, setisListed] = useState(false);
  const [hasOffer, sethasOffer] = useState(false);
  const [onAuction, setonAuction] = useState(false);

  const footer = (
    <div className="flex justify-end px-5 py-5 text-head6 font-spaceGrotesk text-white">
      <Button
        onClick={() => {
          dispatch(setRightMenu(RightMenuType.ListNFT));
        }}
      >
        LIST YOUR NFT <IconListed />
      </Button>
    </div>
  );

  const footerListed = (
    <div className="flex justify-end px-5 py-5 gap-x-3 text-head6 font-spaceGrotesk text-white">
      <Button className="btn-secondary">
        REMOVE FROM SALE
        <IconCancel />
      </Button>
      <Button
        onClick={() => {
          dispatch(setRightMenu(RightMenuType.UpdateListing));
        }}
      >
        UPDATE LISTING <IconUpdateListing />
      </Button>
    </div>
  );

  const footerAuction = (
    <div className="flex justify-end px-5 py-5 gap-x-3 text-head6 font-spaceGrotesk text-white">
      <Button
        className="btn-secondary"
        onClick={() => {
          dispatch(setCheckout({ type: CheckoutType.CancelAuction }));
          dispatch(toggleCheckoutModal());
        }}
      >
        CANCEL AUCTION
        <IconCancel />
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col border-r border-gray">
      <div className="flex flex-col overflow-y-scroll no-scrollbar">
        <div className="container-fluid flex flex-col pt-10 pb-5 pr-10 border-b border-gray">
          <div className="flex gap-[8px] mb-[5px]">
            <img src={ownerImage} className="w-6 rounded-[px]" alt="profile-image" />
            <div className="flex flex-col w-full">
              <h6 className="text-h6 text-gray-light">{collection}</h6>
            </div>
          </div>
          <h3 className="text-h3 text-white">{name}</h3>
        </div>
        <div className="container-fluid flex flex-col gap-y-5 pt-5 pb-5 pr-10 border-b border-gray">
          <div className="hover:bg-bg-light cursor-pointer flex w-fit gap-[8px] items-center border border-gray rounded-[5px] py-[10px] pl-[10px] pr-5">
            <img src={AssetTableImageNft1} className="w-8 rounded-full" alt="profile-image" />
            <h6 className="text-h6 text-gray-light">
              Owned by
              {isOwner ? <span className="text-green"> you</span> : <span className="text-white"> {ownerName}</span>}
            </h6>
          </div>

          {/**********************/}
          <div className="flex flex-wrap min-w-fit justify-center border-4 p-1 border-gray gap-2 rounded-lg">
            <Button className={clsx("p-3 font-bold normal-case", isOwner ? "bg-green" : "bg-red")} onClick={() => dispatch(toggleIsOwner())}>
              isOwner
            </Button>
            <Button className={clsx("p-3 font-bold normal-case", hasOffer ? "bg-green" : "bg-red")} onClick={() => sethasOffer(!hasOffer)}>
              hasOffer
            </Button>
            <Button className={clsx("p-3 font-bold normal-case", isListed ? "bg-green" : "bg-red")} onClick={() => setisListed(!isListed)}>
              isListed
            </Button>
            <Button className={clsx("p-3 font-bold normal-case", onAuction ? "bg-green" : "bg-red")} onClick={() => setonAuction(!onAuction)}>
              onAuction
            </Button>
            <Button className={clsx("p-3 font-bold normal-case", hasBid ? "bg-green" : "bg-red")} onClick={() => dispatch(toggleHasBid())}>
              hasBid
            </Button>
          </div>
          {/**********************/}

          <div className="text-bodyMd text-white">{collectionDesc}</div>

          {isListed ? <FixedPrice /> : onAuction ? <Auction /> : hasOffer ? <BestOffer /> : <MakeOffer />}

          {hasOffer && (
            <Box className="bg-bg-light justify-between pr-4">
              <div className="flex items-center gap-x-[10px]">
                <img src={offerPicture} className="w-8 rounded-full" alt="profile-image" />
                <div className="flex flex-col gap-y-[5px]">
                  <span className="text-headlineSm font-bigShoulderDisplay text-gray-light">BEST OFFER</span>
                  <h6 className="text-h6 font-spaceGrotesk text-white">
                    {bestOffer} ETH by {offerOwner}
                  </h6>
                </div>
              </div>
              <div className="flex gap-x-[10px]">
                <HoverButton Icon={IconArrowRight} text="SEE ALL" btnClassName="btn-secondary no-bg" onClick={() => dispatch(setRightMenu(RightMenuType.Offers))} />
                {isOwner && (
                  <HoverButton
                    Icon={IconAccept}
                    text="ACCEPT"
                    onClick={() => {
                      dispatch(setCheckout({ type: CheckoutType.AcceptOffer, price: bestOffer }));
                      dispatch(toggleCheckoutModal());
                    }}
                  />
                )}
              </div>
            </Box>
          )}
        </div>
        <div className="container-fluid flex flex-col gap-y-5 pt-5 pb-5 pr-10 border-b border-gray text-head6 font-spaceGrotesk text-white">
          <MetadataTable metadata={metadata} />
          <div className="flex flex-col gap-y-[10px]">
            <div className="flex flex-row gap-x-[10px]">
              <Box className=" hover:bg-bg-light">
                <div className="flex h-fit rounded-full bg-gray p-[6px]">
                  <IconDocument className="opacity-1 group-hover:opacity-0 transition-opacity duration-500" width="20px" height="20px" />
                  <IconContract className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500" width="20px" height="20px" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">CONTRACT ADDRESS</div>
                  {contractAddress}
                </div>
              </Box>
              <Box className="hover:bg-bg-light">
                <div className="h-fit rounded-full bg-gray p-[6px]">
                  <IconToken width="20px" height="20px" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headlineSm font-bigShoulderDisplay text-gray-light"> TOKEN ID</div>
                  {tokenId}
                </div>
              </Box>
            </div>
            <div className="flex flex-row gap-x-[10px]">
              <Box className="hover:bg-bg-light">
                <div className="flex items-center justify-center rounded-full">
                  <img src={AssetMockCreator} className="w-8" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headlineSm font-bigShoulderDisplay text-gray-light"> CREATOR</div>
                  {creator}
                </div>
              </Box>
              <Box>
                <div className="h-fit rounded-full bg-gray p-[6px]">
                  <IconFee width="20px" height="20px" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">CREATOR FEE</div>
                  {creatorsFee}%
                </div>
              </Box>
            </div>
            <Box className="hover:bg-bg-light justify-between pr-4">
              <div className="flex gap-x-[10px]">
                <div className="h-fit rounded-full bg-gray p-[6px]">
                  <IconOffer width="20px" height="20px" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">LAST ACTIVITY</div>
                  {lastActivity}
                </div>
              </div>
              <HoverButton
                Icon={IconArrowRight}
                text="SEE ALL"
                onClick={() => {
                  dispatch(setRightMenu(RightMenuType.Activities));
                }}
              />
            </Box>
          </div>
        </div>
        <div className="container-fluid flex flex-col pt-5 pb-[35px] pr-10 text-head6 font-spaceGrotesk text-white">
          <h6 className="mb-5">Share to Earn %1</h6>
          <div className="flex flex-col gap-y-[10px]">
            <Box className="relative">
              <div className="flex opacity-100 gap-x-[10px] items-center transition-all duration-500 group-hover:translate-x-5 group-hover:opacity-0">
                <div className="bg-gray rounded-full p-[6px] ">
                  <IconLink width="20px" height="20px" />
                </div>
                Copy 1% Link
              </div>
              <div
                className="absolute  cursor-pointer left-0 opacity-0 h-full flex items-center justify-center pl-[10px] gap-x-[10px] rounded-[5px] w-2/3 transition-all duration-300 group-hover:bg-gray group-hover:opacity-100 group-hover:w-full"
                onClick={walletConnect}
              >
                <div className="bg-gray rounded-full p-[6px]">
                  <IconWallet width="20px" height="20px" />
                </div>
                Connect Your Wallet to Share
              </div>
            </Box>
            <div className="group flex items-center justify-between py-3 pl-[10px] pr-4 border border-gray rounded-[5px] hover:bg-bg-light">
              <div className="flex items-center gap-x-[10px]">
                <div className="bg-gray rounded-full p-[6px]">
                  <IconTwitter width="20px" height="20px" />
                </div>
                Tweet 1% Link
              </div>
              <HoverButton Icon={IconLink} text="COPY LINK" />
            </div>
          </div>
        </div>
      </div>
      <footer className={`sticky bottom-0 w-full mt-auto border-t border-gray bg-bg ${isOwner ? "block" : "hidden"}`}>{onAuction ? footerAuction : isListed ? footerListed : footer}</footer>
    </div>
  );
};

export default LeftMenu;
