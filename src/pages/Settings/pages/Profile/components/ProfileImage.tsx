import React from "react";
import { AssetSettingsProfileImage } from "assets";
import UploadImage from "./UploadImage";

const ProfileImage = ({ src, onChange }: any) => {
  return <UploadImage defaultImage={AssetSettingsProfileImage} className="w-[100px] h-[100px] !rounded-full" src={src} onChange={onChange} />;
};

export default ProfileImage;
