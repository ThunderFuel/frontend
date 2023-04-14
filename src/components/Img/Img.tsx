import React from "react";
import { AssetDefaultImageBg } from "assets";
import clsx from "clsx";

interface IImage {
  src: string | undefined;
  defaultImage?: string;
  className?: string;

  [key: string]: any;
}

const Img = ({ src, defaultImage = AssetDefaultImageBg, className, ...etc }: IImage, ref: any) => {
  const onError = (e: any) => {
    e.target.src = defaultImage;
  };

  return <img className={clsx("bg-gray", className)} ref={ref} src={src ?? defaultImage} loading="lazy" {...etc} onError={onError} />;
};

export default React.forwardRef(Img);
