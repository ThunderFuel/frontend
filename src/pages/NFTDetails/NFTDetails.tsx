import React from "react";
import { AssetMockNFT1 } from "assets";
import clsx from "clsx";
import ImageBar from "./components/ImageBar";
import LeftMenu from "./components/LeftMenu";
import ListNFT from "./rightMenus/ListNFT";

const NFTDetails = () => {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <div className="relative flex justify-between">
      <div className="w-2/5">
        <LeftMenu onChange={() => setIsActive(true)} />
      </div>
      <div className={clsx("absolute right-0 top-0 h-full z-20 bg-bg-light w-3/5 duration-300 transform", isActive && "-translate-x-2/3")}>
        <div className="sticky z-20 top-[112px]">
          <div className="flex gap-x-5 px-[100px] py-10">
            <img src={AssetMockNFT1} />
            <ImageBar />
          </div>
        </div>
      </div>
      <div className="w-2/5 h-fit">
        {/* <Activity onBack={() => setIsActive(false)} /> */}
        <ListNFT />
      </div>
      {/* <Activity /> */}
      {/* <Offers /> */}
    </div>
  );
};

export default NFTDetails;
