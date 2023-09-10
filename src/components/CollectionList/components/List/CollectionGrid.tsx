import React, { useMemo } from "react";
import clsx from "clsx";
import CollectionItem from "./CollectionItem";
import { DisplayType, useCollectionListContext } from "../../CollectionListContext";
import NotFound from "../../../NotFound";

const CollectionGrid = () => {
  const { displayType, collectionItems, options } = useCollectionListContext();

  const displayClass = useMemo(() => {
    if (displayType === DisplayType.GRID5) {
      return "lg:grid-cols-5";
    } else if (displayType === DisplayType.GRID4) {
      return "lg:grid-cols-4";
    }

    return "lg:grid-cols-5";
  }, [displayType]);

  return (
    <>
      {collectionItems.length > 0 && (
        <div className={clsx("grid grid-cols-1 gap-x-2 gap-y-7 pb-20 h-full", displayClass, !options?.hiddenSidebar && "pl-5")}>
          {collectionItems.map((collection: any, i: number) => (
            <CollectionItem key={i} collection={collection} />
          ))}
        </div>
      )}
      {!collectionItems.length && (
        <div className="flex-center h-full">
          <NotFound />
        </div>
      )}
    </>
  );
};

export default CollectionGrid;
