import Img from "components/Img/Img";
import { AssetProfileBg } from "assets";
import React from "react";

const CoverImage = () => {
  return (
    <div className="profile-cover-image">
      <Img src={AssetProfileBg} className="w-full" />
    </div>
  );
};

export default CoverImage;
