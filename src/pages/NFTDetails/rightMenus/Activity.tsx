import React, { SVGProps, useEffect, useState } from "react";
import { IconBid, IconCart, IconListed, IconOffer, IconToken, IconTransfer } from "icons";
import Filter from "../components/Filter";
import RightMenu from "../components/RightMenu";
import EthereumPrice from "components/EthereumPrice";
import { useAppSelector } from "store";
import collectionsService from "api/collections/collections.service";
import { addressFormat } from "utils";

const CustomBox = ({ title, description, Icon, price }: { title: string; description: string; Icon: React.FC<SVGProps<SVGSVGElement>>; price?: number }) => {
  return (
    <div className="flex flex-col border border-gray rounded-lg text-head6 font-spaceGrotesk text-white">
      <div className="flex items-center justify-between p-[15px] gap-x-[11px]">
        <div className="flex w-full gap-x-[10px]">
          <div className="flex w-full max-w-[120px] items-center gap-x-[10px]">
            <div className="h-fit w-fit rounded-full bg-gray p-[6px]">
              <Icon width="20px" height="20px" />
            </div>
            {title}
          </div>
          <div className="text-bodyMd w-full">{description}</div>
        </div>
        {price && <EthereumPrice price={price} />}
      </div>
    </div>
  );
};

function formatTimePassed(createdDate: string): string {
  const date = new Date(createdDate);

  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  if (days) return `${days} ${days > 1 ? "days" : "day"} ago`;
  if (hours) return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
  if (minutes) return `${minutes} ${minutes > 1 ? "mins" : "min"} ago`;

  return "just now";
}

function handleFromUsername(data: any) {
  return data.fromUser.userName ?? addressFormat(data.fromUser.walletAddress);
}

function handleToUsername(data: any) {
  return data.toUser.userName ?? addressFormat(data.toUser.walletAddress);
}

function formatActivityData(data: any): { icon: any; title: string; description: string } {
  //TODO zamanlari ekle
  switch (data.activityType) {
    case 0:
      return { icon: IconOffer, title: "Offer", description: `Offered by ${handleFromUsername(data)}, ${formatTimePassed(data.createdAt)}` };
    case 1:
      return { icon: IconToken, title: "Mint", description: `Minted by ${handleFromUsername(data)}, ${formatTimePassed(data.createdAt)}` };
    case 2:
      return { icon: IconCart, title: "Sale", description: `Sold by ${handleFromUsername(data)}, to ${handleToUsername(data)} ${formatTimePassed(data.createdAt)}` };
    case 3:
      return { icon: IconTransfer, title: "Transfer", description: `Transferred from ${handleFromUsername(data)} to ${handleToUsername(data)} ${formatTimePassed(data.createdAt)} ` };
    case 4:
      return { icon: IconListed, title: "List", description: `Listed by ${handleFromUsername(data)} ${formatTimePassed(data.createdAt)}` };
    case 5:
      return { icon: IconBid, title: "Bid", description: `Bid placed by ${handleFromUsername(data)} ${formatTimePassed(data.createdAt)}` };
    default:
      throw new Error(`Invalid activity type: ${data}`);
  }
}

const Activity = ({ onBack }: { onBack: any }) => {
  const [notActiveFilters, setnotActiveFilters] = useState<number[]>([]);

  const [activities, setActivities] = useState<any>([]);
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);

  const fetchActivities = async () => {
    const response = await collectionsService.getActivity({ page: 1, pageSize: 10, tokenId: selectedNFT.id });
    setActivities(response.data);
  };

  useEffect(() => {
    fetchActivities();
  }, [selectedNFT]);

  function renderItems() {
    return activities.map((activity: any, index: any) => {
      if (notActiveFilters.includes(activity.activityType)) return;

      const { icon, title, description } = formatActivityData(activity);

      return <CustomBox key={index} title={title} description={description} Icon={icon} price={activity.price}></CustomBox>;
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
