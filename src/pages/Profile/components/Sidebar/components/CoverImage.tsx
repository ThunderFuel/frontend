import React from "react";
import Img from "components/Img/Img";
import { AssetProfileBg } from "assets";

const CoverImage = ({ src }: any) => {
  return (
    <div className="profile-cover-image">
      <Img src={src} defaultImage={AssetProfileBg} className="w-full" />
    </div>
  );
};

export default CoverImage;
