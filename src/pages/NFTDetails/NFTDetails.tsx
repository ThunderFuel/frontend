import React from "react";
import { AssetCollectionProfileImage, AssetMockCreator, AssetMockNFT1, AssetTableImageNft1 } from "assets";
import Button from "components/Button";
import { IconAddCart, IconArrowRight, IconContract, IconDocument, IconEthereum, IconFee, IconLink, IconListed, IconOffer, IconShoppingCart, IconThunder, IconToken, IconTwitter } from "icons";
import ImageBar from "./components/ImageBar";
import MetadataTable from "./components/MetadataTable";
import clsx from "clsx";

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx("group flex items-center w-full py-4 pl-[10px] gap-x-[10px] rounded-[5px] border border-gray", className)}>{children}</div>;
};

const NFTDetails = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col border-r border-gray">
        <div className="container-fluid flex flex-col pt-10 pb-5 pr-10 border-b border-gray">
          <div className="flex gap-[8px] mb-[5px]">
            <img src={AssetCollectionProfileImage} className="w-6 rounded-[px]" alt="profile-image" />
            <div className="flex flex-col w-full">
              <h6 className="text-h6 text-gray-light">Genuine Undead</h6>
            </div>
          </div>
          <h3 className="text-h3 text-white">Genuine Undead #1293</h3>
        </div>
        <div className="container-fluid flex flex-col gap-y-5 pt-5 pb-5 pr-10 border-b border-gray">
          <div className="hover:bg-bg-light cursor-pointer flex w-fit gap-[8px] items-center border border-gray rounded-[5px] py-[10px] pl-[10px] pr-5">
            <img src={AssetTableImageNft1} className="w-8 rounded-full" alt="profile-image" />
            <h6 className="text-h6 text-gray-light">
              Owned by
              <span className="text-white"> psyyo</span>
            </h6>
          </div>
          <div className="text-bodyMd text-white">24*24 pixel PFP you have never seen. 5995 classic, 3996 cyberpunk and 8 legendaries, over 200 hand drawn traits with a rich variety.</div>
          <div className="flex flex-col border border-gray rounded-md bg-gray">
            <div className="flex justify-center items-center text-bodyMd text-white gap-x-2 py-[10px]">
              <IconListed className="w-[19px]" />
              Sale ends in 09d 02h 12m 22s
            </div>
            <div className="flex justify-between bg-bg-light mb-[1px] p-5">
              <div className="flex flex-col ">
                <span className="text-headlineMd font-bigShoulderDisplay text-gray-light">PRICE</span>
                <span className="flex text-h3 font-spaceGrotesk text-white items-center">
                  1.33 <IconEthereum color="#838383" />
                </span>
              </div>
              <div className="flex h-fit items-center gap-x-[5px]">
                <IconShoppingCart width="13.5px" height="12px" color="#838383" />
                <span className="text-bodySm font-spaceGrotesk text-gray-light">Last sale price 0.12 ETH</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-[10px] bg-bg-light rounded-b p-5">
              <div className="flex gap-x-[10px] ">
                <Button className="w-full text-button font-bigShoulderDisplay ">
                  Buy Now <IconThunder width="24px" height="11.58px" />
                </Button>
                <Button>
                  <IconAddCart fill="black" />
                </Button>
              </div>
              <Button className="btn-secondary no-bg ">
                MAKE OFFER <IconOffer />
              </Button>
            </div>
          </div>
          <div className="group flex w-full items-center justify-between rounded-[5px] bg-bg-light border border-gray py-[16px] pl-[10px] pr-4">
            <div className="flex items-center gap-x-[10px]">
              <img src={AssetTableImageNft1} className="w-8 rounded-full" alt="profile-image" />
              <div className="flex flex-col gap-y-[5px]">
                <span className="text-headlineSm font-bigShoulderDisplay text-gray-light">BEST OFFER</span>
                <h6 className="text-h6 font-spaceGrotesk text-white">0.99 ETH by 09x910</h6>
              </div>
            </div>
            <Button className="hidden btn-secondary no-bg btn-sm group-hover:flex">
              SEE ALL <IconArrowRight width="18px" height="18px" />
            </Button>
          </div>
        </div>
        <div className="container-fluid flex flex-col gap-y-5 pt-5 pb-5 pr-10 border-b border-gray text-head6 font-spaceGrotesk text-white">
          <MetadataTable />
          <div className="flex flex-col gap-y-[10px]">
            <div className="flex flex-row gap-x-[10px]">
              <Box className=" hover:bg-bg-light">
                <div className="flex h-fit rounded-full bg-gray p-[6px]">
                  <IconDocument className="opacity-1 group-hover:opacity-0 transition-opacity duration-500" width="20px" height="20px" />
                  <IconContract className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500" width="20px" height="20px" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">CONTRACT ADDRESS</div>
                  0X60C6...923011
                </div>
              </Box>
              <Box className="hover:bg-bg-light">
                <div className="h-fit rounded-full bg-gray p-[6px]">
                  <IconToken width="20px" height="20px" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headlineSm font-bigShoulderDisplay text-gray-light"> TOKEN ID</div>
                  1293
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
                  Undead-Deployer
                </div>
              </Box>
              <Box>
                <div className="h-fit rounded-full bg-gray p-[6px]">
                  <IconFee width="20px" height="20px" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">CREATOR FEE</div>
                  5%
                </div>
              </Box>
            </div>
            <Box className="hover:bg-bg-light justify-between pr-4">
              <div className="flex gap-x-[10px]">
                <div className="h-fit rounded-full bg-gray p-[6px]">
                  <IconOffer width="20px" height="20px" />
                </div>
                <div className="flex flex-col gap-y-[5px]">
                  <div className="text-headlineSm font-bigShoulderDisplay text-gray-light"> LAST ACTIVITY</div>
                  0.99 ETH Bid placed by 09x910
                </div>
              </div>
              <Button className="hidden btn-secondary no-bg btn-sm group-hover:flex">
                SEE ALL <IconArrowRight width="18px" height="18px" />
              </Button>
            </Box>
          </div>
        </div>
        <div className="container-fluid flex flex-col pt-5 pb-[35px] pr-10 text-head6 font-spaceGrotesk text-white">
          <h6 className="mb-5">Share to Earn %1</h6>
          <div className="flex flex-col gap-y-[10px]">
            <div className="flex items-center py-4 pl-[10px] border border-gray rounded-[5px] ">
              {/* TODO: animation */}
              <div className="flex gap-x-[10px] items-center">
                <div className="bg-gray rounded-full p-[6px] ">
                  <IconLink width="20px" height="20px" />
                </div>
                Copy 1% Link
              </div>
            </div>
            <div className="group flex items-center justify-between py-4 pl-[10px] pr-4 border border-gray rounded-[5px]">
              <div className="flex items-center gap-x-[10px]">
                <div className="bg-gray rounded-full p-[6px]">
                  <IconTwitter width="20px" height="20px" />
                </div>
                Tweet 1% Link
              </div>
              <Button className="hidden btn-secondary no-bg btn-sm group-hover:flex">
                COPY LINK <IconLink width="18px" height="18px" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky z-20 top-[112px] flex gap-x-5 h-fit px-[100px] py-10 bg-bg-light">
        <img src={AssetMockNFT1} className="" />
        <ImageBar />
      </div>
    </div>
  );
};

export default NFTDetails;
