import React, { SVGProps } from "react";
import Img from "components/Img";
import { AssetProfileBg } from "assets";
import SocialButtons from "../../Collection/components/SocialButtons";

import "./Sidebar.css";
import { IconCirclePlus, IconPlus, IconQuarry } from "icons";
import { numberFormat } from "utils";
import Button from "components/Button";
import clsx from "clsx";
import Avatar from "./Avatar";

const CoverImage = () => {
  return (
    <div className="profile-cover-image">
      <Img src={AssetProfileBg} className="w-full" />
      <Button>
        FOLLOW <IconPlus />
      </Button>
    </div>
  );
};
const LogoContainer = ({ userName, image, socialMedias }: any) => {
  return (
    <div className="flex gap-5 w-full">
      <Avatar image={image} className="w-[95px] h-[95px]" />
      <div className="flex flex-col gap-2.5 flex-1">
        <h3 className="text-h3">{userName}</h3>
        <SocialButtons socialMedias={socialMedias} />
        <div className="flex items-center gap-2">
          <IconCirclePlus className="text-gray-light" />
          <div className="text-headline-01 text-gray-light">FOLLOWS YOU</div>
        </div>
      </div>
    </div>
  );
};

const BoxWithIcon = React.memo(({ children, className, icon }: { children: React.ReactNode; className?: string; icon: React.FC<SVGProps<SVGSVGElement>> }) => {
  const Icon = icon;

  return (
    <div className={clsx("group flex items-center w-full py-4 pl-2.5 gap-x-2.5 rounded-[5px] border border-gray", className)}>
      <div className="h-fit rounded-full bg-gray p-[6px]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-y-[5px]">{children}</div>
    </div>
  );
});
BoxWithIcon.displayName = "BoxWithIcon";

const Sidebar = ({ userInfo, openFollowers, openFollows }: any) => {
  return (
    <div className="flex flex-col border-r border-gray w-[500px]">
      <div className="sidebar-container">
        <CoverImage />
        <div className="p-10 relative pt-[150px] text-white w-full h-full flex">
          <div className="flex flex-col w-full">
            <LogoContainer userName={userInfo?.userName} socialMedias={userInfo?.socialMedias} />
            <div className="body-medium mt-5">Gm! I’m xero and I like to collect superb NFTs</div>
            <div className="grid grid-cols-2 bg-bg border border-gray rounded-md mt-5">
              <div className="flex flex-col gap-2 px-4 py-3.5 text-gray-light border-r border-r-gray cursor-pointer" onClick={openFollowers}>
                <div className="text-headline-01 uppercase">followers</div>
                <h4 className="text-h4 text-white">{numberFormat(userInfo.followers?.length)}</h4>
              </div>
              <div className="flex flex-col gap-2 px-4 py-3.5 text-gray-light cursor-pointer" onClick={openFollows}>
                <div className="text-headline-01 uppercase">FOLLOWING</div>
                <h4 className="text-h4 text-white">{numberFormat(userInfo.follows?.length)}</h4>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-2 mt-2">
              <div className="flex flex-col gap-2 px-4 py-3.5 text-gray-light bg-bg border border-gray rounded-md justify-between">
                <div className="text-headline-01 uppercase">lısted/owned</div>
                <h4 className="text-h4 text-white text-right mt-2">{numberFormat(userInfo.tokens?.length)}</h4>
              </div>
              <div className="flex flex-col gap-2 px-4 py-3.5 text-gray-light bg-bg border border-gray rounded-md justify-between">
                <div className="text-headline-01 uppercase">created</div>
                <h4 className="text-h4 text-white text-right mt-2">{numberFormat(userInfo.tokens?.length)}</h4>
              </div>
            </div>
            <BoxWithIcon icon={IconQuarry} className="mt-2">
              <div className="text-headline-01 text-gray-light uppercase">LAST offer</div>
              <h6 className="text-h6">0.99 ETH Bid placed by 09x910</h6>
            </BoxWithIcon>
            <BoxWithIcon icon={IconQuarry} className="mt-2">
              <div className="text-headline-01 text-gray-light uppercase">LAST ACTIVITY</div>
              <h6 className="text-h6">Minted CloneX #2750</h6>
            </BoxWithIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
