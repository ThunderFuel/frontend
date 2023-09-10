import React from "react";
import ActivityProvider from "./ActivityContext";
import Sidebar from "./components/Sidebar";
import ActivityItems from "./components/ActivityItems";
import clsx from "clsx";

const ActivityList = (props: any) => {
  return (
    <ActivityProvider value={props}>
      <div className={clsx("flex", props.containerClassName)}>
        {!props.hideSidebar && <Sidebar hiddenTabOffset={true} />}
        <ActivityItems hideTitle={props.hideTitle} headers={props.headers} />
      </div>
    </ActivityProvider>
  );
};

export default ActivityList;
