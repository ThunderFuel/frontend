import React from "react";
import MarketplaceList from "./MarketplaceList";
import Filter from "./Filter/index";
import MarketplaceProvider from "./MarketplaceContext";
import HotDropsV2 from "./HotDropsV2";

const Marketplace = () => {
  return (
    <div className="flex flex-col gap-10 pb-10">
      {/*<HotDrops />*/}
      <HotDropsV2 />
      <MarketplaceProvider>
        <Filter />
        <MarketplaceList itemCount={10} />
      </MarketplaceProvider>
    </div>
  );
};

export default Marketplace;
