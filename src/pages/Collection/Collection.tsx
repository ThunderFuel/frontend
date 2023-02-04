import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import Img from "components/Img";
import collectionsService from "api/collections/collections.service";
import { CollectionResponse } from "api/collections/collections.type";

import CoverImage from "./components/CoverImage";
import SocialButtons from "./components/SocialButtons";
import CollectionProperties from "./components/CollectionProperties";
import Tab from "./components/Tab";

const Collection = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState<CollectionResponse>({} as any);

  useEffect(() => {
    collectionsService.getCollectionHeader(collectionId as string).then((response) => {
      setCollection(response.data);
    });
  }, [collectionId]);

  return (
    <>
      <div className="container-fluid pt-10 pb-14">
        <div className="flex flex-col gap-5">
          <CoverImage banner={collection?.banner} />
          <div className="flex">
            <div className="flex gap-5 w-full">
              <div className="w-24">
                <div className=" overflow-hidden rounded-md aspect-square bg-gray">
                  <Img className="w-20 h-20" src={collection?.image} alt="profile-image" />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h3 className="text-h3 text-white">{collection?.name}</h3>
                <SocialButtons socialMedias={collection?.socialMedias} />
                <div className="body-medium text-white mt-2.5 w-10/12">{collection?.description}</div>
              </div>
            </div>
            <CollectionProperties floor={collection?.floor} volume={collection?.volume} listedRate={collection?.listedRate} ownerCount={collection?.ownerCount} />
          </div>
        </div>
      </div>
      <Tab />
      <Outlet />
    </>
  );
};

export default Collection;
