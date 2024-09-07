import React, { forwardRef } from "react";
import { AssetDefaultImageBg } from "assets";
import clsx from "clsx";

interface IImage {
  src: string | undefined;
  defaultImage?: string;
  className?: string;
  [key: string]: any;
}

// Define the ForwardRefRenderFunction type
const Img: React.ForwardRefRenderFunction<HTMLImageElement, IImage> = ({ src, defaultImage = AssetDefaultImageBg, className, ...etc }, ref) => {
  const onError = (e: any) => {
    e.target.src = defaultImage;
  };

  return <img className={clsx("bg-gray", className)} ref={ref} src={src ?? defaultImage} loading="lazy" {...etc} onError={onError} />;
};

// Use React.forwardRef with the Img component
export default forwardRef(Img);
