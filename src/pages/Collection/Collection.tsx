import React, { useEffect, useState } from "react";
import { AssetCollectionProfileImage } from "assets";

import CoverImage from "./components/CoverImage";
import SocialButtons from "./components/SocialButtons";
import CollectionProperties from "./components/CollectionProperties";
import { Outlet, useParams } from "react-router-dom";
import Tab from "./components/Tab";
import collectionsService from "../../api/collections/collections.service";
import { CollectionItemResponse } from "../../api/collections/collections.type";

const Collection = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState<CollectionItemResponse>({} as any);

  useEffect(() => {
    collectionsService.getCollectionHeader(collectionId as string).then((response) => {
      setCollection(response.data);
    });
    console.log(collectionId);
  }, [collectionId]);

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
                <h3 className="text-h3 text-white">{collection.name}</h3>
                <SocialButtons />
                <div className="body-medium text-white mt-2.5 w-10/12">{collection.description}</div>
              </div>
            </div>
            <CollectionProperties floor={collection.floor} volume={collection.volume} listedRate={collection.listedRate} ownerCount={collection.ownerCount} />
          </div>
        </div>
      </div>
      <Tab />
      <Outlet />
    </>
  );
};

export default Collection;
