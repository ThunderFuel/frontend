import React, { SVGProps, useEffect, useState } from "react";
import { IconBid, IconCart, IconListed, IconOffer, IconToken, IconTransfer } from "icons";
import Filter from "../components/Filter";
import RightMenu from "../components/RightMenu";
import EthereumPrice from "components/EthereumPrice";
import { useAppSelector } from "store";
import collectionsService from "api/collections/collections.service";
import ActivityItemDescription from "components/ActivityDescription";

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

function formatActivityData(data: any): { icon: any; title: string; description: any } {
  const description = (
    <ActivityItemDescription
      activityType={data.activityType}
      fromUserContractAddress={data.fromUser.walletAddress}
      createdTimeStamp={data.createdTimeStamp}
      toUserContractAddress={data.fromUser.walletAddress}
    />
  );

  switch (data.activityType) {
    case 0:
      return { icon: IconOffer, title: "Offer", description: description };
    case 1:
      return {
        icon: IconToken,
        title: "Mint",
        description: description,
      };
    case 2:
      return {
        icon: IconCart,
        title: "Sale",
        description: description,
      };
    case 3:
      return {
        icon: IconTransfer,
        title: "Transfer",
        description: description,
      };
    case 4:
      return {
        icon: IconListed,
        title: "List",
        description: description,
      };
    case 5:
      return {
        icon: IconBid,
        title: "Bid",
        description: description,
      };
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

      return <CustomBox key={index} title={title} description={description} Icon={icon} price={activity.price} />;
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
