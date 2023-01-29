import { AssetCollectionProfileImage, AssetMockCreator, AssetTableImageNft1 } from "assets";
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

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx("group flex items-center w-full py-4 pl-2.5 gap-x-2.5 rounded-[5px] border border-gray", className)}>{children}</div>;
};
const BoxWithIcon = React.memo(({ children, className, icon }: { children: React.ReactNode; className?: string; icon: React.FC<SVGProps<SVGSVGElement>> }) => {
  const Icon = icon;

  return (
    <div className={clsx("group flex items-center w-full py-4 pl-2.5 gap-x-2.5 rounded-[5px] border border-gray", className)}>
      <div className="h-fit rounded-full bg-gray p-[6px]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-y-[5px]">{children}</div>
    </div>
  );
});
BoxWithIcon.displayName = "BoxWithIcon";

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

const Footer = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-end px-5 py-5 text-h6 text-white">
      <Button
        onClick={() => {
          dispatch(setRightMenu(RightMenuType.ListNFT));
        }}
      >
        LIST YOUR NFT <IconListed />
      </Button>
    </div>
  );
};
const FooterListed = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-end px-5 py-5 gap-x-3 text-h6 text-white">
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
};
const FooterAuction = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-end px-5 py-5 gap-x-3 text-h6 text-white">
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
};
const LeftMenu = (props: any) => {
  const { nft } = props;

  const dispatch = useAppDispatch();
  const { isOwner, hasBid } = useAppSelector((state) => state.nftdetails);
  const { walletConnect } = useWallet();
  const [hasOffer, sethasOffer] = useState(false);
  const [onAuction, setonAuction] = useState(false);

  const bestOffer = "0.99";
  const offerOwner = "09x910";

  return (
    <div className="flex flex-col border-r border-gray overflow-hidden overflow-y-scroll">
      <div className="flex flex-col">
        <div className="container-fluid flex flex-col pt-10 pb-5 pr-10 border-b border-gray">
          <div className="flex gap-2 mb-[5px]">
            {nft?.collection?.image && <img src={nft.collection.image} className="w-6 rounded-[px]" alt="profile-image" />}
            <div className="flex flex-col w-full">
              <h6 className="text-h6 text-gray-light">{nft?.collection?.name}</h6>
            </div>
          </div>
          <h3 className="text-h3 text-white">{nft.name}</h3>
        </div>
        <div className="container-fluid flex flex-col gap-y-5 pt-5 pb-5 pr-10 border-b border-gray">
          <div className="hover:bg-bg-light cursor-pointer flex w-fit gap-2 items-center border border-gray rounded-[5px] py-2.5 pl-2.5 pr-5">
            <img src={nft?.user?.image ?? AssetTableImageNft1} className="w-8 rounded-full" alt="profile-image" />
            <h6 className="text-h6 text-gray-light">
              Owned by
              <span className={clsx(isOwner ? "text-green" : "text-white")}>{isOwner ? "you" : nft?.user?.userName}</span>
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
            <Button className={clsx("p-3 font-bold normal-case", onAuction ? "bg-green" : "bg-red")} onClick={() => setonAuction(!onAuction)}>
              onAuction
            </Button>
            <Button className={clsx("p-3 font-bold normal-case", hasBid ? "bg-green" : "bg-red")} onClick={() => dispatch(toggleHasBid())}>
              hasBid
            </Button>
          </div>
          {/**********************/}

          <div className="body-medium text-white">{nft?.collection?.description}</div>

          {nft.salable && <FixedPrice />}
          {onAuction ? <Auction /> : hasOffer ? <BestOffer /> : <MakeOffer />}

          {hasOffer && (
            <Box className="bg-bg-light justify-between pr-4">
              <div className="flex items-center gap-x-2.5">
                <img src={AssetCollectionProfileImage} className="w-8 rounded-full" alt="profile-image" />
                <div className="flex flex-col gap-y-[5px]">
                  <span className="text-headline-02 text-gray-light">BEST OFFER</span>
                  <h6 className="text-h6 text-white">
                    {bestOffer} ETH by {offerOwner}
                  </h6>
                </div>
              </div>
              <div className="flex gap-x-2.5">
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
        <div className="container-fluid flex flex-col gap-y-5 pt-5 pb-5 pr-10 border-b border-gray text-h6 text-white">
          <MetadataTable metadata={nft.tokenAttributes ?? []} />
          <div className="flex flex-col gap-y-2.5">
            <div className="flex flex-row gap-x-2.5">
              <Box className="hover:bg-bg-light">
                <div className="flex h-fit rounded-full bg-gray p-[6px]">
                  <IconDocument className="opacity-1 group-hover:opacity-0 transition-opacity duration-500 h-5 w-5" />
                  <IconContract className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-5 w-5" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headline-02 text-gray-light">CONTRACT ADDRESS</div>
                  {nft?.collection?.contractAddress}
                </div>
              </Box>
              <BoxWithIcon className="hover:bg-bg-light" icon={IconToken}>
                <div className="text-headline-02 text-gray-light"> TOKEN ID</div>
                {nft.id}
              </BoxWithIcon>
            </div>
            <div className="flex flex-row gap-x-2.5">
              <Box className="hover:bg-bg-light">
                <div className="flex items-center justify-center rounded-full">
                  <img src={AssetMockCreator} className="w-8" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headline-02 text-gray-light"> CREATOR</div>
                  {nft?.user?.firstName}
                </div>
              </Box>
              <Box>
                <div className="h-fit rounded-full bg-gray p-[6px]">
                  <IconFee className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headline-02 text-gray-light">CREATOR FEE</div>
                  {nft.rarity}%
                </div>
              </Box>
            </div>
            <Box className="hover:bg-bg-light justify-between pr-4">
              <div className="flex gap-x-2.5">
                <div className="h-fit rounded-full bg-gray p-[6px]">
                  <IconOffer className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headline-02 text-gray-light">LAST ACTIVITY</div>
                  {nft.listedTime}
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
        <div className="container-fluid flex flex-col pt-5 pb-9 pr-10 text-h6 text-white">
          <h6 className="mb-5">Share to Earn %1</h6>
          <div className="flex flex-col gap-y-2.5">
            <Box className="relative">
              <div className="flex opacity-100 gap-x-2.5 items-center transition-all duration-500 group-hover:translate-x-5 group-hover:opacity-0">
                <div className="bg-gray rounded-full p-[6px] ">
                  <IconLink className="w-5 h-5" />
                </div>
                Copy 1% Link
              </div>
              <div
                className="absolute  cursor-pointer left-0 opacity-0 h-full flex items-center justify-center pl-2.5 gap-x-2.5 rounded-[5px] w-2/3 transition-all duration-300 group-hover:bg-gray group-hover:opacity-100 group-hover:w-full"
                onClick={walletConnect}
              >
                <div className="bg-gray rounded-full p-2.5">
                  <IconWallet className="w-5 h-5" />
                </div>
                Connect Your Wallet to Share
              </div>
            </Box>
            <div className="group flex items-center justify-between py-3 pl-2.5 pr-4 border border-gray rounded-[5px] hover:bg-bg-light">
              <div className="flex items-center gap-x-2.5">
                <div className="bg-gray rounded-full p-1.5">
                  <IconTwitter className="w-5 h-5" />
                </div>
                Tweet 1% Link
              </div>
              <HoverButton Icon={IconLink} text="COPY LINK" />
            </div>
          </div>
        </div>
      </div>
      <footer className={clsx("sticky bottom-0 w-full mt-auto border-t border-gray bg-bg", isOwner ? "block" : "hidden")}>
        {onAuction ? <FooterAuction /> : nft.sales ? <FooterListed /> : <Footer />}
      </footer>
    </div>
  );
};

export default LeftMenu;
