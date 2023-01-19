import React from "react";
import { AssetMockNFT1 } from "assets";
import ImageBar from "./components/ImageBar";
import LeftMenu from "./components/LeftMenu";

const NFTDetails = () => {
  return (
    <div className="flex justify-center">
      <LeftMenu />
      <div className="sticky z-20 h-fit top-[112px]">
        <div className="flex gap-x-5 px-[100px] py-10 bg-bg-light ">
          <img src={AssetMockNFT1} />
          <ImageBar />
        </div>
      </div>
      {/* <Activity /> */}
      {/* <Offers /> */}
      {/* <MakeOffer /> */}
    </div>
  );
};

export default NFTDetails;
