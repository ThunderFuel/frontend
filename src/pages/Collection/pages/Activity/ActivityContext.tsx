import React, { createContext, ReactNode, useContext, useState } from "react";
import collectionService from "api/collections/collections.service";

interface IActivityContext {
  fetchActivity: any;
  activities: any;
}

export const ActivityContext = createContext<IActivityContext>({} as any);

const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState([]);
  const fetchActivity = async () => {
    const response = await collectionService.getActivity();
    setActivities(response as any);
  };

  const value = {
    fetchActivity,
    activities,
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};

export default ActivityProvider;

export const useActivityContext = () => useContext(ActivityContext);
