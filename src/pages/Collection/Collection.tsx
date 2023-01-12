import React from "react";
import { AssetCollectionProfileImage } from "assets";

import CoverImage from "./components/CoverImage";
import SocialButtons from "./components/SocialButtons";
import CollectionProperties from "./components/CollectionProperties";
import { Outlet } from "react-router-dom";
import Tab from "./components/Tab";

const Collection = () => {
  return (
    <>
      <div className="container-fluid pt-10 pb-14">
        <div className="flex flex-col gap-5">
          <CoverImage />
          <div className="flex">
            <div className="flex gap-5 w-full">
              <div className="w-24">
                <img src={AssetCollectionProfileImage} alt="profile-image" />
              </div>
              <div className="flex flex-col w-full">
                <h3 className="text-h3 text-white">Genuine Undead</h3>
                <SocialButtons />
                <div className="body-medium text-white mt-2.5 w-10/12">
                  24*24 pixel PFP you have never seen. 5995 classic, 3996 cyberpunk and 8 legendaries, over 200 hand drawn traits with a rich variety.
                </div>
              </div>
            </div>
            <CollectionProperties />
          </div>
        </div>
      </div>
      <Tab />
      <Outlet />
    </>
  );
};

export default Collection;
