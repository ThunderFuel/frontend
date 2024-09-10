import React from "react";
import { IconAuction, IconBid, IconHand, IconHashtag, IconMarketBasket, IconThunderSmall } from "icons";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "store";
import { add as cartAdd, addBuyNowItem, remove as cartRemove, toggleCartModal } from "store/cartSlice";
import { add as bulkListingAdd, remove as bulkListingRemove } from "store/bulkListingSlice";

import "./CollectionItem.css";
import { CollectionItemResponse } from "api/collections/collections.type";
import { PATHS } from "router/config/paths";
import { useCollectionListContext } from "../../CollectionListContext";
import { Link } from "react-router-dom";
import EthereumPrice from "components/EthereumPrice";
import useNavigate, { getAbsolutePath } from "hooks/useNavigate";
import { RightMenuType, setRightMenu, setSelectedNFT } from "store/NFTDetailsSlice";
import { toggleWalletModal } from "store/walletSlice";
import { CheckoutType, setCheckout, setIsInsufficientBalance, toggleCheckoutModal } from "store/checkoutSlice";
import { useWallet } from "hooks/useWallet";
import { remainingTime } from "pages/NFTDetails/components/AuctionCountdown";
import { formatPrice } from "utils";
import LazyImg from "../../../LazyImg";
import NoContent from "../../../NoContent";
import config from "../../../../config";
import Tooltip from "../../../Tooltip";

const ButtonBuyNow = React.memo(({ className, onClick }: any) => {
  return (
    <button className={clsx("button-buy-now w-full", className)} onClick={onClick}>
      <span className="uppercase">buy now</span>
      <IconThunderSmall className="w-7 h-7" />
    </button>
  );
});
ButtonBuyNow.displayName = "ButtonBuyNow";

const ButtonIconMakeOffer = React.memo(({ className, onClick }: any) => {
  return (
    <Tooltip position="top" content="Make Offer" appendToBody={true} hiddenArrow={true}>
      <button className={clsx("button-make-offer-icon", className)} onClick={onClick}>
        <IconHand className="fill-white" />
      </button>
    </Tooltip>
  );
});
ButtonIconMakeOffer.displayName = "ButtonIconMakeOffer";

const ButtonMakeOffer = React.memo(({ className, onClick }: any) => {
  return (
    <button className={clsx("button-make-offer", className)} onClick={onClick}>
      <span className="uppercase">make offer</span>
      <IconHand className="fill-white" />
    </button>
  );
});
ButtonMakeOffer.displayName = "ButtonMakeOffer";

const ButtonPlaceBid = React.memo(({ className, onClick }: any) => {
  return (
    <button className={clsx("button-buy-now", className)} onClick={onClick}>
      <span className="uppercase">place a bid</span>
      <IconBid />
    </button>
  );
});
ButtonPlaceBid.displayName = "ButtonPlaceaBid";

const HighestBid = React.memo(({ highestBid }: any) => {
  return (
    <div className="flex w-full justify-between items-center">
      <span className="uppercase text-headline-01 text-gray-light">highest bid</span>
      <EthereumPrice className="text-white" price={highestBid ?? "-"} />
    </div>
  );
});
HighestBid.displayName = "HighestBid";

const StartingPrice = React.memo(({ startingPrice }: any) => {
  return (
    <div className="flex w-full justify-between items-center gap-1">
      <span className="uppercase text-headline-01 text-gray-light">starting price</span>
      <EthereumPrice className="text-white" price={startingPrice ?? 0} />
    </div>
  );
});
StartingPrice.displayName = "StartingPrice";

const CollectionItemCheckbox = (props: any) => {
  return (
    <label className="collection-item-checkbox" onClick={props.onClick}>
      <button className={clsx("hidden absolute -z-50", props.checked ? "checked" : "")} />
      <span></span>
    </label>
  );
};
const CollectionTop = React.memo(({ top }: any) => {
  let colorClassName = "text-gray";
  if (top <= 1) {
    colorClassName = "text-green";
  } else if (top > 1 && top <= 10) {
    colorClassName = "text-orange";
  } else if (top > 10 && top <= 50) {
    colorClassName = "text-white";
  } else {
    colorClassName = "text-gray";
  }

  return (
    <div className={clsx("flex gap-1 items-center", colorClassName)}>
      <div className="w-7 h-7 rounded-full flex-center bg-gray">
        <IconHashtag />
      </div>
      <div className="headline-md">{top}</div>
    </div>
  );
});
CollectionTop.displayName = "CollectionTop";

