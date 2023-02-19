import React from "react";
import Img from "components/Img/Img";
import { AssetDefaultImageBg } from "assets";

const CoverImage = ({ src }: any) => {
  return (
    <div className="profile-cover-image">
      <Img src={src} defaultImage={AssetDefaultImageBg} className="w-full" />
    </div>
  );
};

export default CoverImage;
