import React, { createContext, ReactNode, useContext, useMemo, useReducer, useState } from "react";
import { useAppSelector } from "../../store";

export enum DisplayType {
  GRID3 = "3",
  GRID4 = "4",
  LIST = "list",
}

interface ICollectionListContext {
  collectionItems: any;
  filterItems: any;

  [key: string]: any;
}

export const CollectionListContext = createContext<ICollectionListContext>({} as any);

const CollectionListProvider = ({ value, children }: { value: ICollectionListContext; children: ReactNode }) => {
  const selectedCarts = useAppSelector((state) => state.cart.items);
  const [displayType, setDisplayType] = useState(DisplayType.GRID4);
  const [params, setParams] = useReducer((prevState: any, nextState: any) => {
    if (nextState.type === "reset") {
      return {};
    }

    return { ...prevState, ...nextState };
  }, {});

  const resetParams = () => {
    setParams({ type: "reset" });
  };

  const collectionItems = React.useMemo(() => {
    const selectedCartsIds = selectedCarts.map((item) => item.tokenOrder);

    return value.collectionItems.map((item: any) => ({
      ...item,
      isSelected: selectedCartsIds.includes(item.tokenOrder),
    }));
  }, [value.collectionItems, selectedCarts]);

  const filters = value.filterItems;

  const isDisplayTypeList = useMemo(() => {
    return displayType === DisplayType.LIST;
  }, [displayType]);

  const contextValue = {
    ...value,
    displayType,
    isDisplayTypeList,
    collectionItems,
    filters,
    params,
    setParams,
    resetParams,
    setDisplayType,
  };

  return <CollectionListContext.Provider value={contextValue}>{children}</CollectionListContext.Provider>;
};

export default CollectionListProvider;

export const useCollectionListContext = () => useContext(CollectionListContext);
