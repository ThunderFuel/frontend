import React from "react";
import ActivityProvider from "components/ActivityList/ActivityContext";
import Sidebar from "components/ActivityList/components/Sidebar";
import ActivityItems from "components/ActivityList/components/ActivityItems";

const ActivityList = (props: any) => {
  return (
    <ActivityProvider value={props}>
      <div className="px-5 flex h-full">
        <Sidebar className="w-60" />
        <ActivityItems />
      </div>
    </ActivityProvider>
  );
};

export default ActivityList;
