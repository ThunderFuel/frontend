import React from "react";
import { AssetCollectionProfileImage } from "assets";
import Tab from "components/Tab";

import CollectionContextProvider from "./CollectionContext";

import CoverImage from "./components/CoverImage";
import SocialButtons from "./components/SocialButtons";
import CollectionProperties from "./components/CollectionProperties";
import SideBar from "./components/SidebarFilter/SidebarFilter";
import Filter from "./components/Filter";
import CollectionList from "./components/CollectionList";

const Collection = () => {
  return (
    <CollectionContextProvider>
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
      <div className="border-t border-t-gray">
        <div className="container-fluid">
          <div className="inline-flex">
            <Tab initTab={1} className="secondary">
              <Tab.Item id={1}>Items</Tab.Item>
              <Tab.Item id={2}>Activity</Tab.Item>
            </Tab>
          </div>
        </div>
      </div>
      <Filter />
      <div className="container-fluid flex">
        <SideBar />
        <CollectionList />
      </div>
    </CollectionContextProvider>
  );
};

export default Collection;
