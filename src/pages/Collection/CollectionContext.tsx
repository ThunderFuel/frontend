import React, { createContext, ReactNode, useContext, useState } from "react";

export enum DisplayType {
  GRID3 = "3",
  GRID4 = "4",
  GRID5 = "5",
  LIST = "list",
}

interface CollectionContext {
  displayType?: string;
  setDisplayType?: any;
}

export const CollectionContext = createContext<CollectionContext>({});

const CollectionContextProvider = ({ children }: { children: ReactNode }) => {
  const [displayType, setDisplayType] = useState(DisplayType.GRID4);

  const value = {
    displayType,
    setDisplayType,
  };

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
};

export default CollectionContextProvider;

export const useCollectionContext = () => useContext(CollectionContext);
