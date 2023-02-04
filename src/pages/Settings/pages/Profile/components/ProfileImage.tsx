import React from "react";
import { AssetSettingsProfileImage } from "assets";
import UploadImage from "./UploadImage";

const ProfileImage = () => {
  const onChange = (e: any) => {
    console.log(e);
  };

  return <UploadImage className="w-[100px] h-[100px] !rounded-full" src={AssetSettingsProfileImage} onChange={onChange} />;
};

export default ProfileImage;
