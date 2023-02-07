import React from "react";

import "./Sidebar.css";
import { IconQuarry } from "icons";
import { numberFormat } from "utils";
import LogoContainer from "./components/LogoContainer";
import BoxWithIcon from "./components/BoxWithIcon";
import CoverImage from "./components/CoverImage";
import { ButtonEdit, ButtonFollow } from "./components/Buttons";

const Sidebar = ({ userInfo, openFollowers, openFollows, onChangeFollowers, isProfile = false }: any) => {
  return (
    <div className="flex flex-col border-r border-gray w-[500px]">
      <div className="sidebar-container">
        {isProfile ? <ButtonEdit /> : <ButtonFollow userInfo={userInfo} onChangeFollowers={onChangeFollowers} />}
        <CoverImage />
        <div className="p-10 relative pt-[150px] text-white w-full h-full flex">
          <div className="flex flex-col w-full">
            <LogoContainer userName={userInfo?.userName} socialMedias={userInfo?.socialMedias} userId={userInfo?.id} />
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
