import React from "react";
import { AssetCollectionCoverImage } from "assets";
import Img from "components/Img";

const CoverImage = ({ banner, className }: { banner: string; className?: string }) => {
  return (
    <div className={className}>
      <Img className="w-full max-h-[280px]" src={banner} defaultImage={AssetCollectionCoverImage} alt="cover-image" />
    </div>
  );
};

export default CoverImage;
