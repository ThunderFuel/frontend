import React from "react";
import Img from "components/Img";
import { AssetProfileBg, AssetProfileLogo } from "assets";
import SocialButtons from "../../Collection/components/SocialButtons";

import "./Sidebar.css";
import { IconCirclePlus } from "icons";

const CoverImage = () => {
  return (
    <div className="profile-cover-image">
      <Img src={AssetProfileBg} className="w-full" />
    </div>
  );
};
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

const Box = () => {
  return (
    <div className="grid grid-cols-2 bg-bg border border-gray rounded-md mt-5">
      <div className="flex flex-col gap-2 px-4 py-3.5 text-gray-light border-r border-r-gray">
        <div className="text-headline-01 uppercase">followers</div>
        <h4 className="text-h4 text-white">12</h4>
      </div>
      <div className="flex flex-col gap-2 px-4 py-3.5 text-gray-light">
        <div className="text-headline-01 uppercase">FOLLOWING</div>
        <h4 className="text-h4 text-white">1,223</h4>
      </div>
    </div>
  );
};
const Box1 = () => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div className="flex flex-col gap-2 px-4 py-3.5 text-gray-light bg-bg border border-gray rounded-md">
        <div className="text-headline-01 uppercase">followers</div>
        <h4 className="text-h4 text-white text-right mt-20">12</h4>
      </div>
      <div className="flex flex-col gap-2 px-4 py-3.5 text-gray-light bg-bg border border-gray rounded-md">
        <div className="text-headline-01 uppercase">FOLLOWING</div>
        <h4 className="text-h4 text-white text-right mt-20">1,223</h4>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray w-[500px]">
      <CoverImage />
      <div className="p-10 relative -translate-y-[272px] text-white">
        <div className="flex flex-col">
          <LogoContainer />
          <div className="body-medium mt-5">Gm! I’m xero and I like to collect superb NFTs</div>
          <Box />
          <Box1 />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
