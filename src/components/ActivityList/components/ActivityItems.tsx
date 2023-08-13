/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ActivityItem from "./ActivityItem";
import { useActivityContext } from "../ActivityContext";
import NotFound from "../../NotFound";
import Table, { ITableHeader } from "../../Table";
import EthereumPrice from "components/EthereumPrice/EthereumPrice";
import Avatar from "components/Avatar/Avatar";
import { addressFormat, timeagoFormat } from "utils";
import { IconClock } from "icons";

const ActivityItems = (props: any) => {
  const { getActivities, pagination, actionButton } = useActivityContext();
  const headers: ITableHeader[] = [
    {
      key: "from",
      text: `FROM`,
      width: "24%",
      align: "flex-start",
      sortValue: 1,
      render: (item) => (
        <div className={`flex w-full items-center p-[15px] gap-x-[15px]  ${item.isExpired ? "opacity-50" : ""}`}>
          <Avatar image={item?.userImage} userId={item?.makerUserId} className={"w-8 h-8 flex-shrink-0"} />
          <div className="flex  flex-col gap-y-[10px]">
            <span>{item.ownOffer ? <span className="text-green">you</span> : item.makerUserName ?? addressFormat(item.makerAddress)} </span>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      text: "PRICE",
      width: "20%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.price} priceClassName="text-h6" />,
    },
    {
      key: "floor difference",
      text: "FLOOR DIFFERENCE",
      width: "28%",
      align: "flex-end",
      sortValue: 2,
      render: () => <span className="text-bodyMd font-spaceGrotesk">40% Below</span>,
    },
    {
      key: "expires",
      text: "EXPIRES",
      width: "24%",
      align: "flex-end",
      sortValue: 3,
      render: (item) => {
        const timeDifferenceInHours = timeagoFormat(item.expireTime);

        return (
          <span className="flex items-center gap-[5px] text-bodyMd font-spaceGrotesk">
            in {timeDifferenceInHours} hours <IconClock className="flex-shrink-0 w-[15px] h-[15px]" />
          </span>
        );
      },
    },
  ];
  const afterRow = (item: any) => {
    return <></>;
  };

  return (
    <div className="flex flex-col flex-1  gap-5">
      {!props.noTitle && <div className="text-headline-02 text-gray-light">{pagination?.itemsCount} ACTIVITIES</div>}
      <div className="flex flex-col gap-4">
        <Table actionButton={actionButton} theadClassName={"sticky z-10"} thClassName="" containerFluidClassName="!px-5" headers={props.headers ?? headers} items={getActivities} />
      </div>
    </div>
  );
};

export default ActivityItems;
