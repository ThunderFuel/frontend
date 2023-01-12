import React from "react";
import ActivityProvider from "./ActivityContext";
import Activity from "./Activity";

const Index = () => {
  return (
    <ActivityProvider>
      <Activity />
    </ActivityProvider>
  );
};

export default Index;
