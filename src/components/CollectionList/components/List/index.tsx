import React from "react";
import CollectionGrid from "./CollectionGrid";
import CollectionTable from "./CollectionTable";
import CollectionFooter from "./CollectionFooter";
import clsx from "clsx";
import { useCollectionListContext } from "../../CollectionListContext";
import SelectedFilter from "../SelectedFilter";
import CollectionGridLoading from "./CollectionGridLoading";
import CollectionProfileFooter from "./CollectionProfileFooter";
import Button from "components/Button";
import { IconCircleRemoveWhite } from "icons";

const Index = () => {
  const { isDisplayTypeList, pagination, isLoading, collectionItems, options, onCancelAllListings } = useCollectionListContext();

  return (
    <div className={clsx("flex flex-col flex-1 pt-5 gap-5")}>
      <div className="flex items-center justify-between">
        <div className={clsx("text-headline-02 text-gray-light", !options?.hiddenSidebar && "pl-5")}>
          {pagination?.itemsCount ?? collectionItems.length} {options?.itemLabel ?? "ITEMS"}
        </div>
        {options?.isProfile ? (
          <Button className="btn-secondary btn-sm" onClick={onCancelAllListings}>
            cancel all listings <IconCircleRemoveWhite />
          </Button>
        ) : null}
      </div>
      <SelectedFilter />

      <div className={clsx("flex-1", isDisplayTypeList ? (options?.isUserPage ? "-mr-5" : "-mr-10") : "")}>
        {isDisplayTypeList ? <CollectionTable /> : isLoading ? <CollectionGridLoading page={pagination?.page} /> : <CollectionGrid />}
      </div>

      {options?.hideFooter ? null : options?.isProfile ? <CollectionProfileFooter /> : <CollectionFooter />}
    </div>
  );
};

export default Index;
