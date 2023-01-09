import React from "react";
import { AssetCollectionCoverImage } from "assets";

const CoverImage = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <img className="w-full max-h-[280px]" src={AssetCollectionCoverImage} alt="cover-image" />
    </div>
  );
};

export default CoverImage;
