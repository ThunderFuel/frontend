import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import Img from "components/Img";
import collectionsService from "api/collections/collections.service";
import { CollectionResponse } from "api/collections/collections.type";

import CoverImage from "./components/CoverImage";
import SocialButtons from "./components/SocialButtons";
import CollectionProperties from "./components/CollectionProperties";
import Tab from "./components/Tab";
import ReadMore from "components/ReadMore";
import { useAppSelector } from "store";
import UseNavigate from "hooks/useNavigate";
import Button from "components/Button";
import { IconFuelWallet, IconPencil } from "icons";
import { PATHS } from "router/config/paths";

const EDITABLE_USER = 708;

const CollectionProvider = () => {
  return (
    <div className="flex text-h6 gap-1 items-center text-white">
      <span className="text-gray-light">on</span>
      <span className="flex gap-2.5 items-center">
        Fuel
        <span className="flex items-center justify-center border border-gray rounded-full w-7 h-7 p-1" style={{ backgroundColor: "black" }}>
          <IconFuelWallet />
        </span>
      </span>
    </div>
  );
};
const Collection = () => {
  const navigate = UseNavigate();

  const { user } = useAppSelector((state) => state.wallet);
  const { collectionId } = useParams();
  const [collection, setCollection] = useState<CollectionResponse>({} as any);

  useEffect(() => {
    collectionsService
      .getCollectionHeader({
        id: collectionId,
        userId: user?.id,
      })
      .then((response) => {
        setCollection(response.data);
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [collectionId]);

  return (
    <>
      <div className="container-fluid py-10">
        <div className="flex flex-col gap-5">
          {collection?.banner && <CoverImage banner={collection?.banner} />}
          <div className="flex">
            <div className="flex gap-5 w-full">
              <div className="w-24">
                <div className="w-[100px] h-[100px] overflow-hidden rounded-md aspect-square bg-gray">
                  <Img className="w-full" src={collection?.image} alt="profile-image" />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h3 className="text-h3 text-white">{collection?.name}</h3>
                <div className="flex gap-5">
                  <SocialButtons socialMedias={collection?.socialMedias} collection={collection} />
                  <CollectionProvider />
                  {user.id === EDITABLE_USER && (
                    <Button className="btn-secondary btn-sm h-10" onClick={() => navigate(PATHS.COLLECTION_EDIT, { collectionId: collectionId })}>
                      EDIT COLLECTION <IconPencil />
                    </Button>
                  )}
                </div>

                <ReadMore text={collection?.description ?? ""} characterLimit={150} />
              </div>
            </div>
            <CollectionProperties
              floor={collection?.floor}
              volume={collection?.volume}
              listedCount={collection?.listedCount}
              ownerCount={collection?.ownerCount}
              supply={collection?.supply}
              royalty={collection?.royalty}
            />
          </div>
        </div>
      </div>
      <Tab />
      <Outlet />
    </>
  );
};

export default Collection;
