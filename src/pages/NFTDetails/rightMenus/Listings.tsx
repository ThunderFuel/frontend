import React from "react";
import RightMenu from "../components/RightMenu";

const Listings = ({ onBack }: { onBack: any }) => {
  return (
    <RightMenu title={"Listings"} onBack={onBack}>
      <div>Listings</div>
    </RightMenu>
  );
};

export default Listings;
