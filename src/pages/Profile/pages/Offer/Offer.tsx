import React from "react";
import SidebarFilter from "./components/SidebarFilter";
import OfferList from "./components/OfferList";
import { useOutletContext } from "react-router-dom";
import OfferProvider from "./OfferContext";

const Offer = () => {
  const [userInfo]: any = useOutletContext();

  return (
    <OfferProvider value={{ userInfo, offers: [] }}>
      <div className="flex w-full h-full">
        <SidebarFilter />
        <OfferList />
      </div>
    </OfferProvider>
  );
};

export default Offer;
