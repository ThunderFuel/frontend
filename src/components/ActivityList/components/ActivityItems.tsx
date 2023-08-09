import React from "react";
import ActivityItem from "./ActivityItem";
import { useActivityContext } from "../ActivityContext";
import NotFound from "../../NotFound";
import Table, { ITableHeader } from "../../Table";

const ActivityItems = () => {
  const { getActivities, pagination } = useActivityContext();
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
    return <div>{JSON.stringify(item)}</div>;
  };

  return (
    <div className="flex flex-col flex-1 p-5 gap-5">
      <div className="text-headline-02 text-gray-light">{pagination.itemsCount} ACTIVITIES</div>
      <div className="flex flex-col gap-4">
        <Table headers={headers} items={getActivities} afterRow={afterRow} />
        {getActivities.map((item: any, index: number) => (
          <ActivityItem key={index} item={item} />
        ))}
        {!getActivities.length ? <NotFound /> : null}
      </div>
    </div>
  );
};

export default ActivityItems;
