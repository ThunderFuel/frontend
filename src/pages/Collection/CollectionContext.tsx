import React, { createContext, ReactNode, useContext, useState } from "react";
import collectionService from "api/collections";

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
}

export const CollectionContext = createContext<CollectionContext>({});

const CollectionContextProvider = ({ children }: { children: ReactNode }) => {
  const [displayType, setDisplayType] = useState(DisplayType.GRID4);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    const response = await collectionService.getCollections();

    return setCollections(response as any);
  };

  const value = {
    displayType,
    setDisplayType,
    collections,
    getCollections,
  };

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
};

export default CollectionContextProvider;

export const useCollectionContext = () => useContext(CollectionContext);
