import React from "react";
import TabBase from "components/Tab";

import { PATHS } from "router/config/paths";
import { useLocation, useNavigate } from "react-router-dom";

const Tab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let initTab = "";
  if (location.pathname.search(PATHS.COLLECTION_ACTIVITY) > -1) {
    initTab = PATHS.COLLECTION_ACTIVITY;
  }

  return (
    <div className="border-y border-y-gray">
      <div className="lg:container-fluid">
        <div className="flex lg:inline-flex">
          <TabBase
            initTab={initTab}
            className="secondary"
            onChange={(item) => {
              navigate(item);
            }}
          >
            <TabBase.Item id={PATHS.COLLECTION_ITEMS}>Items</TabBase.Item>
            <TabBase.Item id={PATHS.COLLECTION_ACTIVITY}>Activity</TabBase.Item>
          </TabBase>
        </div>
      </div>
    </div>
  );
};

export default Tab;
