import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import Img from "components/Img";
import collectionsService from "api/collections/collections.service";
import { CollectionResponse } from "api/collections/collections.type";

import CoverImage from "./components/CoverImage";
import SocialButtons from "./components/SocialButtons";
import CollectionProperties from "./components/CollectionProperties";
import Tab from "./components/Tab";
import { AssetLoadingCollectionLogo } from "assets";
import { useIsMobile } from "hooks/useIsMobile";
import MobileWarning from "components/MobileWarning";

const Collection = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState<CollectionResponse>({} as any);

  useEffect(() => {
    collectionsService.getCollectionHeader(collectionId as string).then((response) => {
      setCollection(response.data);
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [collectionId]);

  return !useIsMobile() ? (
    <>
      <div className="container-fluid pt-10 pb-14">
        <div className="flex flex-col gap-5">
          <CoverImage banner={collection?.banner} />
          <div className="flex">
            <div className="flex gap-5 w-full">
              <div className="w-24">
                <div className="w-[100px] h-[100px] overflow-hidden rounded-md aspect-square bg-gray">
                  <Img className="w-full" src={collection?.image ?? AssetLoadingCollectionLogo} defaultImage={AssetLoadingCollectionLogo} alt="profile-image" />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h3 className="text-h3 text-white">{collection?.name}</h3>
                <SocialButtons socialMedias={collection?.socialMedias} />
                <div className="body-medium text-white mt-2.5 w-10/12">{collection?.description}</div>
              </div>
            </div>
            <CollectionProperties floor={collection?.floor} volume={collection?.volume} listedCount={collection?.listedCount} ownerCount={collection?.ownerCount} />
          </div>
        </div>
      </div>
      <Tab />
      <Outlet />
    </>
  ) : (
    <div className="m-5">
      <MobileWarning />
    </div>
  );
};

export default Collection;
