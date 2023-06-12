import clsx from "clsx";
import Button from "components/Button";
import { IconAccept, IconArrowRight, IconCancel, IconDocument, IconFee, IconListed, IconToken, IconUpdateListing } from "icons";
import React, { SVGProps, useEffect, useState } from "react";
import { PATHS } from "router/config/paths";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { addressFormat, formatPrice } from "utils";
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { show } = useAppSelector((state) => state.checkout);

  useEffect(() => {
    if (!show) setIsButtonDisabled(false);
  }, [show]);

  return (
    <div className="flex justify-end px-5 py-5 gap-x-3 text-h6 text-white">
      <Button
        className="btn-secondary"
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { show } = useAppSelector((state) => state.checkout);

  useEffect(() => {
    if (!show) setIsButtonDisabled(false);
  }, [show]);

  return (
    <div className="flex justify-end px-5 py-5 gap-x-3 text-h6 text-white">
      <Button
        className="btn-secondary"
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

const LeftMenu = (props: any) => {
  const { nft, fetchCollection } = props;
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
  const isOwner = () => {
    return isConnected ? user?.id === nft?.user?.id : false;
  };
  const isBestOfferOwner = () => {
    return isConnected ? (nft.bestOffer?.user?.walletAddress === user.walletAddress ? true : false) : false;
  };

  return (
    <div className="flex flex-col border-r border-gray">
      <div className="flex flex-col overflow-hidden">
        <div className="container-fluid flex flex-col pt-5 pb-5 pr-10 border-b border-gray">
          <div className="flex items-center gap-2 mb-[5px] cursor-pointer" onClick={() => navigate(PATHS.COLLECTION, { collectionId: nft.collection.id })}>
            {nft?.collection?.image && <img src={nft.collection.image} className="w-6 rounded-[px]" alt="profile-image" />}
            <div className="flex flex-col w-full">
              <h6 className="text-h6 text-gray-light">{nft?.collection?.name}</h6>
            </div>
          </div>
          <h3 className="text-h3 text-white">{nft.name ? nft.name : nft?.tokenOrder ? "Bored Ape #" + nft?.tokenOrder : ""}</h3>
        </div>
        <div className="container-fluid flex flex-col gap-y-2.5 pt-5 pb-5 pr-10 border-b border-gray">
          <div
            className="hover:bg-bg-light cursor-pointer flex w-fit gap-2 items-center border border-gray rounded-[5px] py-2.5 pl-2.5 pr-5"
            onClick={() => navigate(PATHS.USER, { userId: nft?.user?.id })}
          >
            <Avatar image={nft?.user?.image} userId={nft?.user?.id} className={"w-8 h-8"} />
            <h6 className="text-h6 text-gray-light">
              Owned by <span className={clsx(isOwner() ? "text-green" : "text-white")}>{isOwner() ? "you" : nft?.user?.userName ?? addressFormat(nft?.user?.walletAddress)}</span>
            </h6>
          </div>

          <div className="body-medium text-white mb-2.5">
            <ReadMore text={nft?.description !== null && nft?.description !== "" ? nft?.description : nft?.collection?.description ?? ""} characterLimit={150} />
          </div>

          {nft.salable ? (
            <FixedPrice />
          ) : nft.onAuction ? (
            <Auction />
          ) : JSON.stringify(nft.bestOffer) !== "undefined" && JSON.stringify(nft.bestOffer) !== "null" ? (
            <BestOffer fetchCollection={fetchCollection} />
          ) : (
            <MakeOffer />
          )}

          {JSON.stringify(nft.bestOffer) !== "null" && (
            <Box className="bg-bg-light justify-between pr-4">
              <div className="flex items-center gap-x-2.5">
                <Avatar image={nft.bestOffer?.user?.image} userId={nft.bestOffer?.user?.id} className="w-8 h-8 rounded-full" />
                <div className="flex flex-col gap-y-[5px]">
                  <span className="text-headline-01 text-gray-light">BEST OFFER</span>
                  <h6 className="text-h6 text-white">
                    {formatPrice(nft.bestOffer?.price)} ETH by{" "}
                    <span className={clsx(isBestOfferOwner() ? "text-green" : "text-white")}>
                      {isBestOfferOwner() ? "you" : nft.bestOffer?.user?.userName ?? addressFormat(nft.bestOffer?.user?.walletAddress)}
                    </span>
                    {/* {nft.bestOffer?.user?.userName ?? addressFormat(nft.bestOffer?.user?.walletAddress)} */}
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
                            makerAddress: selectedNFT.bestOffer.user.walletAddress,
                            takerAddress: selectedNFT.user.walletAddress,
                            tokenOrder: selectedNFT.tokenOrder,
                            tokenImage: selectedNFT.image,
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
            </Box>
          )}
          {renderLastActivity(nft.lastActivity)}
        </div>
        <div className="container-fluid flex flex-col gap-y-5 pt-5 pb-5 pr-10 border-b border-gray text-h6 text-white">
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
                  {nft.collection?.royaltyFee}%
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
      <footer className={clsx("sticky bottom-0 w-full mt-auto border-t border-gray bg-bg", isOwner() ? "block" : "hidden")}>
        {nft.onAuction ? <FooterAuction /> : nft.salable ? <FooterListed /> : <Footer />}
      </footer>
    </div>
  );
};

export default LeftMenu;
