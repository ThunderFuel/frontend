import React from "react";
import Tab from "components/Tab";

import { IconGrid, IconGridExtend, IconList } from "icons";
import { DisplayType, useCollectionListContext } from "../../CollectionListContext";

const TabDisplayType = () => {
  const { setDisplayType, displayType } = useCollectionListContext();

  return (
    <Tab
      className="icon"
      initTab={displayType}
      onChange={(selectedTab) => {
        setDisplayType(selectedTab);
      }}
    >
      <Tab.Item id={DisplayType.GRID5}>
        <IconGridExtend />
      </Tab.Item>
      <Tab.Item id={DisplayType.GRID4}>
        <IconGrid />
      </Tab.Item>
      <Tab.Item id={DisplayType.LIST}>
        <IconList />
      </Tab.Item>
    </Tab>
  );
};

export default TabDisplayType;
