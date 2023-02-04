import React from "react";
import { AssetCollectionCoverImage } from "assets";
import Img from "components/Img";
import clsx from "clsx";

const CoverImage = ({ banner, className }: { banner: string; className?: string }) => {
  return (
    <div className={clsx("overflow-hidden rounded-md max-h-[280px] aspect-auto bg-gray", className)}>
      <Img className="w-full" src={banner} defaultImage={AssetCollectionCoverImage} alt="cover-image" />
    </div>
  );
};

export default CoverImage;
