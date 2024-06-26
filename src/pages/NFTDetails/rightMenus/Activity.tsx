/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SVGProps, useEffect, useState } from "react";
import { IconBid, IconCart, IconListed, IconOffer, IconToken, IconTransfer } from "icons";
import Filter from "../components/Filter";
import RightMenu from "../components/RightMenu";
import EthereumPrice from "components/EthereumPrice";
import { useAppSelector } from "store";
import collectionsService, { ActivityFilters } from "api/collections/collections.service";
import ActivityItemDescription from "components/ActivityDescription";
import ActivityList from "components/ActivityList/ActivityList";
import { ITableHeader } from "components/Table";
import ActivityItems, { PriceExcludeActiveTypes } from "components/ActivityList/components/ActivityItems";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";
import { useIsMobile } from "hooks/useIsMobile";

const ActivityType = ({ title, description, Icon, price }: { title: string; description: string; Icon: React.FC<SVGProps<SVGSVGElement>>; price?: number }) => {
  return (
    <div className="flex items-center justify-between gap-[11px]">
      <div className="flex w-full gap-x-[10px]">
        <div className="flex w-full max-w-[120px] items-center gap-x-[10px] text-h6">
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
    minWidth: "200px",
    align: "flex-start",
    // className: "!bg-bg-light",
    sortValue: 1,
    render: (item) => {
      const { icon, title, description } = formatActivityData(item);

      return <ActivityType title={title} description={description} Icon={icon} price={item.price} />;
    },
  },
  {
    key: "price",
    text: "PRICE",
    width: "20%",
    align: "flex-end",
    className: "text-right ",
    render: (item) => <EthereumPrice price={item?.price} priceClassName="text-h6" className="justify-end" isNull={PriceExcludeActiveTypes.includes(item.type)} />,
  },
  {
    key: "from",
    text: `FROM`,
    width: "20%",
    align: "flex-end",
    className: "text-right ",
    sortValue: 1,
    render: (item) => <ActivityItems.FromUser item={item} />,
  },
  {
    key: "to",
    text: `TO`,
    width: "20%",
    align: "flex-end",
    className: "text-right ",
    sortValue: 1,
    render: (item) => <ActivityItems.ToUser item={item} />,
  },

  {
    key: "date",
    text: "DATE",
    width: "20%",
    align: "flex-end",
    className: "text-right ",
    sortValue: 3,
    render: (item) => <ActivityItems.Time item={item} />,
  },
];

const Activity = ({ onBack }: { onBack: any }) => {
  const [notActiveFilters, setnotActiveFilters] = useState<number[]>([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<any>([]);
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const isMobile = useIsMobile();
  const [params, setParams] = React.useReducer(
    (prevState: any, nextState: any) => {
      return { ...prevState, ...nextState };
    },
    {
      continuation: null,
      tokenId: selectedNFT.id,
      pageSize: 10,
      page: 1,
      type: null,
    }
  );

  const getActivityItems = async () => {
    const { data, ...pagination } = await collectionsService.getActivity(params);
    setPagination(pagination);

    return {
      data,
    };
  };

  useEffect(() => {
    fetchActivity();
  }, [selectedNFT]);

  const fetchActivity = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setActivities([]);
      try {
        const response = await getActivityItems();
        setActivities(response.data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onChangePagination = async () => {
    if (!!params.continuation || params.page > 1) {
      setIsLoading(true);
      try {
        setParams({ continuation: params.continuation });
        const response = await getActivityItems();

        setActivities((prevState: any[]) => [...prevState, ...(response.data as any)]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onChangeFilterValue = ({ types }: any) => {
    setParams({ types });
  };

  React.useEffect(() => {
    fetchActivity();
  }, [params]);

  function renderItems() {
    const _activities = activities.filter((item: any) => !notActiveFilters.includes(item.activityType) && item.activityType !== ActivityFilters.ListingCancel);
    // const { icon, title, description } = formatActivityData(activity);
    const filters = collectionsService.getActivityFilters();

    return (
      <InfiniteScroll pagination={{}} onChangePagination={onChangePagination} isLoading={isLoading}>
        <ActivityList
          ActivityItemsContainerClassName="!pt-0"
          hideTitle={true}
          containerClassName="flex flex-col"
          hideSidebar={true}
          activities={_activities}
          headers={headers}
          filters={filters}
          onChangeFilterValue={onChangeFilterValue}
        />
      </InfiniteScroll>
    );
  }

  return isMobile ? (
    <div className="flex flex-col gap-y-[10px]">
      <span className="text-headline-02 text-gray-light border-b border-gray py-2.5 px-4 uppercase">{activities.length} activities</span>
      {renderItems()}
    </div>
  ) : (
    <RightMenu title="Activity" onBack={onBack}>
      <Filter setnotActiveFilters={setnotActiveFilters} />
      <div className="flex flex-col gap-y-[10px]">{renderItems()}</div>
    </RightMenu>
  );
};

export default Activity;
