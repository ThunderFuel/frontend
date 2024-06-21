import React, { useState } from "react";
import CollectionList from "../components/CollectionList";
import userService from "api/user/user.service";
import { useProfile } from "../ProfileContext";
import { CollectionItemsRequest } from "api/collections/collections.type";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";

const options = {
  hiddenSweep: true,
};

const getInitParams = () => {
  const initParams = {
    Status: { type: 3, value: "6" },
    sortingType: 1,
  };
  try {
    const queryString = new URLSearchParams(window.location.search);
    const queryFilterArr = JSON.parse(decodeURIComponent(queryString.get("filter") as string));

    return {
      ...initParams,
      ...queryFilterArr,
    };
  } catch (e) {
    return initParams;
  }
};
const PAGE_SIZE = 20;
let tmpCollectionItems: any = [];
const Collection = () => {
  const { userInfo, options: profileOptions } = useProfile();
  const [filter, setFilter] = React.useState([] as any);
  const [isLoading, setIsLoading] = React.useState(false);
  const [collectionItems, setCollectionItems] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({});
  const initParams = getInitParams();
  const isValidFilter = true;

  const onChangeFilterFetchCollection = async (params: any) => {
    const { sortingType, search, ...etcParams } = params;

    try {
      const selectedFilter = Object.keys(etcParams).map((paramKey) => {
        const name = paramKey;
        const type = params[paramKey].type;
        let value = params[paramKey].value;
        const selecteds = Array.isArray(params[paramKey].value) ? params[paramKey].value : [];
        if (params[paramKey]?.value?.min || params[paramKey]?.value?.max) {
          value = `${params[paramKey].value.min ?? ""}-${params[paramKey].value.max ?? ""}`;
        } else if (selecteds.length) {
          value = "";
        }

        return {
          name,
          type,
          selecteds,
          value,
        };
      });
      if (search?.length) {
        selectedFilter.push({
          name: "",
          type: 0,
          value: search,
          selecteds: [],
        });
      }

      await fetchCollections({
        sortingType,
        page: 1,
        items: selectedFilter,
      });

      window.requestParams = {
        selectedFilter,
        sortingType,
      };
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeFilter = (params: any) => {
    setIsLoading(true);
    try {
      setCollectionItems([]);

      tmpCollectionItems = userInfo.tokens;
      Object.entries(params).forEach(([key, item]: any) => {
        if (key === "search") {
          tmpCollectionItems = tmpCollectionItems.filter((collectionItem: any) => String(collectionItem.name).toLowerCase().search(item) > -1);
        }
        if (key === "Status" && item?.type === 3) {
          tmpCollectionItems = tmpCollectionItems.filter((collectionItem: any) => {
            if (item.value === "1") {
              return collectionItem.salable;
            } else if (item.value === "2") {
              return collectionItem.onAuction;
            } else if (item.value === "3") {
              return !collectionItem.salable && !collectionItem.onAuction;
            } else if (item.value === "4") {
              return collectionItem.hasOffer;
            } else if (item.value === "6") {
              return true;
            }
          });
        }
        if (key === "Collections" && item?.type === 6) {
          tmpCollectionItems = tmpCollectionItems.filter((collectionItem: any) => item.value.includes(collectionItem.collectionId.toString()));
        }
      });
      tmpCollectionItems = tmpCollectionItems.sort((a: any, b: any) => {
        if (params.sortingType === 1) {
          const aPrice = a.price ?? 99;
          const bPrice = b.price ?? 99;

          return aPrice - bPrice;
        } else if (params.sortingType === 2) {
          const aPrice = a.price ?? 0;
          const bPrice = b.price ?? 0;

          return bPrice - aPrice;
        } else if (params.sortingType === 3) {
          return a.listedTimeUnix - b.listedTimeUnix;
        } else if (params.sortingType === 4) {
          return a.higeshtSalePrice - b.higeshtSalePrice;
        }

        return a.lowestSalePrice - b.lowestSalePrice;
      });

      setPagination({
        pageNumber: 0,
        page: 0,
        pageCount: Math.round(tmpCollectionItems.length / PAGE_SIZE),
        itemsCount: tmpCollectionItems.length,
      });
      setCollectionItems([...tmpCollectionItems].splice(0, PAGE_SIZE));
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const fetchFilters = async () => {
    setIsLoading(true);
    try {
      const response = await userService.getFilters({ userId: userInfo.id });
      setFilter(response.data.filters ?? []);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }

    await onChangeFilter(initParams);
  };

  const getCollectionItems = async (filterParam: any = {}) => {
    if (!userInfo.id) {
      return [];
    }
    const data: CollectionItemsRequest = {
      userId: userInfo.id,
      page: pagination.pageNumber,
      pageSize: 20,
      ...filterParam,
    };
    try {
      const { data: collectionData, ...paginationData } = await userService.getUserCollections(data);
      setPagination(paginationData);

      return collectionData;
    } catch (e) {
      return userInfo?.tokens ?? [];
    }
  };

  const onChangePagination = (params: any) => {
    if (isLoading) {
      return false;
    }
    setIsLoading(true);
    const nextCollectionItems = [...tmpCollectionItems].splice(params.page * PAGE_SIZE, PAGE_SIZE);

    setCollectionItems((prevState: any) => [...prevState, ...nextCollectionItems]);
    setPagination((prevState: any) => ({ ...prevState, pageNumber: params.page }));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const onChangePaginationFetch = async (params: any) => {
    if (!!params.continuation || params.page > 1) {
      setIsLoading(true);
      try {
        const { selectedFilter, sortingType } = window.requestParams;
        const collectionData = await getCollectionItems({
          items: selectedFilter,
          page: params.page,
          continuation: params.continuation,
          sortingType,
        });

        setCollectionItems((prevState: any) => [...prevState, ...(collectionData as any)]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const fetchCollections = async (filter: any = {}) => {
    if (isLoading) {
      return false;
    }

    setIsLoading(true);

    try {
      const collectionData = await getCollectionItems(filter);
      setCollectionItems(collectionData);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (userInfo.id) {
      fetchFilters();
    }
  }, [userInfo]);

  return (
    <InfiniteScroll isLoading={isLoading} pagination={pagination} onChangePagination={isValidFilter ? onChangePagination : onChangePaginationFetch}>
      <CollectionList
        isLoading={isLoading}
        collectionItems={collectionItems}
        initParams={initParams}
        filterItems={filter}
        options={{ ...options, ...profileOptions }}
        onChangeFilter={isValidFilter ? onChangeFilter : onChangeFilterFetchCollection}
        pagination={pagination}
      />
    </InfiniteScroll>
  );
};

export default Collection;
