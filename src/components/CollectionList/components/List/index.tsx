import React from "react";
import CollectionGrid from "./CollectionGrid";
import CollectionTable from "./CollectionTable";
import CollectionFooter from "./CollectionFooter";
import clsx from "clsx";
import { useCollectionListContext } from "../../CollectionListContext";
import SelectedFilter from "../SelectedFilter";

const Index = () => {
  const { isDisplayTypeList, collectionItems } = useCollectionListContext();

  return (
    <div className={clsx("flex flex-col flex-1 pt-5 gap-5", isDisplayTypeList && "-mr-10")}>
      <div className="text-headline-02 text-gray-light pl-5">{collectionItems.length} ITEMS</div>
      <SelectedFilter />

      {isDisplayTypeList ? <CollectionTable /> : <CollectionGrid />}

      <CollectionFooter />
    </div>
  );
};

export default Index;
