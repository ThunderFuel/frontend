import React from "react";
import { AssetEmptyCart, AssetMockNFT1 } from "assets";
import CollectorsItem from "../components/CollectorsItem";

const Collectors = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <img src={AssetEmptyCart} />
      <span className="text-bodyLg font-spaceGrotesk text-gray-light">You don’t have any collections.</span>
      <div className="flex gap-4">
        <CollectorsItem name="Genuine Undead" creatorImage={AssetMockNFT1} />
        <CollectorsItem name="Genuine Undead" creatorImage={AssetMockNFT1} />
      </div>
    </div>
  );
};

export default Collectors;
