/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SVGProps, useEffect, useState } from "react";
import { IconBid, IconCart, IconListed, IconOffer, IconToken, IconTransfer } from "icons";
import Filter from "../components/Filter";
import RightMenu from "../components/RightMenu";
import EthereumPrice from "components/EthereumPrice";
import { useAppSelector } from "store";
import collectionsService from "api/collections/collections.service";
import ActivityItemDescription from "components/ActivityDescription";
import ActivityList from "components/ActivityList/ActivityList";
import { ITableHeader } from "components/Table";
import { addressFormat, timeagoFormat } from "utils";

const ActivityType = ({ title, description, Icon, price }: { title: string; description: string; Icon: React.FC<SVGProps<SVGSVGElement>>; price?: number }) => {
  return (
    <div className="flex items-center justify-between gap-[11px]">
      <div className="flex w-full gap-x-[10px]">
        <div className="flex w-full max-w-[120px] items-center gap-x-[10px]">
          <div className="h-fit w-fit rounded-full bg-gray p-[6px]">
            <Icon width="20px" height="20px" />
          </div>
          {title}
        </div>
      </div>
    </div>
  );
};

function formatActivityData(data: any): { icon: any; title: string; description: any } {
  const description = (
    <ActivityItemDescription
      activityType={data.activityType}
      fromUserContractAddress={data?.fromUser?.walletAddress}
      createdTimeStamp={data.createdTimeStamp}
      toUserContractAddress={data?.toUser?.walletAddress}
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

const headers: ITableHeader[] = [
  {
    key: "type",
    text: `TYPE`,
    width: "20%",
    align: "flex-start",
    sortValue: 1,
    render: (item) => {
      const { icon, title, description } = formatActivityData(item);

      return <ActivityType title={title} description={description} Icon={icon} price={item.price} />;
    },
    // renderHeader: (header) => <span>asasas</span>,
  },
  {
    key: "price",
    text: "PRICE",
    width: "20%",
    align: "flex-end",
    render: (item) => <EthereumPrice price={item?.price} priceClassName="text-h6" />,
  },
  {
    key: "from",
    text: `FROM`,
    width: "20%",
    align: "flex-end",
    sortValue: 1,
    render: (item) => <span>{addressFormat(item?.fromUser?.walletAddress, 1)}</span>,
    // renderHeader: (header) => <span>asasas</span>,
  },
  {
    key: "to",
    text: `TO`,
    width: "20%",
    align: "flex-end",
    sortValue: 1,
    render: (item) => <span>{addressFormat(item?.toUser?.walletAddress, 1)}</span>,
  },

  {
    key: "date",
    text: "DATE",
    width: "20%",
    align: "flex-end",
    sortValue: 3,
    render: (item) => <span>{timeagoFormat(item?.createdAt)}</span>,
    // renderHeader: (header) => <span>asasas</span>,
  },
];

const Activity = ({ onBack }: { onBack: any }) => {
  const [notActiveFilters, setnotActiveFilters] = useState<number[]>([]);

  const [activities, setActivities] = useState<any>([]);
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  console.log(activities);
  const fetchActivities = async () => {
    const response = await collectionsService.getActivity({ page: 1, pageSize: 10, tokenId: selectedNFT.id });
    setActivities(response.data);
  };

  useEffect(() => {
    fetchActivities();
  }, [selectedNFT]);

  function renderItems() {
    const _activities = activities.filter((item: any) => !notActiveFilters.includes(item.activityType));

    // const { icon, title, description } = formatActivityData(activity);

    return <ActivityList hideTitle={true} containerClassName="flex" hideSidebar={true} activities={_activities} headers={headers} />;
  }

  return (
    <RightMenu title="Activity" onBack={onBack}>
      <Filter setnotActiveFilters={setnotActiveFilters} />
      <div className="flex flex-col mt-[10px] gap-y-[10px]">{renderItems()}</div>
    </RightMenu>
  );
};

export default Activity;