const CollectionImage = ({ image }: any) => {
  if (!image) {
    return <NoContent className="absolute" />;
  }

  return <LazyImg alt={image} className="absolute w-full object-contain h-full transition-all duration-300 group-hover:scale-[110%]" src={image} />;
};

const CollectionItem = ({ collection, selectionDisabled }: { collection: CollectionItemResponse; selectionDisabled?: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setSweep, options } = useCollectionListContext();
  const { isConnected, user } = useAppSelector((state) => state.wallet);
  const { hasEnoughFunds } = useWallet();
  const { days, hours, minutes } = remainingTime(collection.onAuctionExpireTime);

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
      dispatch(addBuyNowItem(collection));
      try {
        hasEnoughFunds(collection.price).then((res) => {
          dispatch(setIsInsufficientBalance(!res));
          dispatch(toggleCheckoutModal());
        });
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
      dispatch(setSelectedNFT(collection));
      dispatch(
        setCheckout({
          type: CheckoutType.MakeOffer,
          // currentItemId: collection.id,
        })
      );
      dispatch(toggleCheckoutModal());
      // navigate(PATHS.NFT_DETAILS, { nftId: collection.id });
    }
    e.stopPropagation();
    e.preventDefault();
  };

  const onPlaceBid = (e: any) => {
    if (!isConnected) {
      dispatch(toggleCartModal());
      dispatch(toggleWalletModal());
    } else {
      dispatch(setRightMenu(RightMenuType.PlaceBid));
      navigate(PATHS.NFT_DETAILS, { nftId: collection.id });
    }
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className={clsx(selectionDisabled ? "collection-item-create-page" : "")}>
      <Link
        to={getAbsolutePath(PATHS.NFT_DETAILS, { nftId: collection.id })}
        className={clsx("group block relative overflow-hidden border rounded-md hover:bg-bg-light", collection.isSelected ? "border-white" : "border-gray")}
      >
        <div className="overflow-hidden relative">
          {options?.isProfile || (!isOwnCollectionItem && collection.salable) ? (
            collection.onAuction ? null : !selectionDisabled ? (
              config.getConfig("type") === "wagmi" && collection.price !== null ? null : (
                <CollectionItemCheckbox checked={collection.isSelected} onClick={onSelect} />
              )
            ) : null
          ) : null}
          <div className="w-full h-0 pb-[100%] relative bg-gray">
            <CollectionImage image={collection.image} />
          </div>
        </div>
        <div className="p-2.5 border-b border-b-gray">
          {options?.isProfile ? <div className="body-medium text-gray-light mb-1 text-overflow">{collection?.collectionName ?? "-"}</div> : null}

          <h6 className="text-h6 text-white text-overflow">{collection.name ?? collection.tokenOrder}</h6>
        </div>
        <div className="p-2.5 flex items-center">
          {collection.salable ? (
            <div className="flex w-full justify-between">
              <EthereumPrice className="text-white" price={collection.price ?? "-"} />
              {config.getConfig("type") === "fuel" ? <></> : <CollectionTop top={1} />}
            </div>
          ) : collection.onAuction ? (
            collection.highestBidPrice ? (
              <HighestBid highestBid={collection.highestBidPrice} />
            ) : (
              <StartingPrice startingPrice={collection.startingPrice} />
            )
          ) : (
            <div className="flex-center h-7 text-headline-01 text-gray-light uppercase">not lısted</div>
          )}
        </div>
        {collection.onAuction ? (
          <div className="flex-center body-small text-gray-light gap-1 p-2.5">
            <IconAuction />
            Auction ends in {days}:{hours}:{minutes}
          </div>
        ) : (
          <div className={clsx("p-2.5 flex items-center text-gray-light gap-1", !collection.lastSalePrice && "invisible")}>
            <IconMarketBasket />
            <span className="body-small text-overflow">Last sale price {formatPrice(collection.lastSalePrice) ?? 0} ETH</span>
          </div>
        )}
        {!selectionDisabled && !options?.isProfile ? (
          <div className="absolute w-full transition-all translate-y-full group-hover:-translate-y-full">
            {!isOwnCollectionItem ? (
              collection.salable ? (
                <div className="flex border-t border-gray">
                  <ButtonBuyNow onClick={onBuyNow} />
                  <ButtonIconMakeOffer onClick={onMakeOffer} />
                </div>
              ) : collection.onAuction ? (
                <ButtonPlaceBid onClick={onPlaceBid} />
              ) : (
                <ButtonMakeOffer onClick={onMakeOffer} />
              )
            ) : null}
          </div>
        ) : null}
      </Link>
    </div>
  );
};

export default CollectionItem;
