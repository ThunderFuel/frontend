import React from "react";
import Img from "components/Img";
import { AssetProfileBg } from "assets";

import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray w-[500px]">
      <div className="profile-cover-image">
        <Img src={AssetProfileBg} className="w-full" />
      </div>
    </div>
  );
};

export default Sidebar;
