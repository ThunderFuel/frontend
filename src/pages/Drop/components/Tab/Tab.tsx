import React, { useMemo } from "react";
import clsx from "clsx";

import "./Tab.css";

const TabItem = ({ children }: any) => {
  return children;
};
const Tab = ({ children, number = 0, className, containerClassName, headerClassName }: any) => {
  const [activeTab, setActiveTab] = React.useState(number);
  const headerProps = useMemo(() => {
    return children
      .map((child: any) => ({
        title: child?.props?.title,
      }))
      .filter((child: any) => child.title);
  }, [children]);

  const getActiveTab = React.useMemo(() => {
    return children.filter((child: any) => !!child)[activeTab];
  }, [activeTab, children]);

  return (
    <div className={clsx("drop-detail-tab", className)}>
      <ul className={headerClassName}>
        {headerProps.map((header: any, i: number) => {
          return (
            <li
              className={activeTab === i ? "active" : ""}
              key={header.title}
              onClick={() => {
                setActiveTab(i);
              }}
            >
              <h4 className={clsx("text-h4 transition-opacity")}>{header.title}</h4>
            </li>
          );
        })}
      </ul>
      <div className={containerClassName}>{getActiveTab}</div>
    </div>
  );
};

export default Object.assign(Tab, {
  Item: TabItem,
});
