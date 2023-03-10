import React from "react";
import { IconHand, IconMarketBasket, IconThunderSmall } from "icons";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "store";
import { add as cartAdd, addBuyNow, remove as cartRemove, toggleCartModal } from "store/cartSlice";
import { add as bulkListingAdd, remove as bulkListingRemove } from "store/bulkListingSlice";

import "./CollectionItem.css";
import { CollectionItemResponse } from "api/collections/collections.type";
import { PATHS } from "router/config/paths";
import { useCollectionListContext } from "../../CollectionListContext";
import Img from "components/Img";
import { Link } from "react-router-dom";
import EthereumPrice from "components/EthereumPrice";
import useNavigate, { getAbsolutePath } from "hooks/useNavigate";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { toggleWalletModal } from "store/walletSlice";
import { setIsInsufficientBalance, toggleCheckoutModal } from "store/checkoutSlice";
import { useWallet } from "hooks/useWallet";

const ButtonBuyNow = React.memo(({ className, onClick }: any) => {
  return (
    <button className={clsx("button-buy-now", className)} onClick={onClick}>
      <span className="uppercase">buy now</span>
      <IconThunderSmall className="w-7 h-7" />
    </button>
  );
});
ButtonBuyNow.displayName = "ButtonBuyNow";

const ButtonMakeOffer = React.memo(({ className, onClick }: any) => {
  return (
    <button className={clsx("button-make-offer", className)} onClick={onClick}>
      <span className="uppercase">make offer</span>
      <IconHand className="fill-white" />
    </button>
  );
});
ButtonMakeOffer.displayName = "ButtonMakeOffer";
const CollectionItemCheckbox = (props: any) => {
  return (
    <label className="collection-item-checkbox" onClick={props.onClick}>
      <button className={clsx("hidden absolute -z-50", props.checked ? "checked" : "")} />
      <span></span>
    </label>
  );
};
const CollectionItem = ({ collection }: { collection: CollectionItemResponse }) => {
  const { user } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setSweep, options } = useCollectionListContext();
  const { isConnected } = useAppSelector((state) => state.wallet);
  const { hasEnoughFunds } = useWallet();
  const isOwnCollectionItem = collection?.userId === user.id;

  const onToggleCart = () => {
    if (!collection.isSelected) {
      dispatch(cartAdd(collection));
    } else {
      dispatch(cartRemove(collection.uid));
    }
  };
  const onToggleBulkListing = () => {
    if (!collection.isSelected) {
      dispatch(bulkListingAdd(collection));
    } else {
      dispatch(bulkListingRemove(collection.uid));
    }
  };
  const onSelect = (e: any) => {
    setSweep(0);

    if (options?.isProfile) {
      onToggleBulkListing();
    } else {
      onToggleCart();
    }

    e.stopPropagation();
    e.preventDefault();
  };

  const onBuyNow = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isConnected) {
      dispatch(toggleCartModal());
      dispatch(toggleWalletModal());
    } else {
      dispatch(addBuyNow(collection));

      try {
        const res = await hasEnoughFunds();
        dispatch(setIsInsufficientBalance(!res));
        dispatch(toggleCheckoutModal());
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onMakeOffer = (e: any) => {
    if (!isConnected) {
      dispatch(toggleCartModal());
      dispatch(toggleWalletModal());
    } else {
      dispatch(setRightMenu(RightMenuType.MakeOffer));
      navigate(PATHS.NFT_DETAILS, { nftId: collection.id });
    }
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div>
      <Link
        to={getAbsolutePath(PATHS.NFT_DETAILS, { nftId: collection.id })}
        className={clsx("group block relative overflow-hidden border rounded-md hover:bg-bg-light", collection.isSelected ? "border-white" : "border-gray")}
      >
        <div className="overflow-hidden relative">
          {options?.isProfile || (!isOwnCollectionItem && collection.salable) ? collection.onAuction ? null : <CollectionItemCheckbox checked={collection.isSelected} onClick={onSelect} /> : null}
          <div className="w-full h-0 pb-[100%] relative bg-gray">
            {collection.image !== null && <Img alt={collection.image} className="absolute w-full object-contain h-full transition-all duration-300 group-hover:scale-[110%]" src={collection.image} />}
          </div>
        </div>
        <div className="p-2.5 border-b border-b-gray">
          {options?.isProfile ? <div className="body-medium text-gray-light mb-1 text-overflow">{collection?.collectionName ?? "-"}</div> : null}

          <h6 className="text-h6 text-white text-overflow">{collection.name ?? "-"}</h6>
        </div>
        <div className="p-2.5 flex items-center">
          {collection.salable ? <EthereumPrice className="text-white" price={collection.price ?? "-"} /> : <div className="flex-center h-7 text-headline-01 text-gray-light uppercase">not lısted</div>}
        </div>
        <div className={clsx("p-2.5 flex items-center text-gray-light gap-1", !collection.lastSalePrice && "invisible")}>
          <IconMarketBasket />
          <span className="body-small text-overflow">Last sale price {collection.lastSalePrice ?? 0} ETH</span>
        </div>
        {!options?.isProfile ? (
          <div className="absolute w-full transition-all translate-y-full group-hover:-translate-y-full">
            {collection.salable ? !isOwnCollectionItem ? <ButtonBuyNow onClick={onBuyNow} /> : null : <ButtonMakeOffer onClick={onMakeOffer} />}
          </div>
        ) : null}
      </Link>
    </div>
  );
};

export default CollectionItem;
