/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
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
      // renderHeader: (header) => <span>asasas</span>,
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
