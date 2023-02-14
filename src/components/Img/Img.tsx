import React from "react";
import { AssetTable1Image } from "assets";
import clsx from "clsx";

interface IImage {
  src: string | undefined;
  defaultImage?: string;
  className?: string;

  [key: string]: any;
}

const Img = ({ src, defaultImage = AssetTable1Image, className, ...etc }: IImage, ref: any) => {
  const onError = (e: any) => {
    e.target.src = defaultImage;
  };

  return <img className={clsx("bg-gray", className)} ref={ref} src={src} loading="lazy" {...etc} onError={onError} />;
};

export default React.forwardRef(Img);
