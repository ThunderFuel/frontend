/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import Button from "components/Button";
import { IconAccept, IconArrowRight, IconCancel, IconDocument, IconFee, IconFuelWallet, IconInfo, IconLinea, IconListed, IconMinus, IconPlus, IconToken, IconUpdateListing } from "icons";
import React, { SVGProps, useEffect, useState } from "react";
import { PATHS } from "router/config/paths";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { addressFormat, compareAddresses, formatPrice, isObjectEmpty } from "utils";
import Auction from "./Auction";
import BestOffer from "./BestOffer";
import FixedPrice from "./FixedPrice";
import MakeOffer from "./MakeOffer";
import MetadataTable from "./MetadataTable";
import Avatar from "components/Avatar";
import UseNavigate from "hooks/useNavigate";
import ReadMore from "components/ReadMore";
import ActivityItemDescription from "components/ActivityDescription";
import collectionService, { ActivityFilters } from "api/collections/collections.service";
import EthereumPrice from "components/EthereumPrice/EthereumPrice";
import { AssetMockNFT1 } from "assets";
import { createWalletClient, custom, parseEther } from "viem";
import { Execute, getClient } from "@reservoir0x/reservoir-sdk";
import { goerli, linea } from "wagmi/chains";
import { CollectionProvider } from "pages/Collection/Collection";
import { useIsMobile } from "hooks/useIsMobile";
import { Image } from "../NFTDetails";
import Activity from "../rightMenus/Activity";
import SecondMakeOffer from "../rightMenus/MakeOffer";
import Collapse from "components/Collapse";
import Dropdown from "components/Dropdown";
import Offers from "../rightMenus/Offers";
import ImageBar from "./ImageBar";
import Offer from "pages/Profile/pages/Offer";

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx("group flex items-center w-full py-4 pl-2.5 gap-x-2.5 rounded-[5px] border border-gray", className)}>{children}</div>;
};
const BoxWithIcon = React.memo(({ children, className, icon }: { children: React.ReactNode; className?: string; icon: React.FC<SVGProps<SVGSVGElement>> }) => {
  const Icon = icon;

  return (
    <div className={clsx("group flex items-center w-full py-4 pl-2.5 gap-x-2.5 rounded-[5px] border border-gray", className)}>
      <div className="h-fit rounded-full bg-gray p-[6px]">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col w-full gap-y-[5px]">{children}</div>
    </div>
  );
});
BoxWithIcon.displayName = "BoxWithIcon";

const HoverButton = ({ Icon, text, btnClassName, onClick, disabled }: { Icon: React.FC<SVGProps<SVGSVGElement>>; text: string; btnClassName?: string; onClick?: any; disabled?: boolean }) => {
  return (
    <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" onClick={onClick}>
      <Button className={clsx("btn-sm btn-secondary no-bg", btnClassName)} disabled={disabled}>
        {text}
        <Icon className="w-[18px] h-[18px]" />
      </Button>
    </div>
  );
};

