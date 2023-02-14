import React from "react";
import {
  AssetProfileAvatar1,
  AssetProfileAvatar10,
  AssetProfileAvatar2,
  AssetProfileAvatar3,
  AssetProfileAvatar4,
  AssetProfileAvatar5,
  AssetProfileAvatar6,
  AssetProfileAvatar7,
  AssetProfileAvatar8,
  AssetProfileAvatar9,
} from "assets";
import Img from "components/Img";
import clsx from "clsx";

const avatars = [
  AssetProfileAvatar1,
  AssetProfileAvatar2,
  AssetProfileAvatar3,
  AssetProfileAvatar4,
  AssetProfileAvatar5,
  AssetProfileAvatar6,
  AssetProfileAvatar7,
  AssetProfileAvatar8,
  AssetProfileAvatar9,
  AssetProfileAvatar10,
];

export const getDefaultAvatarSrc = (userId: any) => {
  return avatars[userId % avatars.length];
};

const Avatar = ({ image, className, userId }: { image: string | null; className?: string; userId: number }) => {
  return (
    <div className={clsx("rounded-full overflow-hidden", className)}>
      <Img className="w-full" src={image} defaultImage={getDefaultAvatarSrc(userId)} />
    </div>
  );
};

export default Avatar;
