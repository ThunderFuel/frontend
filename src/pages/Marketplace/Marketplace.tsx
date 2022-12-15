import React from "react";
import HotDrops from "./HotDrops";
import MarketplaceList from "./MarketplaceList";

const Marketplace = () => {
  return (
    <div className="flex flex-col gap-20 py-16">
      <HotDrops />
      <MarketplaceList itemCount={5} />
    </div>
  );
};

export default Marketplace;
