import React from "react";
import ActivityProvider from "./ActivityContext";
import Sidebar from "./components/Sidebar";
import ActivityItems from "./components/ActivityItems";
import clsx from "clsx";

const ActivityList = (props: any) => {
  return (
    <ActivityProvider value={props}>
      <div className={clsx(props.noContainerFluid ? "flex" : "container-fluid flex")}>
        {!props.hideSidebar && <Sidebar />}
        <ActivityItems noTitle={props.noTitle} headers={props.headers} />
      </div>
    </ActivityProvider>
  );
};

export default ActivityList;
