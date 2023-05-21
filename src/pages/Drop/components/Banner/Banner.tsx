import React from "react";
import Img from "components/Img";

import { useDropDetailContext } from "../../Detail/DetailContext";
import "./Banner.css";

const Banner = () => {
  const { dropDetail } = useDropDetailContext();

  return (
    <div className="banner-container">
      <Img className="banner-image" src={dropDetail.banner} />
    </div>
  );
};

export default Banner;
