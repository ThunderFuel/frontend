import React, { useMemo } from "react";
import clsx from "clsx";
import { DisplayType, useCollectionListContext } from "../../CollectionListContext";
import { AssetLoadingGrid } from "assets";

const CollectionGridLoading = ({ page }: { page?: number }) => {
  const { displayType } = useCollectionListContext();
  const collectionItems = new Array(20 * (page ?? 1)).fill(1);
  // const collectionItems = new Array(20).fill(1);

  const displayClass = useMemo(() => {
    if (displayType === DisplayType.GRID4) {
      return "lg:grid-cols-4";
    } else if (displayType === DisplayType.GRID3) {
      return "lg:grid-cols-3";
    }

    return "lg:grid-cols-5";
  }, [displayType]);

  return (
    <div className={clsx("grid grid-cols-1 gap-x-2 gap-y-7 pl-5 pb-20", displayClass)}>
      {collectionItems.map((i: number, k) => (
        <div className="grid-skeleton" key={`${i}_${k}`}>
          <img alt="grid-skeleton-image" className="w-full" src={AssetLoadingGrid} />
        </div>
      ))}
    </div>
  );
};

export default CollectionGridLoading;
