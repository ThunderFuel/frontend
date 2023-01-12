import React, { useEffect } from "react";
import { useItemContext } from "../../ItemContext";
import CollectionGrid from "./CollectionGrid";
import CollectionTable from "./CollectionTable";
import CollectionFooter from "./CollectionFooter";
import clsx from "clsx";

const Index = () => {
  const { isDisplayTypeList, collectionItems, fetchCollections } = useItemContext();

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className={clsx("flex flex-col flex-1 pt-5 gap-5", isDisplayTypeList && "-mr-10")}>
      <div className="text-headline-02 text-gray-light pl-5">{collectionItems.length} ITEMS</div>
      {isDisplayTypeList ? <CollectionTable /> : <CollectionGrid />}

      <CollectionFooter />
    </div>
  );
};

export default Index;
