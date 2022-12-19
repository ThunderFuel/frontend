import React from "react";
import { useIsMobile } from "hooks/useIsMobile";

import MarketPlaceTable from "./MarketPlaceTable";
import marketplace from "api/marketplace";

export interface MarketplaceListProps {
  itemCount: number;
}

const MarketplaceList = ({ itemCount }: MarketplaceListProps) => {
  const items = marketplace.getMarketplace();

  const slicedItems = items.slice(0, itemCount);

  return useIsMobile() ? <MarketPlaceTable items={slicedItems} /> : <MarketPlaceTable items={slicedItems} />;
};

export default MarketplaceList;
