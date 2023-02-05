import React from "react";
import { useIsMobile } from "hooks/useIsMobile";

import MarketPlaceTable from "./MarketPlaceTable";
import MarketPlaceMobileTable from "./MarketPlaceMobileTable";
import { useMarketplace } from "../MarketplaceContext";

export interface MarketplaceListProps {
  itemCount: number;
}

const MarketplaceList = ({ itemCount }: MarketplaceListProps) => {
  const { items } = useMarketplace();

  console.log(items);
  const slicedItems = items.slice(0, itemCount);

  return useIsMobile() ? <MarketPlaceMobileTable items={slicedItems} /> : <MarketPlaceTable items={slicedItems} />;
};

export default MarketplaceList;
