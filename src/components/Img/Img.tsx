import React, { forwardRef } from "react";
import { AssetDefaultImageBg } from "assets"; // Make sure this import is correct and points to the right file
import clsx from "clsx";

interface IImage {
  src?: string; // Make src optional since you handle undefined cases
  defaultImage?: string;
  className?: string;
  [key: string]: any; // Allow any other props
}

// Define the ForwardRefRenderFunction type
const Img: React.ForwardRefRenderFunction<HTMLImageElement, IImage> = ({ src, defaultImage = AssetDefaultImageBg, className, ...etc }, ref) => {
  const onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage;
  };

  return <img className={clsx("bg-gray", className)} ref={ref} src={src ?? defaultImage} loading="lazy" {...etc} onError={onError} />;
};

// Use React.forwardRef with the Img component
export default forwardRef(Img);
