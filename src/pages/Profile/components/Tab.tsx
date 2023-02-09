import React from "react";
import TabBase from "components/Tab";

import { PATHS } from "router/config/paths";
import { useLocation, useNavigate } from "react-router-dom";

const routes = [
  { path: PATHS.PROFILE_OWNED, name: "Owned" },
  // { path: null, name: "Created" },
  { path: PATHS.PROFILE_LIKED, name: "Liked" },
  { path: PATHS.PROFILE_OFFER, name: "Offers" },
  { path: PATHS.PROFILE_ACTIVITY, name: "Activities" },
];

const getInitTab = () => {
  return routes.slice(1).find((route: any) => location.pathname.search(route.path) > -1)?.path;
};

const Tab = () => {
  const [initTab, setInitTab] = React.useState(getInitTab());
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    let tmpInitTab = getInitTab();
    if (!tmpInitTab) {
      tmpInitTab = PATHS.PROFILE_OWNED;
    }
    setInitTab(tmpInitTab);
  }, [location]);

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
