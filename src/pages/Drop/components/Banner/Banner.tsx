import React from "react";
import { AssetDropTest } from "assets";
import Img from "components/Img";

import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <Img src={AssetDropTest.DropPrimary.Banner} />
      <div className="shadow-banner" />
    </div>
  );
};

export default Banner;
