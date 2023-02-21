import React, { useState } from "react";
import { IconStar } from "icons";
import clsx from "clsx";

const Favorite = ({ item, className, onChange }: { item: any; className?: string; onChange: any }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(item.watched ?? false);

  return (
    <div
      className={clsx("cursor-pointer", className)}
      onClick={(e) => {
        const value = !isFavorite;
        setIsFavorite(value);
        onChange(value);
        e.preventDefault();
      }}
    >
      <IconStar className={clsx(isFavorite ? "fill-white text-white" : "text-gray-light hover:fill-gray-light")} />
    </div>
  );
};

export default Favorite;
