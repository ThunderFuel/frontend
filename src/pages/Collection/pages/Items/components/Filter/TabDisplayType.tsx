import React from "react";
import Tab from "components/Tab";
import { DisplayType, useItemContext } from "../../ItemContext";

import { IconGrid, IconGridExtend, IconList } from "icons";

const TabDisplayType = () => {
  const { setDisplayType, displayType } = useItemContext();

  return (
    <Tab
      className="icon"
      initTab={displayType}
      onChange={(selectedTab) => {
        setDisplayType(selectedTab);
      }}
    >
      <Tab.Item id={DisplayType.GRID4}>
        <IconGridExtend />
      </Tab.Item>
      <Tab.Item id={DisplayType.GRID3}>
        <IconGrid />
      </Tab.Item>
      <Tab.Item id={DisplayType.LIST}>
        <IconList />
      </Tab.Item>
    </Tab>
  );
};

export default TabDisplayType;
