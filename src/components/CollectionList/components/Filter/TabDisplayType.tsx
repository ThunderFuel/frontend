import React from "react";
import Tab from "components/Tab";

import { IconGrid, IconGridExtend, IconList } from "icons";
import { DisplayType, useCollectionListContext } from "../../CollectionListContext";

const TabItemsMobile = ({ displayType }: any) => {
  if (displayType === DisplayType.GRID4) {
    return (
      <Tab.Item id={DisplayType.LIST}>
        <IconList />
      </Tab.Item>
    );
  }

  return (
    <Tab.Item id={DisplayType.GRID4}>
      <IconGrid />
    </Tab.Item>
  );
};
const TabItemsDesktop = () => {
  return (
    <>
      <Tab.Item id={DisplayType.GRID5}>
        <IconGridExtend />
      </Tab.Item>
      <Tab.Item id={DisplayType.GRID4}>
        <IconGrid />
      </Tab.Item>
      <Tab.Item id={DisplayType.LIST}>
        <IconList />
      </Tab.Item>
    </>
  );
};

const TabDisplayType = () => {
  const { setDisplayType, displayType, isMobile } = useCollectionListContext();

  return (
    <Tab
      className="icon"
      initTab={displayType}
      onChange={(selectedTab) => {
        setDisplayType(selectedTab);
      }}
    >
      {isMobile ? <TabItemsMobile displayType={displayType} /> : <TabItemsDesktop />}
    </Tab>
  );
};

export default TabDisplayType;
