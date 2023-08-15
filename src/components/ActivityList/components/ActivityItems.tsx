import React, { useMemo } from "react";
import { useActivityContext } from "../ActivityContext";
import NotFound from "../../NotFound";
import Table, { ITableHeader } from "../../Table";
import { addressFormat, timeagoFormat } from "utils";
import EthereumPrice from "../../EthereumPrice";
import { IconHand } from "icons";
import LazyImg from "../../LazyImg";
import { useAppSelector } from "../../../store";

const activityTypes: any = {
  Sales: "Sale",
  Offers: "Offer",
  Listings: "Listing",
  Bids: "Bid",
  Mints: "Mint",
  Transfers: "Transfer",
};
const ActivityType = ({ item }: any) => {
  const Icon = item.typeIcon ?? IconHand;

  const getType: any = useMemo(() => {
    return activityTypes[item.type] || item.type;
  }, [item.type]);

  return (
    <div className="flex items-center gap-2.5 pl-2.5">
      <div className="flex-center h-8 w-8 rounded-full bg-gray">
        <Icon />
      </div>
      <h6 className="text-h6 text-overflow">{getType}</h6>
    </div>
  );
};
const ActivityCollectionItem = ({ item }: any) => {
  return (
    <div className="flex w-full items-center p-2.5 gap-2.5">
      <LazyImg className="w-10 h-10 rounded-md" src={item.token.image} />
      <h6 className="text-h6 text-white">{item.token.name ?? "-"}</h6>
    </div>
  );
};

const ActivityFromUser = ({ item }: any) => {
  const { user } = useAppSelector((state) => state.wallet);
  if (!item.fromUserId) {
    return <span className="body-medium text-gray-light">-</span>;
  }

  if (user.id === item.fromUserId) {
    return <span className="body-medium text-green">you</span>;
  }

  return <span className="body-medium text-white">{addressFormat(item.fromUser?.walletAddress)}</span>;
};
const ActivityToUser = ({ item }: any) => {
  const { user } = useAppSelector((state) => state.wallet);
  if (!item.toUserId) {
    return <span className="body-medium text-gray-light">-</span>;
  }
  if (user.id === item.toUserId) {
    return <span className="body-medium text-green">you</span>;
  }

  return <span className="body-medium text-white">{addressFormat(item.toUser?.walletAddress)}</span>;
};

const ActivityItems = () => {
  const { getActivities, pagination } = useActivityContext();
  const headers: ITableHeader[] = [
    {
      key: "type",
      text: "TYPE",
      width: "17%",
      align: "flex-start",
      render: (item) => {
        const Icon = item.typeIcon ?? IconHand;

        function formatType(type: any) {
          if (type === "Sales") return "Sale";
          if (type === "Offers") return "Offer";
          if (type === "Listings") return "Listing";
          if (type === "Bids") return "Bid";
          if (type === "Mints") return "Mint";
          if (type === "Transfers") return "Transfer";

          return type;
        }

        return (
          <div className="flex items-center gap-2.5 w-32">
            <div className="flex-center h-8 w-8 rounded-full bg-gray">
              <Icon />
            </div>
            <h6 className="text-h6 text-overflow">{formatType(item.type)}</h6>
          </div>
        );
      },
    },
    {
      key: "item",
      text: "ITEM",
      width: "29%",
      align: "flex-start",
      render: (item) => <EthereumPrice price={item.price} priceClassName="text-h6" />,
    },
    {
      key: "price",
      text: "PRICE",
      width: "12%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.price} priceClassName="text-h6" />,
    },
    {
      key: "type",
      text: `TYPE`,
      width: "20%",
      align: "flex-start",
      render: (item) => <ActivityType item={item} />,
    },
    {
      key: "item",
      text: `ITEM`,
      align: "flex-start",
      sortValue: 1,
      render: (item) => <ActivityCollectionItem item={item} />,
    },
    {
      key: "price",
      text: "PRICE",
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.price} priceClassName="text-h6" />,
    },
    {
      key: "from",
      text: "from",
      width: "15%",
      align: "flex-end",
      sortValue: 2,
      render: (item) => <ActivityFromUser item={item} />,
    },
    {
      key: "to",
      text: "to",
      width: "15%",
      align: "flex-end",
      sortValue: 2,
      render: (item) => <ActivityToUser item={item} />,
    },
    {
      key: "date",
      text: "date",
      width: "15%",
      align: "flex-end",
      sortValue: 3,
      render: (item) => {
        return (
          <div className="pr-2.5">
            <span className="body-medium text-white">{timeagoFormat(item.expireTime)}</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col flex-1 py-5">
      <div className="text-headline-02 text-gray-light px-5 pb-5 border-b border-b-gray">{pagination.itemsCount} ACTIVITIES</div>
      <div className="flex flex-col gap-4">
        <Table headers={headers} items={getActivities} containerFluidClassName={"!px-5"} />
        {!getActivities.length ? <NotFound /> : null}
      </div>
    </div>
  );
};

export default ActivityItems;
