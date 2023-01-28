import React, { useMemo } from "react";
import clsx from "clsx";
import CollectionItem from "./CollectionItem";
import { DisplayType, useCollectionListContext } from "../../CollectionListContext";

const CollectionGrid = () => {
  const { displayType, collectionItems } = useCollectionListContext();

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
      {collectionItems.map((collection: any, i: number) => (
        <CollectionItem key={i} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionGrid;
