import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import collectionService from "api/collections";
import { useAppSelector } from "store";

export enum DisplayType {
  GRID3 = "3",
  GRID4 = "4",
  GRID5 = "5",
  LIST = "list",
}

interface CollectionContext {
  displayType?: string;
  setDisplayType?: any;
  collections?: any;
  getCollections?: any;
  selectedCarts?: any;
  collectionItems: any;
  isDisplayTypeList: boolean;
}

export const CollectionContext = createContext<CollectionContext>({} as any);

const CollectionContextProvider = ({ children }: { children: ReactNode }) => {
  const selectedCarts = useAppSelector((state) => state.cart.items);

  const [displayType, setDisplayType] = useState(DisplayType.GRID4);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    const response = await collectionService.getCollections();

    return setCollections(response as any);
  };

  const collectionItems = React.useMemo(() => {
    const selectedCartsIds = selectedCarts.map((item: any) => item.id);

    return collections.map((item: any) => ({
      ...item,
      isSelected: selectedCartsIds.includes(item.id),
    }));
  }, [collections, selectedCarts]);

  const isDisplayTypeList = useMemo(() => {
    return displayType === DisplayType.LIST;
  }, [displayType]);

  const value = {
    displayType,
    setDisplayType,
    collections,
    getCollections,
    selectedCarts,
    collectionItems,
    isDisplayTypeList,
  };

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
};

export default CollectionContextProvider;

export const useCollectionContext = () => useContext(CollectionContext);
