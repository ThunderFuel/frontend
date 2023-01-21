import React from "react";
import { AssetMockNFT1 } from "assets";
import ImageBar from "./components/ImageBar";
import LeftMenu from "./components/LeftMenu";
import Activity from "./rightMenus/Activity";
import clsx from "clsx";

const NFTDetails = () => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="relative flex justify-between">
      <div className="w-2/5">
        <LeftMenu onChange={() => setIsActive(true)} />
      </div>
      <div className={clsx("absolute right-0 top-0 h-full bg-bg-light w-3/5 duration-300 transform", isActive && "-translate-x-2/3")}>
        <div className="sticky z-20 top-[112px]">
          <div className="flex gap-x-5 px-[100px] py-10">
            <img src={AssetMockNFT1} />
            <ImageBar />
          </div>
        </div>
      </div>
      <div className="w-2/5">
        <Activity onBack={() => setIsActive(false)} />
      </div>
      {/* <Activity /> */}
      {/* <Offers /> */}
    </div>
  );
};

export default NFTDetails;
