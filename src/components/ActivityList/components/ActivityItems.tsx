/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ActivityItem from "./ActivityItem";
import { useActivityContext } from "../ActivityContext";
import NotFound from "../../NotFound";
import Table, { ITableHeader } from "../../Table";

const ActivityItems = (props: any) => {
  const { getActivities, pagination, actionButton } = useActivityContext();
  const headers = [
    {
      key: "from",
      text: `FROM`,
      width: "24%",
      align: "flex-start",
      sortValue: 1,
      // renderHeader: (header) => <span>asasas</span>,
    },
  ] as ITableHeader[];
  const afterRow = (item: any) => {
    return <></>;
  };

  return (
    <div className="flex flex-col flex-1  gap-5">
      {!props.noTitle && <div className="text-headline-02 text-gray-light">{pagination?.itemsCount} ACTIVITIES</div>}
      <div className="flex flex-col gap-4">
        <Table actionButton={actionButton} theadClassName={"sticky z-10"} thClassName="" containerFluidClassName="!px-5" headers={props.headers ?? headers} items={getActivities} />
        {/* {getActivities.map((item: any, index: number) => (
          <ActivityItem key={index} item={item} />
        ))} */}
        {!getActivities.length ? <NotFound /> : null}
      </div>
    </div>
  );
};

export default ActivityItems;
