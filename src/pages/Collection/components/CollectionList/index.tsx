import React, { useEffect, useMemo } from "react";
import { DisplayType, useCollectionContext } from "../../CollectionContext";
import CollectionGrid from "./CollectionGrid";
import CollectionTable from "./CollectionTable";
import CollectionFooter from "./CollectionFooter";

const Index = () => {
  const { displayType, getCollections } = useCollectionContext();

  useEffect(() => {
    getCollections();
  }, []);

  const isDisplayTypeList = useMemo(() => {
    return displayType === DisplayType.LIST;
  }, [displayType]);

  return (
    <div className="flex flex-col flex-1 pt-5 gap-5">
      <div className="text-headline-02 text-gray-light pl-5">{getCollections.length} ITEMS</div>
      {isDisplayTypeList ? <CollectionTable /> : <CollectionGrid />}

      <CollectionFooter />
    </div>
  );
};

export default Index;
