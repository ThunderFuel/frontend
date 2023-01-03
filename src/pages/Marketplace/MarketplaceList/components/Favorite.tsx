import React, { useState } from "react";
import { IconStar } from "icons";
import clsx from "clsx";

const Favorite = ({ item, className }: { item: any; className?: string }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(item.favorite ?? false);

  return (
    <div className={clsx("cursor-pointer", className)} onClick={() => setIsFavorite((value: boolean) => !value)}>
      <IconStar className={clsx("hover:fill-gray", isFavorite ? "fill-white hover:fill-white" : "text-gray")} />
    </div>
  );
};

export default Favorite;
