import React from "react";
import TabBase from "components/Tab";

import { PATHS } from "router/config/paths";
import UseNavigate from "hooks/useNavigate";

const Tab = ({ userId }: any) => {
  const navigate = UseNavigate();
  const routes = [
    { path: PATHS.USER_OWNED, name: "Owned" },
    { path: null, name: "Created" },
    { path: PATHS.USER_LIKED, name: "Liked" },
    { path: PATHS.USER_OFFER, name: "Offers" },
    { path: PATHS.USER_ACTIVITY, name: "Activities" },
  ];
  let initTab = routes.slice(1).find((route: any) => location.pathname.search(route.path) > -1)?.path;
  if (!initTab) {
    initTab = PATHS.USER_OWNED;
  }

  return (
    <div className="border-b border-gray">
      <div className="inline-flex -my-[1px]">
        <TabBase initTab={initTab} className="secondary" onChange={(item: any) => navigate(item, { userId: userId })}>
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
