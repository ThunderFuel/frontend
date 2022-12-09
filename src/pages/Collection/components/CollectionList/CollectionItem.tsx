import React from "react";
import { IconEthereum, IconMarketBasket } from "icons";
import {
  AssetCollectionItem0,
  AssetCollectionItem1,
  AssetCollectionItem2,
  AssetCollectionItem3,
  AssetCollectionItem4,
} from "assets";

const CollectionItem = ({ collection }: { collection: any }) => {
  const images = [
    AssetCollectionItem0,
    AssetCollectionItem1,
    AssetCollectionItem2,
    AssetCollectionItem3,
    AssetCollectionItem4,
  ];

  return (
    <div className="border border-gray rounded-md">
      <div className="overflow-hidden rounded-t-md">
        <img className="w-full" src={images[collection.image]} />
      </div>
      <div className="p-2.5 border-b border-b-gray">
        <h6 className="text-h6 text-white">{collection.name}</h6>
      </div>
      <div className="p-2.5 flex items-center">
        <h6 className="text-h5 text-white">{collection.floor}</h6>
        <IconEthereum className="text-gray-light" />
      </div>
      <div className="p-2.5 flex items-center text-gray-light">
        <IconMarketBasket />
        <span className="text-bodySm">Last sale price 0.12 ETH</span>
      </div>
    </div>
  );
};

export default React.memo(CollectionItem);
