import React from "react";
import TabBase from "components/Tab";

import { PATHS } from "router/config/paths";
import { useLocation } from "react-router-dom";
import useNavigate, { getAbsolutePath } from "hooks/useNavigate";

const routes = [
  { path: PATHS.USER_OWNED, name: "Owned" },
  { path: PATHS.USER_LIKED, name: "Liked" },
  { path: PATHS.USER_OFFER, name: "Offers" },
  { path: PATHS.USER_ACTIVITY, name: "Activities" },
];

const getInitTab = (userId: any) => {
  return routes.slice(1).find((route: any) => location.pathname.search(getAbsolutePath(route.path, { userId })) > -1)?.path;
};

const Tab = ({ userId }: any) => {
  const [initTab, setInitTab] = React.useState(getInitTab(userId));
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    let tmpInitTab = getInitTab(userId);
    if (!tmpInitTab) {
      tmpInitTab = PATHS.USER;
    }
    setInitTab(tmpInitTab);
  }, [location]);

  return (
    <div className="border-b border-gray">
      <div className="inline-flex -my-[1px]">
        <TabBase
          initTab={initTab}
          className="secondary"
          onChange={(item: any) => {
            navigate(item, { userId });
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
