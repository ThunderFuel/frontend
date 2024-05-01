import React from "react";
import MarketplaceList from "pages/Marketplace/MarketplaceList";
import Filter from "../Marketplace/Filter";
import MarketplaceProvider from "../Marketplace/MarketplaceContext";

const Rankings = () => {
  const options = {
    hideFooter: true,
  };

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - var(--headerHeight) - var(--footerHeight))" }}>
      <span className="container-fluid justify-start text-h2 text-white my-10">Collection Stats</span>
      <div className="pb-20 lg:pb-16">
        <MarketplaceProvider options={options}>
          <Filter />
          <MarketplaceList />
        </MarketplaceProvider>
      </div>
    </div>
  );
};

export default Rankings;
