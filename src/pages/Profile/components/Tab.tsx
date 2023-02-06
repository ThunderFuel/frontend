import React from "react";
import TabBase from "components/Tab";

import { PATHS } from "router/config/paths";
import { useNavigate } from "react-router-dom";

const Tab = () => {
  const navigate = useNavigate();
  const routes = [
    { path: PATHS.PROFILE_OWNED, name: "Owned" },
    // { path: null, name: "Created" },
    { path: PATHS.PROFILE_LIKED, name: "Liked" },
    { path: PATHS.PROFILE_OFFER, name: "Offers" },
    { path: PATHS.PROFILE_ACTIVITY, name: "Activities" },
  ];
  let initTab = routes.slice(1).find((route: any) => location.pathname.search(route.path) > -1)?.path;
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
          {routes.map((route: any) => (
            <TabBase.Item id={route.path} key={route.name}>
              {route.name}
            </TabBase.Item>
          ))}
        </TabBase>
      </div>
    </div>
  );
};

export default Tab;
