import React, { SVGProps } from "react";
import { IconCart, IconListed, IconToken, IconTransfer } from "icons";
import Filter from "../components/Filter";
import RightMenu from "../components/RightMenu";
import EthereumPrice from "components/EthereumPrice";

const CustomBox = ({ title, description, Icon, price }: { title: string; description: string; Icon: React.FC<SVGProps<SVGSVGElement>>; price?: string }) => {
  return (
    <div className="flex flex-col border border-gray rounded-lg text-head6 font-spaceGrotesk text-white">
      <div className="flex items-center p-[15px] gap-x-[11px]">
        <div className="flex gap-x-[10px]">
          <div className="flex w-full max-w-[120px] items-center gap-x-[10px]">
            <div className="h-fit w-fit rounded-full bg-gray p-[6px]">
              <Icon width="20px" height="20px" />
            </div>
            {title}
          </div>
          <div className="text-bodyMd max-w-[240px]">
            {description}
            {/* <div className="flex items-center p-[6px] gap-x-1 border text-bodyMd border-gray rounded-[5px]">
            <IconClock width="15px" />
            16 Oct 2022, 12:00 PM GMT+2
          </div> */}
          </div>
        </div>
        {price && <EthereumPrice price={price} className="grow justify-end" />}
      </div>
    </div>
  );
};

const Activity = ({ onBack }: { onBack: any }) => {
  return (
    <RightMenu title="Activity" onBack={onBack}>
      <Filter />
      <div className="flex flex-col mt-[10px] gap-y-[10px]">
        <CustomBox title="Transfer" description="Transferred from 919x919 to 21x812, 2 mins ago" Icon={IconTransfer}></CustomBox>
        <CustomBox title="Sale" description="Sold by 919x919 to 21x812, 2 mins ago" Icon={IconCart} price="1.55"></CustomBox>
        <CustomBox title="List" description="Listed by 919x919, 2 mins ago" Icon={IconListed} price="1.55"></CustomBox>
        <CustomBox title="Mint" description="Minted by 919x919, 10 mins ago" Icon={IconToken}></CustomBox>
        <CustomBox title="Mint" description="Minted by 919x919, 10 mins ago" Icon={IconToken}></CustomBox>
        <CustomBox title="Mint" description="Minted by 919x919, 10 mins ago" Icon={IconToken}></CustomBox>
        <CustomBox title="Mint" description="Minted by 919x919, 10 mins ago" Icon={IconToken}></CustomBox>
        <CustomBox title="Mint" description="Minted by 919x919, 10 mins ago" Icon={IconToken}></CustomBox>
        <CustomBox title="Mint" description="Minted by 919x919, 10 mins ago" Icon={IconToken}></CustomBox>
      </div>
    </RightMenu>
  );
};

export default Activity;
