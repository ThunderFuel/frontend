import React from "react";
import ActivityItem from "./ActivityItem";
import { useActivityContext } from "../ActivityContext";

const ActivityItems = () => {
  const { getActivities, pagination } = useActivityContext();

  return (
    <div className="flex flex-col flex-1 p-5 gap-5">
      <div className="text-headline-02 text-gray-light">{pagination.itemsCount} ITEMS</div>
      <div className="flex flex-col gap-4">
        {getActivities.map((item: any, index: number) => (
          <ActivityItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ActivityItems;
