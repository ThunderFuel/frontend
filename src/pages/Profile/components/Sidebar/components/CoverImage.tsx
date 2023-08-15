import React from "react";
import { AssetDefaultImageBg } from "assets";

const CoverImage = ({ src }: any) => {
  return <div className="profile-cover-image" style={{ backgroundImage: `url(${src ?? AssetDefaultImageBg})` }} />;
};

export default CoverImage;
