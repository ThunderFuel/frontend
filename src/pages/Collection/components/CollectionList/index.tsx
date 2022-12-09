import React, { useMemo } from "react";
import clsx from "clsx";
import { DisplayType, useCollectionContext } from "../../CollectionContext";
import CollectionItem from "./CollectionItem";

const Index = () => {
  const { displayType } = useCollectionContext();
  const collections = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4];

  const isDisplayTypeList = useMemo(() => {
    return displayType === DisplayType.LIST;
  }, [displayType]);
  console.log(isDisplayTypeList);

  const displayClass = useMemo(() => {
    if (displayType === DisplayType.GRID4) {
      return "lg:grid-cols-4";
    } else if (displayType === DisplayType.GRID3) {
      return "lg:grid-cols-3";
    }

    return "lg:grid-cols-5";
  }, [displayType]);

  return (
    <div className="flex flex-col flex-1 pl-5 py-5 gap-5">
      <div className="text-headline-02 text-gray-light">{collections.length} ITEMS</div>
      {isDisplayTypeList ? (
        <div>List</div>
      ) : (
        <div className={clsx("grid grid-cols-1 gap-x-2 gap-y-7", displayClass)}>
          {collections.map((collection) => (
            <CollectionItem key={collection} collection={{ image: collection, name: "22", floor: "11" }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
