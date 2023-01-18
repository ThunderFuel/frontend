import React from "react";
import Img from "components/Img";
import { AssetProfileBg, AssetProfileLogo } from "assets";
import SocialButtons from "../../Collection/components/SocialButtons";

import "./Sidebar.css";
import { IconCirclePlus } from "icons";

const LogoContainer = () => {
  const socialMedias = [
    { type: 0, url: "http://www.azuki.com/" },
    { type: 1, url: "https://discord.gg/azuki" },
    { type: 2, url: "https://www.instagram.com/azuki" },
    { type: 4, url: "https://www.twitter.com/azukiofficial" },
  ];

  return (
    <div className="flex gap-5 w-full">
      <div className="rounded-full overflow-hidden">
        <Img src={AssetProfileLogo} />
      </div>
      <div className="flex flex-col gap-2.5 flex-1">
        <h3 className="text-h3">@psyoo</h3>
        <SocialButtons socialMedias={socialMedias} />
        <div className="flex items-center gap-2">
          <IconCirclePlus className="text-gray-light" />
          <div className="text-headline-01 text-gray-light">FOLLOWS YOU</div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray w-[500px]">
      <div className="profile-cover-image">
        <Img src={AssetProfileBg} className="w-full" />
      </div>
      <div className="p-10 relative -translate-y-52 text-white">
        <div className="flex">
          <LogoContainer />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
