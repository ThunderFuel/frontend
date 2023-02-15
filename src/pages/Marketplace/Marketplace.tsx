import React from "react";
import HotDrops from "./HotDrops";
import MarketplaceList from "./MarketplaceList";
import Filter from "./Filter/index";
import MarketplaceProvider from "./MarketplaceContext";
import { useIsMobile } from "hooks/useIsMobile";
import MobileWarning from "components/MobileWarning";

const Marketplace = () => {
  return !useIsMobile() ? (
    <div className="flex flex-col gap-20 py-16">
      <HotDrops />
      <MarketplaceProvider>
        <Filter />
        <MarketplaceList itemCount={10} />
      </MarketplaceProvider>
    </div>
  ) : (
    <div className="m-5">
      <MobileWarning />
    </div>
  );
};

export default Marketplace;
