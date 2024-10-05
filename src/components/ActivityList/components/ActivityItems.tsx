import React from "react";
import { useActivityContext } from "../ActivityContext";
import Table, { ITableHeader } from "../../Table";
import { addressFormat, dateFormat, timeagoFormat } from "utils";
import EthereumPrice from "../../EthereumPrice";
import { IconHand } from "icons";
import LazyImg from "../../LazyImg";
import { useAppSelector } from "store";
import Tooltip from "../../Tooltip";
import { Link } from "react-router-dom";
import { getAbsolutePath } from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import clsx from "clsx";
import { useIsMobile } from "hooks/useIsMobile";
import MobileSidebar from "./MobileSidebar";

export const PriceExcludeActiveTypes = ["Transfers", "Mints"];
const ActivityType = ({ item }: any) => {
  const Icon = item.typeIcon ?? IconHand;

  return (
    <div className="flex items-center gap-2.5 px-2.5 flex-1 w-full">
      <div className="flex-center min-h-8 min-w-8 basis-8 rounded-full bg-gray">
        <Icon />
      </div>
      <div className="min-w-0 flex flex-col">
        <h6 className="text-h6 text-overflow">{item.type}</h6>
        {item.subText && <span className="body-small text-gray-light">{item.subText}</span>}
      </div>
    </div>
  );
};
const ActivityCollectionItem = ({ item }: any) => {
  const Icon = item.typeIcon ?? IconHand;

  return (
    <Link to={getAbsolutePath(PATHS.NFT_DETAILS, { nftId: item.tokenId })} className="flex w-full items-center gap-2.5 py-3">
      <div className="relative">
        <LazyImg className="w-10 h-10 rounded-md basis-10" src={item.token.image} />
        <div className="flex-center lg:hidden absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-gray rounded-full w-6 h-6 p-0.5">
          <Icon className="" />
        </div>
      </div>
      <div className="min-w-0 flex">
        <h6 className="text-h6 text-white text-overflow">{item.token.name ?? "-"}</h6>
      </div>
    </Link>
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

  return (
    <Link to={getAbsolutePath(PATHS.USER, { userId: item.fromUserId })} className="body-medium text-white hover:underline">
      {item.fromUser?.userName ?? addressFormat(item.fromUser?.walletAddress)}
    </Link>
  );
};
const ActivityToUser = ({ item }: any) => {
  const { user } = useAppSelector((state) => state.wallet);
  if (!item.toUserId) {
    return <span className="body-medium text-gray-light">-</span>;
  }
  if (user.id === item.toUserId) {
    return <span className="body-medium text-green">you</span>;
  }

  return (
    <Link to={getAbsolutePath(PATHS.USER, { userId: item.toUserId })} className="body-medium text-white hover:underline">
      {item.toUser?.userName ?? addressFormat(item.toUser?.walletAddress)}
    </Link>
  );
};

export const ActivityTime = ({ item }: any) => {
  return (
    <div className="pr-2.5 text-right">
      <Tooltip position="top" hiddenArrow={true} content={dateFormat(item.createdTimeStamp, "MMM DD, HH:mm A Z")}>
        <span className="body-medium text-white">{timeagoFormat(item.createdTimeStamp)}</span>
      </Tooltip>
    </div>
  );
};

const ActivityItems = (props: any) => {
  const isMobile = useIsMobile();
  const { getActivities, pagination } = useActivityContext();
  const defaultHeader: ITableHeader[] = [
    {
      key: "type",
      text: `TYPE`,
      width: "18%",
      align: "flex-start",
      render: (item) => <ActivityType item={item} />,
      isHidden: isMobile,
    },
    {
      key: "item",
      text: `ITEM`,
      width: "27%",
      align: "flex-start",
      minWidth: "240px",
      sortValue: 1,
      render: (item) => <ActivityCollectionItem item={item} />,
    },
    {
      key: "price",
      text: "PRICE",
      width: "10%",
      align: "flex-end",
      className: "text-right",
      render: (item) => {
        return <EthereumPrice price={item.price} className="justify-end" isNull={PriceExcludeActiveTypes.includes(item.type)} />;
      },
    },
    {
      key: "from",
      text: "from",
      width: "15%",
      align: "flex-end",
      className: "text-right",
      sortValue: 2,
      render: (item) => <ActivityFromUser item={item} />,
    },
    {
      key: "to",
      text: "to",
      width: "15%",
      align: "flex-end",
      className: "text-right",
      sortValue: 2,
      render: (item) => <ActivityToUser item={item} />,
    },
    {
      key: "date",
      text: "date",
      width: "15%",
      align: "flex-end",
      className: "text-right",
      sortValue: 3,
      render: (item) => <ActivityTime item={item} />,
    },
  ];

  return (
    <>
      {useIsMobile() ? <MobileSidebar /> : null}
      <div className={clsx("flex flex-col flex-1 lg:pt-4 lg:pb-16 lg:py-5", props.containerClassName)}>
        {!props.hideTitle && <div className="text-headline-02 text-gray-light px-5 pb-3 lg:pb-5 lg:border-b lg:border-b-gray">{pagination.itemsCount} ACTIVITIES</div>}
        <Table headers={props.headers ?? defaultHeader} items={getActivities} containerFluidClassName={"!lg:px-5"} rowClassName={"!h-[60px]"} />
      </div>
    </>
  );
};

export default Object.assign(ActivityItems, {
  Time: ActivityTime,
  CollectionItem: ActivityCollectionItem,
  ToUser: ActivityToUser,
  FromUser: ActivityFromUser,
});
