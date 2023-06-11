import React, { useMemo } from "react";
import clsx from "clsx";

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
    <div className={clsx("flex flex-col gap-5", className)}>
      <ul className={clsx("flex gap-10", headerClassName)}>
        {headerProps.map((header: any, i: number) => {
          return (
            <li
              className="cursor-pointer"
              key={header.title}
              onClick={() => {
                setActiveTab(i);
              }}
            >
              <h4 className={clsx("text-h4 transition-opacity", activeTab === i ? "opacity-100" : "opacity-50")}>{header.title}</h4>
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
