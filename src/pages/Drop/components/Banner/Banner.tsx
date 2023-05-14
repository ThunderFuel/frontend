import React from "react";
import Img from "components/Img";

import "./Banner.css";
import { useDropDetailContext } from "../../DropContext";

const Banner = () => {
  const { dropDetail } = useDropDetailContext();

  return (
    <div className="banner-container">
      <Img src={dropDetail.banner} />
      <div className="shadow-banner" />
    </div>
  );
};

export default Banner;
