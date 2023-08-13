import React from "react";

import "./Sidebar.css";
import { numberFormat } from "utils";
import LogoContainer from "./components/LogoContainer";
import { BoxGroup, BoxGroupItem } from "./components/Box";
import CoverImage from "./components/CoverImage";
import { ButtonEdit, ButtonFollow } from "./components/Buttons";
import { FollowType, useProfile } from "../../ProfileContext";

const Sidebar = ({ isProfile = false }: any) => {
  const { userInfo, onSetSocialActiveTab } = useProfile();
  const ownedTokens = userInfo?.tokens ?? [];
  const listedTokens = ownedTokens.filter((item: any) => item.salable);

  return (
    <div className="flex flex-col border-r border-gray min-w-[410px] max-w-[410px]">
      <div className="sidebar-container">
        {isProfile ? <ButtonEdit /> : <ButtonFollow />}
        <CoverImage src={userInfo?.banner} />
        <div className="p-5 relative text-white flex">
          <div className="flex flex-col w-full">
            <LogoContainer userInfo={userInfo} />
            <BoxGroup className="mt-4">
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
                {numberFormat(listedTokens.length)}/{numberFormat(ownedTokens.length)}
              </BoxGroupItem>
            </BoxGroup>
            <div className="body-medium mt-5 min-h-[21px] text-overflow-3">
              VerticalCrypto Art Gallery. As a leading curatorial media studio, we work at the intersection of the web3 ecosystem, crypto art and bloc... Read More
            </div>
            {/*userInfo?.lastOffer ? <BoxWithIconLastOffer lastOffer={userInfo.lastOffer} /> : null*/}
            {/*userInfo?.lastActivity ? <BoxWithIconLastActivity lastActivity={userInfo?.lastActivity} /> : null*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
