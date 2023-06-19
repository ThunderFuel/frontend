import React, { createContext, ReactNode, useContext, useMemo, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBulkListingSelectedTokenOrderList } from "store/bulkListingSlice";
import { getCartSelectedTokenOrderList } from "store/cartSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";

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
  const location = useLocation();
  const dispatch = useDispatch();
  const bulkListingSelectedTokenOrderList = useSelector(getBulkListingSelectedTokenOrderList);
  const cartSelectedTokenOrderList = useSelector(getCartSelectedTokenOrderList);

  const [displayType, setDisplayType] = useState(DisplayType.GRID4);
  const [params, setParams] = useReducer((prevState: any, nextState: any) => {
    switch (nextState.type) {
      case ParamsType.Reset: {
        const { Status, sortingType } = prevState;

        return {
          Status,
          sortingType,
        };
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

  const onCancelAllListings = async () => {
    try {
      dispatch(
        setCheckout({
          type: CheckoutType.CancelAllListings,
        })
      );
      dispatch(toggleCheckoutModal());
    } catch (e) {
      console.log(e);
    }
  };

  const collectionItems = React.useMemo(() => {
    return value.collectionItems.map((item: any) => ({
      ...item,
      isSelected: cartSelectedTokenOrderList.includes(item.uid) || bulkListingSelectedTokenOrderList.includes(item.uid),
    }));
  }, [value.collectionItems, cartSelectedTokenOrderList, bulkListingSelectedTokenOrderList]);

  const filters = value.filterItems;

  const isDisplayTypeList = useMemo(() => {
    return displayType === DisplayType.LIST;
  }, [displayType]);

  React.useEffect(() => {
    value.onChangeFilter(params);
  }, [params, filters]);
  React.useEffect(() => {
    setSweep(0);
  }, [location.pathname]);
  React.useEffect(() => {
    if (cartSelectedTokenOrderList.length === 0) {
      setSweep(0);
    }
  }, [cartSelectedTokenOrderList]);

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
    onCancelAllListings,
  };

  return <CollectionListContext.Provider value={contextValue}>{children}</CollectionListContext.Provider>;
};

export default CollectionListProvider;

export const useCollectionListContext = () => useContext(CollectionListContext);
