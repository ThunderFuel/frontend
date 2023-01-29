import React from "react";
import Img from "components/Img";
import {
  AssetProfileAvatar1,
  AssetProfileAvatar10,
  AssetProfileAvatar2,
  AssetProfileAvatar3,
  AssetProfileAvatar4,
  AssetProfileAvatar5,
  AssetProfileAvatar6,
  AssetProfileAvatar7,
  AssetProfileAvatar8,
  AssetProfileAvatar9,
  AssetProfileBg,
} from "assets";
import SocialButtons from "../../Collection/components/SocialButtons";

import "./Sidebar.css";
import { IconCirclePlus, IconPlus } from "icons";
import userService from "api/user/user.service";
import { IUserResponse } from "api/user/user.type";
import { randomIntFromInterval } from "utils";
import Button from "../../../components/Button";

const avatars = [
  AssetProfileAvatar1,
  AssetProfileAvatar2,
  AssetProfileAvatar3,
  AssetProfileAvatar4,
  AssetProfileAvatar5,
  AssetProfileAvatar6,
  AssetProfileAvatar7,
  AssetProfileAvatar8,
  AssetProfileAvatar9,
  AssetProfileAvatar10,
];

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
      <div className="rounded-full overflow-hidden w-[95px] h-[95px]">
        <Img className="w-full" src={image ?? avatars[randomIntFromInterval(0, avatars.length)]} />
      </div>
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
  const [userInfo, setUserInfo] = React.useState<IUserResponse>({} as any);
  const fetchUserProfile = async () => {
    const response = await userService.getUser({ id: 1 });
    setUserInfo(response.data);
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col border-r border-gray w-[500px]">
      <CoverImage />
      <div className="p-10 relative -translate-y-[272px] text-white">
        <div className="flex flex-col">
          <LogoContainer userName={userInfo?.userName} socialMedias={userInfo?.socialMedias} />
          <div className="body-medium mt-5">Gm! I’m xero and I like to collect superb NFTs</div>
          <Box />
          <Box1 />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
