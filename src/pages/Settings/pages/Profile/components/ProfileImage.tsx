import React from "react";
import UploadImage from "./UploadImage";
import { getDefaultAvatarSrc } from "components/Avatar/Avatar";

const ProfileImage = ({ src, onChange }: any) => {
  const defaultAvatarSrc = getDefaultAvatarSrc(0);

  return <UploadImage defaultImage={defaultAvatarSrc} className="w-[100px] h-[100px] !rounded-full" src={src} onChange={onChange} />;
};

export default ProfileImage;
