import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import collectionService from "api/collections/collections.service";
import { useAppSelector } from "store";

export enum DisplayType {
  GRID3 = "3",
  GRID4 = "4",
  GRID5 = "5",
  LIST = "list",
}

interface IItemContext {
  displayType?: string;
  setDisplayType?: any;
  collections?: any;
  fetchCollections?: any;
  selectedCarts?: any;
  collectionItems: any;
  isDisplayTypeList: boolean;
  filterParams: any;
  onSetFilterParams: (filter: string, value: any) => void;
  fetchFilters: any;
  filters: any;
}

export const ItemContext = createContext<IItemContext>({} as any);

const ItemProvider = ({ children }: { children: ReactNode }) => {
  const selectedCarts = useAppSelector((state) => state.cart.items);

  const [displayType, setDisplayType] = useState(DisplayType.GRID4);
  const [collections, setCollections] = useState([]);
  const [filterParams, setFilterParams] = useState<any>({});
  const [filters, setFilters] = useState<any>({});

  const onSetFilterParams = (filter: string, value: any) => {
    setFilterParams((prevState: any) => {
      prevState[filter] = value;

      return prevState;
    });
  };

  const fetchCollections = async () => {
    const response = await collectionService.getCollections();

    return setCollections(response as any);
  };
  const fetchFilters = async () => {
    const response = await collectionService.getFilters();
    console.log(response);

    return setFilters(response);
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
    fetchCollections,
    selectedCarts,
    collectionItems,
    isDisplayTypeList,
    filterParams,
    onSetFilterParams,
    fetchFilters,
    filters,
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export default ItemProvider;

export const useItemContext = () => useContext(ItemContext);
