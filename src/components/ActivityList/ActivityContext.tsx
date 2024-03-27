import React, { createContext, ReactNode, useContext, useState } from "react";

interface IActivityContext {
  getActivities: any;
  onChangeSelectedFilter: any;
  selectedFilter: any;
  filters: any;
  pagination: any;
  actionButton?: any;
}

export const ActivityContext = createContext<IActivityContext>({} as any);
const ActivityProvider = ({ value, children }: { value: any; children: ReactNode }) => {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const onChangeSelectedFilter = (filterType: any) => {
    const types = filterType.map((item: any) => parseInt(item));

    setSelectedFilter(types);

    const params = filterType.length ? { types } : {};
    value.onChangeFilterValue(params);
  };

  const contextValue = {
    ...value,
    getActivities: value.activities,
    selectedFilter,
    onChangeSelectedFilter,
  };

  return <ActivityContext.Provider value={contextValue}>{children}</ActivityContext.Provider>;
};

export default ActivityProvider;

export const useActivityContext = () => useContext(ActivityContext);
