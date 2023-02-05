import React from "react";
import CollectionGrid from "./CollectionGrid";
import CollectionTable from "./CollectionTable";
import CollectionFooter from "./CollectionFooter";
import clsx from "clsx";
import { useCollectionListContext } from "../../CollectionListContext";
import SelectedFilter from "../SelectedFilter";
import CollectionGridLoading from "./CollectionGridLoading";

const Index = () => {
  const { isDisplayTypeList, pagination, isLoading, collectionItems, options } = useCollectionListContext();

  return (
    <div className={clsx("flex flex-col flex-1 pt-5 gap-5", isDisplayTypeList && "-mr-10")}>
      <div className={clsx("text-headline-02 text-gray-light", !options.hiddenSidebar && "pl-5")}>{pagination?.itemsCount ?? collectionItems.length} ITEMS</div>
      <SelectedFilter />

      {isDisplayTypeList ? <CollectionTable /> : isLoading ? <CollectionGridLoading /> : <CollectionGrid />}

      <CollectionFooter />
    </div>
  );
};

export default Index;
