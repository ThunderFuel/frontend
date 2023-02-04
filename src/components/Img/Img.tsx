import React from "react";
import { AssetTable1Image } from "assets";

interface IImage {
  src: string | undefined;
  defaultImage?: string;

  [key: string]: any;
}

const Img = ({ src, defaultImage = AssetTable1Image, ...etc }: IImage, ref: any) => {
  const onError = (e: any) => {
    e.target.src = defaultImage;
  };

  return <img ref={ref} src={src ?? defaultImage} loading="lazy" {...etc} onError={onError} />;
};

export default React.forwardRef(Img);
