import React from "react";
import HotDrops from "./HotDrops";
import MarketplaceList from "./MarketplaceList";
import Filter from "./Filter/index";
import MarketplaceProvider from "./MarketplaceContext";

const Marketplace = () => {
  return (
    <div className="flex flex-col gap-20 py-16">
      <HotDrops />
      <MarketplaceProvider>
        <Filter />
        <MarketplaceList itemCount={20} />
      </MarketplaceProvider>
    </div>
  );
};

export default Marketplace;
