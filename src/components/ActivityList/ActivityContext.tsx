import React, { createContext, ReactNode, useContext, useState } from "react";

interface IActivityContext {
  getActivities: any;
  setSelectedFilter: any;
  selectedFilter: any;
  filters: any;
  pagination: any;
}

export const ActivityContext = createContext<IActivityContext>({} as any);
const ActivityProvider = ({ value, children }: { value: any; children: ReactNode }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const getActivities = React.useMemo(() => value.activities.filter((item: any) => (selectedFilter ? item.type === selectedFilter : true)), [selectedFilter, value.activities]);

  const contextValue = {
    ...value,
    getActivities,
    setSelectedFilter,
    selectedFilter,
  };

  return <ActivityContext.Provider value={contextValue}>{children}</ActivityContext.Provider>;
};

export default ActivityProvider;

export const useActivityContext = () => useContext(ActivityContext);
