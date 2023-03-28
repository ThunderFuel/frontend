import React from "react";
import clsx from "clsx";
import { TabProvider } from "./context/TabContext";
import { useTabContext } from "./hooks/useTabContext";
import { IconArrowDown } from "icons";

export interface TabProps {
  className?: string;
  children: React.ReactNode;
  initTab: any;
  onChange?: (tabId: any) => void;
}

export interface TabItemProps {
  children: React.ReactNode;
  className?: string;
  id: any;
  disabled?: boolean;
}

const Item = (props: TabItemProps) => {
  const { changeActiveTab, activeTab } = useTabContext();
  const isActive = JSON.stringify(activeTab) === JSON.stringify(props.id);
  const onClick = () => {
    if (props.disabled) {
      return false;
    }
    changeActiveTab(props.id);
  };

  return (
    <li onClick={onClick} className={clsx(props.className)}>
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

const Button = ({ className, value, onClick }: { className?: string; value: any; onClick: () => void }) => {
  const isSecondary = className === "secondary";

  return (
    <button className={clsx("tab-button", className)} onClick={onClick}>
      {value}
      <IconArrowDown className={clsx("w-4 h-4", isSecondary ? "fill-white" : "fill-black")} />
    </button>
  );
};

const Tab = Object.assign(TabRoot, { Item, Button });

export default Tab;
