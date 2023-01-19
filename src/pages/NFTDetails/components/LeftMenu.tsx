import { AssetMockCreator, AssetTableImageNft1 } from "assets";
import clsx from "clsx";
import Button from "components/Button";
import { IconAccept, IconArrowRight, IconCancel, IconContract, IconDocument, IconFee, IconLink, IconListed, IconOffer, IconToken, IconTwitter, IconUpdateListing, IconWallet } from "icons";
import React, { SVGProps } from "react";
import { useAppSelector } from "store";
import Auction from "./Auction";
import BestOffer from "./BestOffer";
import Component from "./Component";
import MetadataTable from "./MetadataTable";
import { NFTData } from "./mockData";

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx("group flex items-center w-full py-4 pl-[10px] gap-x-[10px] rounded-[5px] border border-gray", className)}>{children}</div>;
};

const HoverButton = ({ Icon, text, btnClassName }: { Icon: React.FC<SVGProps<SVGSVGElement>>; text: string; btnClassName?: string }) => {
  return (
    <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 ">
      <Button className={clsx("btn-sm", btnClassName)}>
        {text}
        <Icon width="18px" height="18px" />
      </Button>
    </div>
  );
};

//TODO https://www.figma.com/file/Jrn6keHtX5nTW5CgvUnSgF/Thunder-NFT-Marketplace?node-id=1509%3A29574&t=xv3rtX27SzX4nBNv-4      ----> Satilik degilse ama offer varsa best offer gosterilir
//TODO https://www.figma.com/file/Jrn6keHtX5nTW5CgvUnSgF/Thunder-NFT-Marketplace?node-id=1509%3A29868&t=xv3rtX27SzX4nBNv-4      ----> Satilik degil ve offer da yoksa make offer gosterilir
const LeftMenu = () => {
  const { collection, name, ownerName, collectionDesc, ownerImage, listed, bestOffer, offerOwner, offerPicture, metadata, contractAddress, tokenId, creator, creatorsFee, lastActivity } = NFTData;

  const { isOwner } = useAppSelector((state) => state.nftdetails);

  const footer = (
    <div className="flex justify-end px-5 py-5 text-head6 font-spaceGrotesk text-white">
      <Button>
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
      <Button>
        UPDATE LISTING <IconUpdateListing />
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
              <span className="text-white"> {ownerName}</span>
            </h6>
          </div>
          <div className="text-bodyMd text-white">{collectionDesc}</div>
          <Component />
          <BestOffer />
          <Auction />
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
              <HoverButton Icon={IconArrowRight} text="SEE ALL" btnClassName="btn-secondary no-bg" />
              {isOwner && <HoverButton Icon={IconAccept} text="ACCEPT" />}
            </div>
          </Box>
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
              <HoverButton Icon={IconArrowRight} text="SEE ALL" />
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
              <div className="absolute left-0 opacity-0 h-full flex items-center justify-center pl-[10px] gap-x-[10px] rounded-[5px] w-2/3 transition-all duration-500 group-hover:bg-gray group-hover:opacity-100 group-hover:w-full">
                <div className="bg-gray rounded-full p-[6px] ">
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
      {isOwner && !listed && <div className="sticky bottom-0 w-full mt-auto border-t border-gray bg-bg">{footer}</div>}
      {isOwner && listed && <div className="sticky bottom-0 w-full mt-auto border-t border-gray bg-bg">{footerListed}</div>}
    </div>
  );
};

export default LeftMenu;
