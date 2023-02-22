import React, { useState } from "react";
import { IconStar } from "icons";
import clsx from "clsx";
import { useAppSelector } from "store";
import { WatchListRequest } from "api/collections/collections.type";

const Favorite = ({ item, className, onChange }: { item: any; className?: string; onChange: any }) => {
  const { user } = useAppSelector((state) => state.wallet);
  const [isFavorite, setIsFavorite] = useState<boolean>(item.watched ?? false);

  return (
    <div
      className={clsx("cursor-pointer", className)}
      onClick={(e) => {
        e.preventDefault();

        if (!user?.id) {
          return false;
        }

        const watch = !isFavorite;
        setIsFavorite(watch);
        onChange({
          userId: user.id,
          collectionId: item.id,
          watch,
        } as WatchListRequest);
      }}
    >
      <IconStar className={clsx(isFavorite ? "fill-white text-white" : "text-gray-light hover:fill-gray-light")} />
    </div>
  );
};

export default Favorite;
