import React from "react";

import "./Sidebar.css";
import { numberFormat } from "utils";
import LogoContainer from "./components/LogoContainer";
import { Box, BoxWithIconLastActivity, BoxWithIconLastOffer } from "./components/Box";
import CoverImage from "./components/CoverImage";
import { ButtonEdit, ButtonFollow } from "./components/Buttons";
import { FollowType, useProfile } from "../../ProfileContext";

const Sidebar = ({ isProfile = false }: any) => {
  const { userInfo, onSetSocialActiveTab } = useProfile();

  return (
    <div className="flex flex-col border-r border-gray min-w-[500px] max-w-[500px]">
      <div className="sidebar-container">
        {isProfile ? <ButtonEdit /> : <ButtonFollow />}
        <CoverImage src={userInfo?.banner} />
        <div className="p-10 relative pt-[150px] text-white w-full h-full flex">
          <div className="flex flex-col w-full">
            <LogoContainer userInfo={userInfo} />
            <div className="body-medium mt-5">{userInfo?.bio}</div>
            <div className="grid grid-cols-2 gap-2 mt-5">
              <Box
                header="followers"
                onClick={() => {
                  onSetSocialActiveTab(FollowType.Followers);
                }}
              >
                {numberFormat(userInfo?.followers?.length)}
              </Box>
              <Box
                header="FOLLOWING"
                onClick={() => {
                  onSetSocialActiveTab(FollowType.Follows);
                }}
              >
                {numberFormat(userInfo?.follows?.length)}
              </Box>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-2 mt-2">
              <Box header="lısted/owned" className="justify-between">
                {numberFormat(userInfo?.tokens?.length)}
              </Box>
              <Box header="created" className="justify-between">
                0
              </Box>
            </div>
            {userInfo?.lastOffer ? <BoxWithIconLastOffer lastOffer={userInfo.lastOffer} /> : null}
            {userInfo?.lastActivity ? <BoxWithIconLastActivity lastActivity={userInfo?.lastActivity} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
