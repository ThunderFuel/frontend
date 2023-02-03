import React from "react";
import ActivityProvider from "./ActivityContext";
import Sidebar from "./components/Sidebar";
import ActivityItems from "./components/ActivityItems";

const ActivityList = (props: any) => {
  return (
    <ActivityProvider value={props}>
      <div className="container-fluid flex">
        <Sidebar />
        <ActivityItems />
      </div>
    </ActivityProvider>
  );
};

export default ActivityList;
