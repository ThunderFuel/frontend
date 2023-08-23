import React from "react";
import SidebarFilter from "./components/SidebarFilter";
import OfferList from "./components/OfferList";
import OfferProvider from "./OfferContext";

const Offer = (props: any) => {
  return (
    <OfferProvider value={props}>
      <div className="flex w-full h-full px-5">
        {!props.option?.hideSidebar && <SidebarFilter />}
        <OfferList />
      </div>
    </OfferProvider>
  );
};

export default Offer;
