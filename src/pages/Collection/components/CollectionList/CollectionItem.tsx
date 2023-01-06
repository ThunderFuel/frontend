import React, { useState } from "react";
import { IconEthereum, IconHand, IconMarketBasket, IconThunderSmall } from "icons";
import clsx from "clsx";
import { useAppDispatch } from "store";
import { add, remove } from "store/cartSlice";

const ButtonBuyNow = React.memo(({ className, onClick }: any) => {
  return (
    <button className={clsx("button-animation w-full bg-white text-headline-02 flex-center py-1.5 gap-2", className)} onClick={onClick}>
      <span className="uppercase">buy now</span>
      <IconThunderSmall className="w-7 h-7" />
    </button>
  );
});
ButtonBuyNow.displayName = "ButtonBuyNow";

const ButtonMakeOffer = React.memo(({ className, onClick }: any) => {
  return (
    <button className={clsx("button-animation w-full bg-bg border-t border-t-gray text-headline-02 text-white flex-center py-3 gap-2", className)} onClick={onClick}>
      <span className="uppercase">make offer</span>
      <IconHand className="fill-white" />
    </button>
  );
});
ButtonMakeOffer.displayName = "ButtonMakeOffer";
const CollectionItemCheckbox = (props: any) => {
  return (
    <label className="absolute top-3 left-3 bg-bg bg-opacity-20 border border-white border-white rounded-full w-6 h-6 z-10">
      <input type="checkbox" className="peer hidden" {...props} />
      <span className="hidden peer-checked:block bg-white absolute top-1/2 left-1/2 w-4 h-4 border border-white rounded-full -translate-x-1/2 -translate-y-1/2"></span>
    </label>
  );
};
const CollectionItem = ({ collection }: { collection: any }) => {
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const onSelect = () => {
    if (!isSelected) {
      dispatch(add(collection));
    } else {
      dispatch(remove(collection.id));
    }
    setIsSelected(!isSelected);
  };

  return (
    <div className={clsx("group relative overflow-hidden border rounded-md hover:bg-bg-light", isSelected ? "border-white" : "border-gray")}>
      <div className="overflow-hidden relative">
        <CollectionItemCheckbox checked={isSelected} onChange={onSelect} />
        <img alt={collection.image} className="w-full transition-all duration-300 group-hover:scale-[120%]" src={collection.image} />
      </div>
      <div className="p-2.5 border-b border-b-gray">
        <h6 className="text-h6 text-white">{collection.name}</h6>
      </div>
      <div className="p-2.5 flex items-center">
        <h6 className="text-h5 text-white">{collection.floor}</h6>
        <IconEthereum className="text-gray-light" />
      </div>
      <div className="p-2.5 flex items-center text-gray-light gap-1">
        <IconMarketBasket />
        <span className="text-bodySm">Last sale price 0.12 ETH</span>
      </div>
      <div className="absolute w-full transition-all translate-y-full group-hover:-translate-y-full">{!collection.isActive ? <ButtonBuyNow onClick={onSelect} /> : <ButtonMakeOffer />}</div>
    </div>
  );
};

export default React.memo(CollectionItem);