const Footer = ({ selectedNFT }: any) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex p-[15px] lg:justify-end lg:p-5 text-h6 text-white">
      <Button
        className="w-full lg:w-fit"
        onClick={() => {
          dispatch(
            setCheckout({
              type: CheckoutType.ConfirmListing,
              currentItemId: selectedNFT.id,
            })
          );
          dispatch(toggleCheckoutModal());
        }}
      >
        LIST YOUR NFT <IconListed />
      </Button>
    </div>
  );
};
const FooterListed = ({ selectedNFT }: any) => {
  const dispatch = useAppDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { show } = useAppSelector((state) => state.checkout);

  useEffect(() => {
    if (!show) setIsButtonDisabled(false);
  }, [show]);

  return (
    <div className="flex p-[15px] lg:justify-end lg:p-5 gap-3 text-h6 text-white">
      <Button
        className="btn-secondary w-full lg:w-fit"
        disabled={isButtonDisabled}
        onClick={() => {
          setIsButtonDisabled(true);
          dispatch(
            setCheckout({
              type: CheckoutType.CancelListing,
            })
          );
          dispatch(toggleCheckoutModal());
        }}
      >
        CANCEL LISTING
        <IconCancel />
      </Button>
      <Button
        className="w-full lg:w-fit"
        onClick={() => {
          dispatch(
            setCheckout({
              type: CheckoutType.UpdateListing,
              currentItemId: selectedNFT.id,
            })
          );
          dispatch(toggleCheckoutModal());
        }}
      >
        UPDATE LISTING <IconUpdateListing />
      </Button>
    </div>
  );
};
const FooterAuction = () => {
  const dispatch = useAppDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { show } = useAppSelector((state) => state.checkout);

  useEffect(() => {
    if (!show) setIsButtonDisabled(false);
  }, [show]);

  return (
    <div className="flex justify-center p-[15px] lg:justify-end lg:p-5 gap-3 text-h6 text-white">
      <Button
        className="btn-secondary w-full lg:w-fit"
        disabled={isButtonDisabled}
        onClick={() => {
          setIsButtonDisabled(true);
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

const mockData = {
  views: 22,
  totalCount: 20,
  available: 3,
  userOwns: 2,
  ownerPictures: [AssetMockNFT1, AssetMockNFT1, AssetMockNFT1],
  ownerCount: 8,
  network: "Fuel",
  lastListing: { user: { userId: 1, userName: "okitoki", image: AssetMockNFT1 }, price: 1.5, address: "0x123456" },
  listings: [
    { ownerPicture: AssetMockNFT1, price: 1.5, address: "0x123456" },
    { ownerPicture: AssetMockNFT1, price: 2, address: "0x123456" },
    { ownerPicture: AssetMockNFT1, price: 3, address: "0x123456" },
  ],
};

const LeftMenu = (props: any) => {
  const { nft, fetchCollection } = props;
  const isMobile = useIsMobile();
  const navigate = UseNavigate();
  const dispatch = useAppDispatch();
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);

  function formatActivityData(activity: any) {
    const { activityType, toUser, fromUser, createdTimeStamp, price } = activity;

    return (
      <ActivityItemDescription
        price={price}
        activityType={activityType}
        fromUserContractAddress={fromUser?.walletAddress}
        createdTimeStamp={createdTimeStamp}
        toUserContractAddress={toUser?.walletAddress}
        noTime={true}
      />
    );
  }

  function renderLastActivity(activity: any) {
    if (activity === undefined || activity === null) return;

    const filters = collectionService.getActivityFilters();
    const typeIcon = filters[activity?.activityType as ActivityFilters]?.icon;

    return (
      <BoxWithIcon icon={typeIcon} className="flex bg-bg-light hover:bg-bg-light ">
        <div className="flex w-full items-center justify-between pr-4">
          <div className="flex flex-col gap-y-[5px] flex-1">
            <div className="text-headline-01 text-gray-light">LAST ACTIVITY</div>
            <span className="text-white">{formatActivityData(activity)}</span>
          </div>
          <HoverButton
            Icon={IconArrowRight}
            text="SEE ALL"
            onClick={() => {
              dispatch(setRightMenu(RightMenuType.Activities));
            }}
          />
        </div>
      </BoxWithIcon>
    );
  }

  function renderListing(lastListing: any) {
    if (lastListing === undefined || lastListing === null) return;

    return (
      <Box className="bg-bg-light justify-between pr-4">
        <div className="flex items-center gap-x-2.5">
          <Avatar image={lastListing?.user?.image} userId={lastListing?.user?.userId} className="w-8 h-8 rounded-full" />
          <div className="flex flex-col gap-y-[5px]">
            <span className="text-headline-01 text-gray-light">LISTINGS</span>
            <h6 className="text-h6 text-white">
              <div className="inline-block">
                <EthereumPrice iconClassName="h-[20px] w-[20px]" priceClassName="text-h6" price={formatPrice(lastListing?.price)} />
              </div>
              by <span className={clsx(isBestOfferOwner() ? "text-green" : "text-white")}>{isBestOfferOwner() ? "you" : lastListing?.user?.userName ?? addressFormat(lastListing?.address)}</span>
            </h6>
          </div>
        </div>
        <div className="flex gap-x-2.5">
          <HoverButton Icon={IconArrowRight} text="SEE ALL" btnClassName="btn-secondary no-bg" onClick={() => dispatch(setRightMenu(RightMenuType.Listings))} />
        </div>
      </Box>
    );
  }

  const isOwner = () => {
    return isConnected ? compareAddresses(user?.id, nft?.user?.id) : false;
  };
  const isBestOfferOwner = () => {
    return isConnected ? (compareAddresses(nft.bestOffer?.user?.walletAddress, user.walletAddress) ? true : false) : false;
  };

  const isMultipleEdition = nft?.kind === "erc1155";

  const BestOfferBox = ({ bestOffer }: any) =>
    isMobile ? (
      <div className="flex-1 order-2 bg-bg-light rounded-[5px]">
        <Collapse isOpen={false} headerBorder={true}>
          <Collapse.Header>
            <div className="flex items-center gap-2.5">
              <Avatar image={bestOffer?.user?.image} userId={bestOffer?.user?.id} className="w-8 h-8 rounded-full" />
              <div className="flex flex-col gap-y-[5px]">
                <span className="text-headline-01 text-gray-light">BEST OFFER</span>
                <h6 className="text-h6 text-white">
                  <div className="inline-block">
                    <EthereumPrice iconClassName="h-[20px] w-[20px]" priceClassName="text-h6" price={bestOffer?.price} />
                  </div>
                  by{" "}
                  <span className={clsx(isBestOfferOwner() ? "text-green" : "text-white")}>
                    {isBestOfferOwner() ? "you" : bestOffer?.user?.userName ?? addressFormat(bestOffer?.user?.walletAddress)}
                  </span>
                  {/* {bestOffer?.user?.userName ?? addressFormat(bestOffer?.user?.walletAddress)} */}
                </h6>
              </div>
            </div>
          </Collapse.Header>
          <Collapse.Body containerClassName="!p-0">
            <Offers onBack={undefined} />
            {/* <Offer /> */}
          </Collapse.Body>
        </Collapse>
      </div>
    ) : (
      <div className="group flex items-center w-full py-4 pl-2.5 gap-x-2.5 rounded-[5px] border border-gray flex-1 order-2 lg:order-0 bg-bg-light justify-between pr-4">
        <div className="flex items-center gap-x-2.5">
          <Avatar image={bestOffer?.user?.image} userId={bestOffer?.user?.id} className="w-8 h-8 rounded-full" />
          <div className="flex flex-col gap-y-[5px]">
            <span className="text-headline-01 text-gray-light">BEST OFFER</span>
            <h6 className="text-h6 text-white">
              <div className="inline-block">
                <EthereumPrice iconClassName="h-[20px] w-[20px]" priceClassName="text-h6" price={bestOffer?.price} />
              </div>
              by{" "}
              <span className={clsx(isBestOfferOwner() ? "text-green" : "text-white")}>{isBestOfferOwner() ? "you" : bestOffer?.user?.userName ?? addressFormat(bestOffer?.user?.walletAddress)}</span>
              {/* {bestOffer?.user?.userName ?? addressFormat(bestOffer?.user?.walletAddress)} */}
            </h6>
          </div>
        </div>
        <div className="flex gap-x-2.5">
          <HoverButton Icon={IconArrowRight} text="SEE ALL" btnClassName="btn-secondary no-bg" onClick={() => dispatch(setRightMenu(RightMenuType.Offers))} />
          {isOwner() && (
            <HoverButton
              Icon={IconAccept}
              text="ACCEPT"
              onClick={() => {
                dispatch(
                  setCheckout({
                    type: CheckoutType.AcceptOffer,
                    item: {
                      ...selectedNFT.bestOffer,
                      contractAddress: selectedNFT.collection.contractAddress,
                      makerAddress: selectedNFT.bestOffer?.user?.walletAddress,
                      takerAddress: selectedNFT.user.walletAddress,
                      tokenOrder: selectedNFT.tokenOrder,
                      orderId: selectedNFT.tokenId,
                      tokenImage: selectedNFT.image ?? "",
                    },
                    price: selectedNFT.bestOffer?.price,
                    onCheckoutComplete: fetchCollection,
                  })
                );
                dispatch(toggleCheckoutModal());
              }}
            />
          )}
        </div>
      </div>
    );

  const LastActivityBox = ({ lastActivity }: any) => {
    const filters = collectionService.getActivityFilters();
    const TypeIcon = filters[lastActivity?.activityType as ActivityFilters]?.icon;

    return (
      <div className="flex-1 order-2 lg:order-0">
        {isMobile ? (
          <div className="flex-1 order-2 bg-bg-light rounded-[5px]">
            <Collapse isOpen={false} headerBorder={true}>
              <Collapse.Header>
                <div className="flex gap-2.5">
                  <div className="h-fit rounded-full bg-gray p-[6px]">
                    <TypeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col w-full gap-y-[5px]">
                    <div className="flex w-full items-center justify-between pr-4">
                      <div className="flex flex-col gap-y-[5px]">
                        <div className="text-headline-01 text-gray-light">LAST ACTIVITY</div>
                        <span className="text-white">{formatActivityData(lastActivity)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse.Header>
              <Collapse.Body containerClassName="!p-0">
                <div className="flex-1 order-2">
                  <Activity onBack={undefined} />
                </div>
              </Collapse.Body>
            </Collapse>
          </div>
        ) : (
          renderLastActivity(lastActivity)
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col border-r border-gray">
      <div className="flex flex-col overflow-hidden">
        <div className="container-fluid flex flex-col pt-5 pb-5 pr-10 border-b border-gray">
          <div className="flex items-center justify-between w-full mb-[5px]">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate.collectionNavigate(nft.collection.id, nft.collection.slug)}>
              {nft?.collection?.image && <img src={nft.collection.image} className="w-6 rounded-[px]" alt="profile-image" />}
              <h6 className="text-h6 text-gray-light">{nft?.collection?.name}</h6>
            </div>
            <div className="flex">
              <ImageBar nft={nft} />
            </div>
          </div>
          <h3 className="text-h3 text-white">{nft.name ? nft.name : nft?.tokenOrder ? "Bored Ape #" + nft?.tokenOrder : ""}</h3>
        </div>

        {isMobile && <Image nft={nft} />}

        <div className="container-fluid flex flex-col gap-5 lg:gap-2.5 pt-5 pb-5 pr-10 lg:border-b lg:border-gray">
          <div className="flex gap-2.5 order-1 lg:order-0">
            <div
              className="hover:bg-bg-light cursor-pointer flex w-fit gap-2 items-center lg:border lg:border-gray rounded-[5px] lg:py-2.5 lg:pl-2.5 lg:pr-5"
              onClick={() => navigate(PATHS.USER, { userId: nft?.user?.id })}
            >
              <Avatar image={nft?.user?.image} userId={nft?.user?.id} className="w-8 h-8" />
              <h6 className="text-h6 text-gray-light">
                Owned by <span className={clsx(isOwner() ? "text-green" : "text-white")}>{isOwner() ? "you" : nft?.user?.userName ?? addressFormat(nft?.user?.walletAddress)}</span>
              </h6>
            </div>
            {/* {!isObjectEmpty(nft) && <CollectionProvider kind={nft?.kind} />} */}
          </div>

          {isMultipleEdition && (
            <div className="flex items-center gap-4">
              <div className="hover:bg-bg-light cursor-pointer flex w-fit gap-2 items-center border border-gray rounded-[5px] py-2.5 pl-2.5 pr-5">
                <div className="flex relative w-16 h-8">
                  {mockData.ownerPictures.map((item, idx) => (
                    <div className={clsx("absolute w-8 h-8", idx === 1 ? "left-4" : idx === 2 ? "left-8" : "")} key={`img+${idx}`}>
                      <img src={item} className="w-8 h-8 rounded-full" />
                    </div>
                  ))}
                </div>
                <h6 className="text-h6 text-white">
                  {mockData.ownerCount} <span className="text-gray-light">Owners</span>
                </h6>
              </div>
              <div className="flex items-center gap-2.5">
                <h6 className="text-h6 text-gray-light">
                  on <span className="text-white">{mockData.network}</span>
                </h6>
                <div className="flex items-center justify-center w-7 h-7 bg-bg border border-gray rounded-full">
                  <IconFuelWallet className="w-[18px] h-[18px]" />
                </div>
              </div>
            </div>
          )}

          <div className="body-medium text-white order-2 lg:order-1">
            <ReadMore text={nft?.description !== null && nft?.description !== "" ? nft?.description : nft?.collection?.description ?? ""} characterLimit={150} />
          </div>

          <div className="flex-1 order-0 lg:order-2">
            {nft.salable ? (
              <FixedPrice isMultipleEdition={isMultipleEdition} />
            ) : nft.onAuction ? (
              <Auction />
            ) : JSON.stringify(nft.bestOffer) !== "undefined" && JSON.stringify(nft.bestOffer) !== "null" ? (
              <BestOffer fetchCollection={fetchCollection} />
            ) : (
              <MakeOffer />
            )}
          </div>

          {!!nft.bestOffer && <BestOfferBox bestOffer={nft.bestOffer} />}

          {nft.lastActivity && <LastActivityBox lastActivity={nft.lastActivity} />}

          {isMultipleEdition && renderListing(mockData.lastListing)}

          {/* {isMobile && (
            <div className="flex-1 order-2 ">
              <SecondMakeOffer onBack={undefined} />
            </div>
          )} */}
        </div>
        <div className="container-fluid flex flex-col gap-y-5 pt-5 pb-5 pr-10 lg:border-b lg:border-gray text-h6 text-white">
          <MetadataTable metadata={nft.tokenAttributes ?? []} traitfloors={nft.traitFloors ?? []} />
          <div className="flex flex-col gap-y-2.5">
            <div className="flex flex-row gap-x-2.5">
              <Box className="hover:bg-bg-light">
                <div className="flex h-fit rounded-full bg-gray p-[6px]">
                  <IconDocument className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headline-01 text-gray-light">CONTRACT ADDRESS</div>
                  {addressFormat(nft?.collection?.contractAddress)}
                </div>
              </Box>
              <BoxWithIcon className="hover:bg-bg-light" icon={IconToken}>
                <div className="text-headline-01 text-gray-light"> TOKEN ID</div>
                {nft.tokenOrder}
              </BoxWithIcon>
            </div>
            <div className="flex flex-row gap-x-2.5">
              <Box className="hover:bg-bg-light">
                <div className="flex items-center justify-center rounded-full">
                  <img src={nft.collection?.image} className="w-8" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headline-01 text-gray-light">CREATOR</div>
                  {nft?.collection?.name}
                </div>
              </Box>
              <Box>
                <div className="h-fit rounded-full bg-gray p-[6px]">
                  <IconFee className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headline-01 text-gray-light">CREATOR FEE</div>
                  {nft?.royalty ?? 0}%
                </div>
              </Box>
            </div>
          </div>
        </div>
        {/* <div className="container-fluid flex flex-col pt-5 pb-9 pr-10 text-h6 text-white">
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
        </div> */}
      </div>
      <footer className={clsx("sticky bottom-[56px] z-10 lg:bottom-0 w-full  border-t border-gray bg-bg", isOwner() ? "block" : "hidden")}>
        {nft.onAuction ? <FooterAuction /> : nft.salable ? <FooterListed selectedNFT={selectedNFT} /> : <Footer selectedNFT={selectedNFT} />}
      </footer>
    </div>
  );
};

export default LeftMenu;
