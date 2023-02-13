import React from "react";
import SidebarFilter from "./components/SidebarFilter";
import OfferList from "./components/OfferList";
import OfferProvider from "./OfferContext";
import { useProfile } from "../../ProfileContext";

const Offer = () => {
  const { userInfo } = useProfile();

  return (
    <OfferProvider value={{ userInfo, offers: [] }}>
      <div className="flex w-full h-full px-5">
        <SidebarFilter />
        <OfferList />
      </div>
    </OfferProvider>
  );
};

export default Offer;
