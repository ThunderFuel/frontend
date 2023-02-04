import React from "react";
import { AssetSettingsCoverImage } from "assets";
import UploadImage from "./UploadImage";

const CoverImage = () => {
  const onChange = (e: any) => {
    console.log(e);
  };

  return <UploadImage src={AssetSettingsCoverImage} onChange={onChange} />;
};

export default CoverImage;
