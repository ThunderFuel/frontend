import React from "react";
import MarketplaceList from "pages/Marketplace/MarketplaceList";
import Filter from "../Marketplace/Filter";
import MarketplaceProvider from "../Marketplace/MarketplaceContext";

const Rankings = () => {
  return (
    <div className="flex flex-col">
      <span className="container-fluid justify-start text-h2 text-white my-10">Collection Stats</span>
      <div className="pb-10">
        <MarketplaceProvider>
          <Filter />
          <MarketplaceList itemCount={20} />
        </MarketplaceProvider>
      </div>
    </div>
  );
};

export default Rankings;
