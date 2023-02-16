import React from "react";
import MarketplaceList from "pages/Marketplace/MarketplaceList";
import Filter from "../Marketplace/Filter";
import MarketplaceProvider from "../Marketplace/MarketplaceContext";
import { useIsMobile } from "hooks/useIsMobile";
import MobileWarning from "components/MobileWarning";

const Rankings = () => {
  return !useIsMobile() ? (
    <div className="flex flex-col">
      <span className="container-fluid justify-start text-h2 text-white my-10">Collection Stats</span>
      <div className="pb-10">
        <MarketplaceProvider>
          <Filter />
          <MarketplaceList itemCount={20} />
        </MarketplaceProvider>
      </div>
    </div>
  ) : (
    <div className="m-5">
      <MobileWarning />
    </div>
  );
};

export default Rankings;
