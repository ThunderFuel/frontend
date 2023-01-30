import React from "react";
import { AssetTable1Image } from "assets";

const Img = ({ src, defaultImage = AssetTable1Image, ...etc }: { src: string | undefined; defaultImage?: string; [key: string]: any }) => {
  const onError = (e: any) => {
    e.target.src = defaultImage;
  };

  return <img src={src ?? defaultImage} loading="lazy" {...etc} onError={onError} />;
};

export default Img;
