import React from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from "router/config/paths";
import clsx from "clsx";

const Sidebar = () => {
  const menus = [
    { name: "Profile", link: PATHS.SETTINGS_PROFILE },
    { name: "Notifications", link: PATHS.SETTINGS_NOTIFICATION },
  ];

  return (
    <div className="w-[320px] border-r border-gray">
      <ul className="">
        {menus.map((menu) => {
          const activeMenu = location.pathname === menu.link;

          return (
            <li key={menu.link} className={clsx("px-8 py-6 border-b border-b-gray hover:bg-bg-light", activeMenu ? "bg-bg-light" : "")}>
              <NavLink to={menu.link} className={({ isActive }) => clsx("text-h6", isActive ? "text-white" : "text-gray-light")}>
                {menu.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
