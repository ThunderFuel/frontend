import React from "react";
import HotDrops from "./HotDrops";
import MarketplaceList from "./MarketplaceList";
import Filter from "./Filter";

const Marketplace = () => {
  return (
    <div className="flex flex-col gap-20 py-16">
      <HotDrops />
      <div>
        <Filter />
        <MarketplaceList itemCount={5} />
      </div>
    </div>
  );
};

export default Marketplace;
