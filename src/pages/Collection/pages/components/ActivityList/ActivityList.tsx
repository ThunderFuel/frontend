import React from "react";
import ActivityItem from "./ActivityItem";
import { useCollectionContext } from "../../../CollectionContext";

const ActivityList = () => {
  const { fetchActivity, activities } = useCollectionContext();

  React.useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div className="flex flex-col flex-1 p-5 gap-5">
      <div className="text-headline-02 text-gray-light">500 ITEMS</div>
      <div className="flex flex-col gap-4">
        {activities.map((item: any, index: number) => (
          <ActivityItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
