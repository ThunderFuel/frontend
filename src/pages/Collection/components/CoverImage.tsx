import React from "react";
import { AssetCollectionCoverImage } from "assets";

const CoverImage = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <img src={AssetCollectionCoverImage} alt="cover-image" />
    </div>
  );
};

export default CoverImage;
