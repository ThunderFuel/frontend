import React, { useState } from "react";
import { IconEthereum, IconMarketBasket, IconThunderSmall } from "icons";
import clsx from "clsx";

const ButtonBuyNow = ({ className, onClick }: any) => {
  return (
    <button className={clsx("absolute w-full bg-white text-headline-02 flex items-center justify-center py-1.5 gap-1.5", className)} onClick={onClick}>
      <span className="uppercase">buy now</span>
      <IconThunderSmall className="w-7 h-7" />
    </button>
  );
};
const CollectionItemCheckbox = (props: any) => {
  return (
    <label className="absolute top-3 left-3 bg-bg bg-opacity-20 border border-white border-white rounded-full w-6 h-6 z-10">
      <input type="checkbox" className="peer hidden" {...props} />
      <span className="hidden peer-checked:block bg-white absolute top-1/2 left-1/2 w-4 h-4 border border-white rounded-full -translate-x-1/2 -translate-y-1/2"></span>
    </label>
  );
};
const CollectionItem = ({ collection }: { collection: any }) => {
  const [isSelected, setIsSelected] = useState(false);
  const onSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className={clsx("group relative overflow-hidden border rounded-md", isSelected ? "border-white" : "border-gray")}>
      <div className="overflow-hidden relative">
        <CollectionItemCheckbox checked={isSelected} onClick={onSelect} />
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
      <ButtonBuyNow className={clsx("transition-all group-hover:-translate-y-full", isSelected ? "-translate-y-full" : "translate-y-full")} onClick={onSelect} />
    </div>
  );
};

export default React.memo(CollectionItem);
