import React, { useMemo } from "react";
import { IconLoadingGrid } from "icons";

const CollectionGridLoading = () => {
  const collectionItems = useMemo(() => new Array(10).fill(1), []);

  return (
    <>
      {collectionItems.map((i: number, k) => (
        <div className="grid-skeleton" key={`${i}_${k}`}>
          <IconLoadingGrid className="w-full text-gray" />
        </div>
      ))}
    </>
  );
};

export default CollectionGridLoading;
