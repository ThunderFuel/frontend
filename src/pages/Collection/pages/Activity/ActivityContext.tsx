import React, { createContext, ReactNode, useContext, useState } from "react";
import collectionService from "api/collections/collections.service";

interface IActivityContext {
  fetchActivity: any;
  getActivities: any;
  setSelectedFilter: any;
  selectedFilter: any;
  filters: any;
}

export const ActivityContext = createContext<IActivityContext>({} as any);

const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Sales");
  const [activities, setActivities] = useState([]);
  const fetchActivity = async () => {
    const [responseActivity, responseFilters] = await Promise.all([collectionService.getActivity(), collectionService.getActivityFilters()]);
    setActivities(
      responseActivity.map((item: any, i) => ({
        ...item,
        type: responseFilters[i % responseFilters.length].name,
      })) as any
    );
    setFilters(responseFilters as any);
  };

  const getActivities = React.useMemo(() => activities.filter((item: any) => item.type === selectedFilter), [selectedFilter, activities]);

  const value = {
    fetchActivity,
    getActivities,
    setSelectedFilter,
    selectedFilter,
    filters,
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};

export default ActivityProvider;

export const useActivityContext = () => useContext(ActivityContext);
