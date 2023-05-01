import React from "react";
import clsx from "clsx";

const TabItem = ({ children }: any) => {
  return children;
};
const Tab = ({ children, number = 0, className }: any) => {
  const [activeTab, setActiveTab] = React.useState(number);
  const headerProps = children.map((child: any) => ({
    title: child.props.title,
  }));

  const getActiveTab = React.useMemo(() => {
    return children[activeTab];
  }, [activeTab]);

  return (
    <div className={clsx("flex flex-col gap-5", className)}>
      <ul className="flex gap-12">
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
      <div className="border border-white border-opacity-10 rounded-md p-5">{getActiveTab}</div>
    </div>
  );
};

export default Object.assign(Tab, {
  Item: TabItem,
});
