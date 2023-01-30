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
import { randomIntFromInterval } from "utils";
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
const Avatar = ({ image, className }: { image: string; className?: string }) => {
  return (
    <div className={clsx("rounded-full overflow-hidden", className)}>
      <Img className="w-full" src={image ?? avatars[randomIntFromInterval(0, avatars.length)]} />
    </div>
  );
};

export default Avatar;
