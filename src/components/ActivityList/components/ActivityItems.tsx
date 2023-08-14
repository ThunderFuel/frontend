import React from "react";
import { useActivityContext } from "../ActivityContext";
import NotFound from "../../NotFound";
import Table, { ITableHeader } from "../../Table";
import Avatar from "../../Avatar";
import { addressFormat, timeagoFormat } from "utils";
import EthereumPrice from "../../EthereumPrice";
import { IconClock } from "icons";

const ActivityItems = () => {
  const { getActivities, pagination } = useActivityContext();
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
      // renderHeader: (header) => <span>asasas</span>,
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
      // renderHeader: (header) => <span>asasas</span>,
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
      // renderHeader: (header) => <span>asasas</span>,
    },
  ];
  const afterRow = () => {
    return <div></div>;
  };

  return (
    <div className="flex flex-col flex-1 py-5">
      <div className="text-headline-02 text-gray-light px-5 pb-5 border-b border-b-gray">{pagination.itemsCount} ACTIVITIES</div>
      <div className="flex flex-col gap-4">
        <Table headers={headers} items={getActivities} afterRow={afterRow} containerFluidClassName={"!px-5"} />
        {!getActivities.length ? <NotFound /> : null}
      </div>
    </div>
  );
};

export default ActivityItems;
