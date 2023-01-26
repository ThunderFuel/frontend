import React, { SVGProps, useEffect, useState } from "react";
import { IconCart, IconListed, IconOffer, IconToken, IconTransfer } from "icons";
import Filter from "../components/Filter";
import RightMenu from "../components/RightMenu";
import EthereumPrice from "components/EthereumPrice";

const activities = [
  { title: "Transfer", description: "Transferred from 919x919 to 21x812, 2 mins ago" },
  { title: "Sale", description: "Sold by 919x919 to 21x812, 2 mins ago" },
  { title: "List", description: "Listed by 919x919, 2 mins ago" },
  { title: "Mint", description: "Minted by 919x919, 10 mins ago" },
  { title: "Offer", description: "Offered by 919x919, 10 mins ago" },
];

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
          <div className="text-bodyMd max-w-[240px]">{description}</div>
        </div>
        {price && <EthereumPrice price={price} className="grow justify-end" />}
      </div>
    </div>
  );
};

const Activity = ({ onBack }: { onBack: any }) => {
  const [notActiveFilters, setnotActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    console.log(notActiveFilters);
  }, [notActiveFilters]);

  function renderItems() {
    return activities.map((item, key) => {
      if (notActiveFilters.includes(item.title)) return;

      return (
        <CustomBox
          key={key}
          title={item.title}
          description={item.description}
          Icon={item.title === "Transfer" ? IconTransfer : item.title === "Sale" ? IconCart : item.title === "List" ? IconListed : item.title === "Mint" ? IconToken : IconOffer}
        ></CustomBox>
      );
    });
  }

  return (
    <RightMenu title="Activity" onBack={onBack}>
      <Filter setnotActiveFilters={setnotActiveFilters} />
      <div className="flex flex-col mt-[10px] gap-y-[10px]">{renderItems()}</div>
    </RightMenu>
  );
};

export default Activity;
