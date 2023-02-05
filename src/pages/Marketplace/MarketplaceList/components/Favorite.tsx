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
        e.stopPropagation();
      }}
    >
      <IconStar className={clsx("hover:fill-gray", isFavorite ? "fill-white hover:fill-white" : "text-gray")} />
    </div>
  );
};

export default Favorite;
