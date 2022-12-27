import React from "react";
import { IconEthereum, IconMarketBasket } from "icons";

const CollectionItemCheckbox = (props: any) => {
  return (
    <div className="absolute top-3 left-3 bg-bg bg-opacity-20 border border-white border-white rounded-full w-6 h-6 z-10">
      <input type="checkbox" className="peer hidden" {...props} />
      <span className="hidden peer-checked:block bg-white absolute top-1/2 left-1/2 w-4 h-4 border border-white rounded-full -translate-x-1/2 -translate-y-1/2"></span>
    </div>
  );
};
const CollectionItem = ({ collection }: { collection: any }) => {
  return (
    <label className="border border-gray rounded-md">
      <div className="overflow-hidden rounded-t-md relative">
        <CollectionItemCheckbox />
        <img alt={collection.image} className="w-full transition-all hover:scale-125" src={collection.image} />
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
    </label>
  );
};

export default React.memo(CollectionItem);
