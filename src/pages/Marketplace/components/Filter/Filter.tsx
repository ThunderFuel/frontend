import React from "react";
import Tab from "components/Tab";

const dayValues = [
  {
    text: "1H",
    value: 1,
  },
  {
    text: "6H",
    value: 6,
  },
  {
    text: "24H",
    value: 24,
  },
  {
    text: "7D",
    value: 24 * 7,
  },
  {
    text: "30D",
    value: 24 * 7 * 30,
  },
];

const Filter = () => {
  return (
    <div className="border-t border-b border-gray">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-7 items-center">
          <Tab initTab={"top"} className="secondary">
            <Tab.Item id={"trending"}>Trending</Tab.Item>
            <Tab.Item id={"top"}>Top</Tab.Item>
            <Tab.Item id={"watchlist"}>Watchlist</Tab.Item>
          </Tab>
          <div className="w-full lg:w-auto">
            <Tab initTab={1}>
              {dayValues.map((day) => (
                <Tab.Item key={day.value} id={day.value}>
                  {day.text}
                </Tab.Item>
              ))}
            </Tab>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
