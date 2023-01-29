import React, { useMemo } from "react";
import clsx from "clsx";
import { DisplayType, useCollectionListContext } from "../../CollectionListContext";
import { AssetLoadingGrid } from "../../../../assets";

const CollectionGridLoading = () => {
  const { displayType } = useCollectionListContext();
  const collectionItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
      {collectionItems.map((i: number) => (
        <div className="grid-skeleton" key={i}>
          <img className="w-full" src={AssetLoadingGrid} />
        </div>
      ))}
    </div>
  );
};

export default CollectionGridLoading;
