import React from "react";
import TabBase from "components/Tab";

import { PATHS } from "router/config/paths";
import { useLocation, useNavigate } from "react-router-dom";
import { IconDots } from "icons";
import { useClickOutside } from "hooks/useClickOutside";

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

const TabMoreDropdowns = () => {
  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef<HTMLLIElement>(null);
  const items = [{ text: "Cancel All Listings" }, { text: "Cancel All Offers" }, { text: "Cancel All Listings and Offers" }];

  useClickOutside(containerRef, () => {
    setShow(false);
  });

  return (
    <li className="relative" ref={containerRef}>
      <span className={show ? "active" : ""} onClick={() => setShow(!show)}>
        <IconDots />
      </span>
      {show ? (
        <ul className="absolute right-0 top-full mt-1 flex flex-col bg-bg border border-gray rounded-[4px] divide-y divide-gray overflow-hidden z-10">
          {items.map((item, k) => {
            return (
              <li key={k} onClick={console.log} className="flex items-center justify-between cursor-pointer px-4 py-3 text-white hover:bg-bg-light">
                <div className="flex w-full body-medium whitespace-nowrap">{item.text}</div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
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
    <div className="border-b border-gray relative z-[21]">
      <div className="inline-flex -my-[1px]">
        <TabBase
          initTab={initTab}
          className="secondary"
          onChange={(item) => {
            if (item !== "more") {
              navigate(item);
            }
          }}
        >
          {routes.map((route: any) => (
            <TabBase.Item id={route.path} key={route.name}>
              {route.name}
            </TabBase.Item>
          ))}
          <TabMoreDropdowns />
        </TabBase>
      </div>
    </div>
  );
};

export default Tab;
