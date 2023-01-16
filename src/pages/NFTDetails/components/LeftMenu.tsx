import { AssetCollectionProfileImage, AssetMockCreator, AssetTableImageNft1 } from "assets";
import clsx from "clsx";
import Button from "components/Button";
import { IconAddCart, IconArrowRight, IconCart, IconContract, IconDocument, IconEthereum, IconFee, IconLink, IconListed, IconOffer, IconThunder, IconToken, IconTwitter, IconWallet } from "icons";
import React, { SVGProps } from "react";
import MetadataTable from "./MetadataTable";

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx("group flex items-center w-full py-4 pl-[10px] gap-x-[10px] rounded-[5px] border border-gray", className)}>{children}</div>;
};

const HoverButton = ({ Icon, text }: { Icon: React.FC<SVGProps<SVGSVGElement>>; text: string }) => {
  return (
    <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 ">
      <Button className="btn-secondary no-bg btn-sm">
        {text}
        <Icon width="18px" height="18px" />
      </Button>
    </div>
  );
};
//TODO https://www.figma.com/file/Jrn6keHtX5nTW5CgvUnSgF/Thunder-NFT-Marketplace?node-id=1509%3A29574&t=xv3rtX27SzX4nBNv-4      ----> Satilik degilse ama offer varsa best offer gosterilir
//TODO https://www.figma.com/file/Jrn6keHtX5nTW5CgvUnSgF/Thunder-NFT-Marketplace?node-id=1509%3A29868&t=xv3rtX27SzX4nBNv-4      ----> Satilik degil ve offer da yoksa make offer gosterilir
const LeftMenu = () => {
  return (
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
              <IconCart width="18px" color="#838383" />
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
        <Box className="bg-bg-light justify-between pr-4">
          <div className="flex items-center gap-x-[10px]">
            <img src={AssetTableImageNft1} className="w-8 rounded-full" alt="profile-image" />
            <div className="flex flex-col gap-y-[5px]">
              <span className="text-headlineSm font-bigShoulderDisplay text-gray-light">BEST OFFER</span>
              <h6 className="text-h6 font-spaceGrotesk text-white">0.99 ETH by 09x910</h6>
            </div>
          </div>
          <HoverButton Icon={IconArrowRight} text="SEE ALL" />
        </Box>
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
                <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">LAST ACTIVITY</div>
                0.99 ETH Bid placed by 09x910
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
  );
};

export default LeftMenu;
