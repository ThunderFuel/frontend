import React from "react";
import { AssetSettingsProfileImage } from "assets";
import UploadImage from "./UploadImage";

const ProfileImage = ({ src }: any) => {
  const onChange = (e: any) => {
    console.log(e);
  };

  return <UploadImage defaultImage={AssetSettingsProfileImage} className="w-[100px] h-[100px] !rounded-full" src={src} onChange={onChange} />;
};

export default ProfileImage;
