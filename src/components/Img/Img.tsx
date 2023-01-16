import React, { useState } from "react";
import { AssetTable1Image } from "assets";

const Img = ({ src, defaultImage = AssetTable1Image, ...etc }: { src: string; defaultImage?: string; [key: string]: any }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const image = new Image();
  image.src = src;
  image.onerror = () => {
    setImageSrc(defaultImage);
  };

  return <img src={imageSrc} loading="lazy" {...etc} />;
};

export default Img;
