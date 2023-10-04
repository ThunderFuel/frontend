import React from "react";
import RightMenu from "../components/RightMenu";
import ActivityList from "components/ActivityList/ActivityList";
import { ITableHeader } from "components/Table";
import Avatar from "components/Avatar/Avatar";
import { addressFormat, timeagoFormat } from "utils";
import EthereumPrice from "components/EthereumPrice/EthereumPrice";
import { IconClock } from "icons";

const Listings = ({ onBack }: { onBack: any }) => {
  const listings = [] as any;

  const headers: ITableHeader[] = [
    {
      key: "owner",
      text: `OWNED`,
      width: "44%",
      align: "flex-start",
      sortValue: 1,
      render: (item) => (
        <div className={`flex w-full items-center gap-x-[15px]  ${item.isExpired ? "opacity-50" : ""}`}>
          <Avatar image={item?.userImage} userId={item?.makerUserId} className={"w-8 h-8 flex-shrink-0"} />
          <div className="flex  flex-col gap-y-[10px]">
            <span>{item.ownOffer ? <span className="text-green">you</span> : item.makerUserName ?? addressFormat(item.makerAddress)} </span>
          </div>
        </div>
      ),
    },
    {
      key: "owned",
      text: `OWNED`,
      width: "12%",
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
      key: "forSale",
      text: `FOR SALE`,
      width: "12%",
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
      key: "price",
      text: "PRICE",
      width: "12%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.price} priceClassName="text-h6" />,
    },
    {
      key: "expires",
      text: "EXPIRES",
      width: "20%",
      align: "flex-end",
      sortValue: 3,
      render: (item) => (
        <span className="flex items-center gap-[5px] text-bodyMd font-spaceGrotesk">
          {timeagoFormat(item.expireTime)}
          <IconClock className="flex-shrink-0 w-[15px] h-[15px]" />
        </span>
      ),
    },
  ];

  return (
    <RightMenu title={"Listings"} onBack={onBack}>
      <ActivityList noTitle={true} noContainerFluid={true} hideSidebar={true} activities={listings} headers={headers} />
    </RightMenu>
  );
};

export default Listings;
