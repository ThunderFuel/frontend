import React from "react";
import { useIsMobile } from "hooks/useIsMobile";
import marketplace from "api/marketplace/marketplace.service";

import MarketPlaceTable from "./MarketPlaceTable";
import MarketPlaceMobileTable from "./MarketPlaceMobileTable";

export interface MarketplaceListProps {
  itemCount: number;
}

const MarketplaceList = ({ itemCount }: MarketplaceListProps) => {
  const items = marketplace.getMarketplace();

  const slicedItems = items.slice(0, itemCount);

  return useIsMobile() ? <MarketPlaceMobileTable items={slicedItems} /> : <MarketPlaceTable items={slicedItems} />;
};

export default MarketplaceList;
