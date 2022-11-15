import React from "react";
import clsx from "clsx";
import { TabProvider } from "./context/TabContext";
import { useTabContext } from "./hooks/useTabContext";

export interface TabProps {
  className?: string;
  children: React.ReactNode;
  initTab: any;
  onChange?: (tabId: number) => void;
}

export interface TabItemProps {
  children: React.ReactNode;
  className?: string;
  id: any;
}

const Item = (props: TabItemProps) => {
  const { changeActiveTab, activeTab } = useTabContext();
  const isActive = activeTab === props.id;

  return (
    <li onClick={() => changeActiveTab(props.id)} className={clsx(props.className)}>
      <span className={isActive ? "active" : ""}>{props.children}</span>
    </li>
  );
};

const TabRoot = (props: TabProps) => {
  return (
    <TabProvider {...props}>
      <ul className={clsx(props.className, "tab")}>{props.children}</ul>
    </TabProvider>
  );
};

const Tab = Object.assign(TabRoot, { Item });

export default Tab;
