import { TabState } from "components/Tab/context/TabContext";
import { Action, ActionTypes } from "components/Tab/hooks/useTabContextProvider";

export const tabReducer = (state: TabState, action: ActionTypes) => {
  switch (action.type) {
    case Action.ChangeActiveTab:
      return { ...state, activeTab: action.id };
    default:
      return state;
  }
};
