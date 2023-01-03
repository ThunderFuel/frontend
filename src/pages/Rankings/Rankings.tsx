import React from "react";
import MarketplaceList from "pages/Marketplace/MarketplaceList";

const Rankings = () => {
  return (
    <div className="flex flex-col">
      <span className="container-fluid justify-start text-h2 text-white my-10">Collection Stats</span>
      <MarketplaceList itemCount={10} />
    </div>
  );
};

export default Rankings;
