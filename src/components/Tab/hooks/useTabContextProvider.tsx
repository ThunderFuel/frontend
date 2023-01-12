import { tabReducer } from "../reducer/tabReducer";
import { TabState } from "components/Tab/context/TabContext";
import { TabProps } from "components/Tab/Tab";
import { useCallback, useReducer } from "react";

export interface TabContextState {
  changeActiveTab: (id: any) => void;
  activeTab: any;
}

export enum Action {
  ChangeActiveTab,
}

export interface ActionTypes {
  type: Action;
  id?: any;
  index?: number;
}

export const useTabContextProvider = (reducer: typeof tabReducer, initial: TabState, props: TabProps) => {
  const [state, dispatch] = useReducer(reducer, initial);

  const changeActiveTab = useCallback(
    (id: any) => {
      dispatch({ id, type: Action.ChangeActiveTab });

      if (typeof props.onChange === "function") {
        props.onChange(id);
      }
    },
    [props]
  );

  return {
    changeActiveTab,
    activeTab: state.activeTab,
  };
};
