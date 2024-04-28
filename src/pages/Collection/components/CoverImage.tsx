import React from "react";
import clsx from "clsx";

const CoverImage = ({ banner = "", className }: { banner: string; className?: string }) => {
  return (
    <div
      style={{ backgroundImage: `url(${banner})` }}
      className={clsx("overflow-hidden lg:rounded-md h-[120px] lg:h-[280px] w-full aspect-auto bg-gray", "bg-cover bg-center bg-no-repeat", className)}
    />
  );
};

export default CoverImage;
