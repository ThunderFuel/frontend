import React from "react";
import { useIsMobile } from "hooks/useIsMobile";

import MarketPlaceTable from "./MarketPlaceTable";
import MarketPlaceMobileTable from "./MarketPlaceMobileTable";
import { MOBILE_LIST_TYPE, useMarketplace } from "../MarketplaceContext";

export interface MarketplaceListProps {
  itemCount?: number;
}

const MarketplaceList = ({ itemCount }: MarketplaceListProps) => {
  const { items, mobileListType } = useMarketplace();
  let slicedItems = items;
  if (itemCount) {
    slicedItems = items.slice(0, itemCount);
  }
  if (!useIsMobile()) {
    return <MarketPlaceTable items={slicedItems} />;
  }

  return mobileListType === MOBILE_LIST_TYPE.GRID ? <MarketPlaceMobileTable items={slicedItems} /> : <MarketPlaceTable items={slicedItems} />;
};

export default MarketplaceList;
