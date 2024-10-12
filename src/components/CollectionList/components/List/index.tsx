import React from "react";
import CollectionGrid from "./CollectionGrid";
import CollectionTable from "./CollectionTable";
import CollectionFooter from "./CollectionFooter";
import clsx from "clsx";
import { useCollectionListContext } from "../../CollectionListContext";
import SelectedFilter from "../SelectedFilter";
import CollectionGridLoading from "./CollectionGridLoading";
import CollectionProfileFooter from "./CollectionProfileFooter";

const Index = () => {
  const { isDisplayTypeList, pagination, isLoading, collectionItems, options, onCancelAllListings } = useCollectionListContext();

  return (
    <div className={"lg:flex lg:flex-col lg:flex-1 pt-5 gap-5"}>
      <div className="flex flex-col gap-5 px-5 lg:px-0 h-full">
        <div className="flex items-center justify-between">
          <div className={clsx("text-headline-02 text-gray-light", !options?.hiddenSidebar && "lg:pl-5")}>
            {pagination?.itemsCount ?? collectionItems.length} {options?.itemLabel ?? "ITEMS"}
          </div>
          {/* {options?.isProfile ? (
            <Config show={!config.isHideAllCancelButtons()}>
              <Button className="btn-secondary btn-sm" onClick={onCancelAllListings}>
                cancel all listings <IconCircleRemoveWhite />
              </Button>
            </Config>
          ) : null} */}
        </div>
        <SelectedFilter />

        <div className={clsx("lg:flex-1", isDisplayTypeList ? (options?.isUserPage ? "-mr-5" : "lg:-mr-10") : "")}>
          {isDisplayTypeList ? <CollectionTable /> : <CollectionGrid isLoading={isLoading}>{isLoading ? <CollectionGridLoading /> : null}</CollectionGrid>}
        </div>
      </div>
      {options?.hideFooter ? null : options?.isProfile ? <CollectionProfileFooter /> : <CollectionFooter />}
    </div>
  );
};

export default Index;
