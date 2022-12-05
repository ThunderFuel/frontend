import React from "react";
import { AssetCollectionProfileImage } from "assets";
import Tab from "components/Tab";

import CoverImage from "./components/CoverImage";
import SocialButtons from "./components/SocialButtons";
import CollectionProperties from "./components/CollectionProperties";
import SidebarFilter from "./components/SidebarFilter";

const Collection = () => {
  return (
    <div>
      <div className="container py-10">
        <div className="flex flex-col gap-5">
          <CoverImage />
          <div className="flex">
            <div className="flex gap-5 w-full">
              <div className="w-24">
                <img src={AssetCollectionProfileImage} alt="profile-image" />
              </div>
              <div className="flex flex-col gap-2.5 w-full">
                <h3 className="text-h3 text-white">Genuine Undead</h3>
                <SocialButtons />
                <div className="body-medium text-white">
                  24*24 pixel PFP you have never seen. 5995 classic, 3996 cyberpunk and 8 legendaries, over 200 hand
                  drawn traits with a rich variety.
                </div>
              </div>
            </div>
            <CollectionProperties />
          </div>
        </div>
      </div>
      <div className="border-t border-b border-gray">
        <div className="container">
          <div className="inline-flex">
            <Tab initTab={1} className="secondary">
              <Tab.Item id={1}>Items</Tab.Item>
              <Tab.Item id={2}>Activity</Tab.Item>
            </Tab>
          </div>
        </div>
        <div className="border-t border-gray">
          <div className="container">filters</div>
        </div>
      </div>
      <div className="container flex">
        <SidebarFilter />
        <div className="flex flex-1 pl-5 py-5 gap-5">
          <div className="text-headline-02 text-gray-light">10,000 ITEMS</div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
