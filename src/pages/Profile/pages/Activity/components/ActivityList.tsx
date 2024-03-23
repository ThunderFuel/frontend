import React from "react";
import ActivityProvider from "components/ActivityList/ActivityContext";
import Sidebar from "components/ActivityList/components/Sidebar";
import ActivityItems from "components/ActivityList/components/ActivityItems";

const ActivityList = (props: any) => {
  return (
    <ActivityProvider value={props}>
      <div className="pl-5 flex h-full">
        <Sidebar className="w-64" hiddenTabOffset={true} />
        <ActivityItems />
      </div>
    </ActivityProvider>
  );
};

export default ActivityList;
