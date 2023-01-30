import React from "react";
import TabBase from "components/Tab";

import { PATHS } from "router/config/paths";
import { useNavigate } from "react-router-dom";

const Tab = () => {
  const navigate = useNavigate();
  const routes = [2, 3, 4, PATHS.PROFILE_ACTIVITY];
  let initTab = routes.find((route: any) => location.pathname.search(route) > -1);
  if (!initTab) {
    initTab = PATHS.PROFILE_OWNED;
  }

  return (
    <div className="border-b border-gray">
      <div className="inline-flex -my-[1px]">
        <TabBase
          initTab={initTab}
          className="secondary"
          onChange={(item) => {
            navigate(item);
          }}
        >
          <TabBase.Item id={PATHS.PROFILE_OWNED}>Owned</TabBase.Item>
          <TabBase.Item id={2}>Created</TabBase.Item>
          <TabBase.Item id={3}>Liked</TabBase.Item>
          <TabBase.Item id={4}>Offers</TabBase.Item>
          <TabBase.Item id={PATHS.PROFILE_ACTIVITY}>Activity</TabBase.Item>
        </TabBase>
      </div>
    </div>
  );
};

export default Tab;
