import React from "react";
import CollectionsItem from "../components/CollectionsItem";
import { AssetCollectionCoverImage1, AssetEmptyCart } from "assets";

const Collections = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <img src={AssetEmptyCart} />
      <span className="text-bodyLg font-spaceGrotesk text-gray-light">You don’t have any collections.</span>
      <div className="flex gap-4">
        <CollectionsItem coverImage={AssetCollectionCoverImage1} name="Genuine Undead" creatorImage={AssetCollectionCoverImage1} />
        <CollectionsItem coverImage={AssetCollectionCoverImage1} name="Genuine Undead" creatorImage={AssetCollectionCoverImage1} />
      </div>
    </div>
  );
};

export default Collections;
