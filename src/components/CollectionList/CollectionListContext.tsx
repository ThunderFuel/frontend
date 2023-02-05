import React, { createContext, ReactNode, useContext, useMemo, useReducer, useState } from "react";
import { useAppSelector } from "../../store";

export enum DisplayType {
  GRID3 = "3",
  GRID4 = "4",
  LIST = "list",
}

enum ParamsType {
  Reset = "reset",
  Delete = "delete",
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
    switch (nextState.type) {
      case ParamsType.Reset: {
        return {};
      }
      case ParamsType.Delete: {
        delete prevState[nextState.name];

        return { ...prevState };
      }
      default:
        return { ...prevState, ...nextState };
    }
  }, value.initParams ?? {});
  const [sweep, setSweep] = useState(0);

  const resetParams = () => {
    setParams({ type: ParamsType.Reset });
  };
  const deleteParams = (name: any) => {
    setParams({ type: ParamsType.Delete, name });
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

  React.useEffect(() => {
    value.onChangeFilter(params);
  }, [params]);

  const contextValue = {
    ...value,
    displayType,
    isDisplayTypeList,
    collectionItems,
    filters,
    params,
    sweep,
    setParams,
    resetParams,
    deleteParams,
    setDisplayType,
    setSweep,
  };

  return <CollectionListContext.Provider value={contextValue}>{children}</CollectionListContext.Provider>;
};

export default CollectionListProvider;

export const useCollectionListContext = () => useContext(CollectionListContext);
