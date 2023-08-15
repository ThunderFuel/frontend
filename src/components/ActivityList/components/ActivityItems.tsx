/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useActivityContext } from "../ActivityContext";
import NotFound from "../../NotFound";
import Table, { ITableHeader } from "../../Table";
import EthereumPrice from "components/EthereumPrice/EthereumPrice";
import Avatar from "components/Avatar/Avatar";
import { addressFormat, timeagoFormat } from "utils";
import { IconClock, IconHand } from "icons";

const ActivityItems = (props: any) => {
  const { getActivities, pagination, actionButton } = useActivityContext();

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
      key: "from",
      text: `FROM`,
      width: "15%",
      align: "flex-end",
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
      key: "to",
      text: `TO`,
      width: "15%",
      align: "flex-end",
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
      key: "date",
      text: "DATE",
      width: "12%",
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
