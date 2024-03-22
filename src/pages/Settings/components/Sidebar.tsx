import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "router/config/paths";
import clsx from "clsx";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = React.useState(PATHS.SETTINGS_PROFILE);
  const menus = [
    { name: "Profile", link: PATHS.SETTINGS_PROFILE },
    //  { name: "Notifications", link: PATHS.SETTINGS_NOTIFICATION },
  ];

  return (
    <div className="w-full lg:w-[320px] lg:border-r lg:border-gray">
      <ul className="">
        {menus.map((menu) => {
          const isActive = activeMenu === menu.link;

          return (
            <li key={menu.link} className={clsx("border-b border-b-gray hover:bg-bg-light", isActive ? "bg-bg-light" : "")}>
              <Link to={menu.link} onClick={() => setActiveMenu(menu.link)} className={clsx("flex px-8 py-6 text-h6", isActive ? "text-white" : "text-gray-light")}>
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
