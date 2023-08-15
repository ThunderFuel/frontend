import React from "react";

import "./Sidebar.css";
import { numberFormat } from "utils";
import LogoContainer from "./components/LogoContainer";
import { BoxGroup, BoxGroupItem } from "./components/Box";
import CoverImage from "./components/CoverImage";
import { ButtonEdit, ButtonFollow } from "./components/Buttons";
import { FollowType, useProfile } from "../../ProfileContext";

const SidebarBio = ({ children }: any) => {
  return (
    <div className="flex items-end body-medium">
      <span className=" min-h-[21px] text-overflow-3">{children}</span>
    </div>
  );
};

const Sidebar = ({ isProfile = false }: any) => {
  const { userInfo, onSetSocialActiveTab } = useProfile();
  const ownedTokens = userInfo?.tokens ?? [];

  return (
    <div className="flex flex-col border-r border-gray" style={{ minWidth: "var(--profile-cover-image-width)", maxWidth: "var(--profile-cover-image-width)" }}>
      <div className="sidebar-container">
        {isProfile ? <ButtonEdit /> : <ButtonFollow />}
        <CoverImage src={userInfo?.banner} />
        <div className="p-5 relative text-white flex flex-col gap-5">
          <LogoContainer userInfo={userInfo} />
          <div className="sidebar-profile-info flex gap-4">
            <BoxGroup>
              <BoxGroupItem
                header="Followers"
                onClick={() => {
                  onSetSocialActiveTab(FollowType.Followers);
                }}
              >
                {numberFormat(userInfo?.followers?.length)}
              </BoxGroupItem>
              <BoxGroupItem
                header="FOLLOWING"
                onClick={() => {
                  onSetSocialActiveTab(FollowType.Follows);
                }}
              >
                {numberFormat(userInfo?.follows?.length)}
              </BoxGroupItem>
              <BoxGroupItem
                header="Collected"
                onClick={() => {
                  onSetSocialActiveTab(FollowType.Follows);
                }}
              >
                {numberFormat(ownedTokens.length)}
              </BoxGroupItem>
            </BoxGroup>
            <SidebarBio>{userInfo?.bio}</SidebarBio>
          </div>
          {/*userInfo?.lastOffer ? <BoxWithIconLastOffer lastOffer={userInfo.lastOffer} /> : null*/}
          {/*userInfo?.lastActivity ? <BoxWithIconLastActivity lastActivity={userInfo?.lastActivity} /> : null*/}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
