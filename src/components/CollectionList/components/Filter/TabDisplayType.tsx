import React from "react";
import Tab from "components/Tab";

import { IconGrid, IconGridExtend, IconList } from "icons";
import { DisplayType, useCollectionListContext } from "../../CollectionListContext";
import Button from "../../../Button";

const TabItemsMobile = ({ displayType, setDisplayType }: any) => {
  const onClick = () => {
    setDisplayType(displayType === DisplayType.GRID4 ? DisplayType.LIST : DisplayType.GRID4);
  };

  return (
    <Button className="btn-icon text-white" onClick={onClick}>
      {displayType === DisplayType.GRID4 ? <IconList /> : <IconGrid />}
    </Button>
  );
};

const TabDisplayType = () => {
  const { setDisplayType, displayType, isMobile } = useCollectionListContext();
  if (isMobile) {
    return <TabItemsMobile displayType={displayType} setDisplayType={setDisplayType} />;
  }

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
