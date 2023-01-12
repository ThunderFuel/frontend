import React from "react";
import Sidebar from "./components/Sidebar";
import ActivityList from "./components/ActivityList";
import { useActivityContext } from "./ActivityContext";

const Activity = () => {
  const { fetchActivity } = useActivityContext();
  React.useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div className="container-fluid flex">
      <Sidebar />
      <ActivityList />
    </div>
  );
};

export default Activity;
