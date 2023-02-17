import React from "react";
import { AssetSettingsCoverImage } from "assets";
import UploadImage from "./UploadImage";

const CoverImage = ({ src = AssetSettingsCoverImage }: any) => {
  const onChange = (e: any) => {
    console.log(e);
  };

  return <UploadImage defaultImage={AssetSettingsCoverImage} src={src ?? AssetSettingsCoverImage} onChange={onChange} />;
};

export default CoverImage;
