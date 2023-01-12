import React from "react";
import { TabProps } from "components/Tab/Tab";
import { TabContextState, useTabContextProvider } from "../hooks/useTabContextProvider";
import { tabReducer } from "../reducer/tabReducer";

export const TabContext = React.createContext({} as TabContextState);

const getInitial = (props: TabProps): TabState => {
  return {
    activeTab: props.initTab ?? undefined,
  };
};

export interface TabState {
  activeTab: number | string | object;
}

export const TabProvider = (props: TabProps) => {
  const tab = useTabContextProvider(tabReducer, getInitial(props), props);

  return <TabContext.Provider value={tab}>{props.children}</TabContext.Provider>;
};
