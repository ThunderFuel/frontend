import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import collectionService from "api/collections/collections.service";
import { useAppSelector } from "store";
import { CollectionItemsRequest } from "../../../../api/collections/collections.type";
import { useParams } from "react-router-dom";

export enum DisplayType {
  GRID3 = "3",
  GRID4 = "4",
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
  const { collectionId } = useParams();
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
    const data: CollectionItemsRequest = {
      id: collectionId,
      page: 1,
      pageSize: 16,
      sortingType: 1,
    };
    const response = await collectionService.getCollectionItems(data);

    return setCollections(response.data as any);
  };
  const fetchFilters = async () => {
    const response = await collectionService.getFilters();

    return setFilters(response);
  };

  const collectionItems = React.useMemo(() => {
    const selectedCartsIds = selectedCarts.map((item) => item.tokenOrder);

    return collections.map((item: any) => ({
      ...item,
      isSelected: selectedCartsIds.includes(item.tokenOrder),
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
