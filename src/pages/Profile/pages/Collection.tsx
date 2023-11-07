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
const Collection = () => {
  const { userInfo, options: profileOptions } = useProfile();
  const [filter, setFilter] = React.useState([] as any);
  const [isLoading, setIsLoading] = React.useState(false);
  const [collectionItems, setCollectionItems] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({});
  const initParams = getInitParams();

  const onChangeFilter = async (params: any) => {
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
  const onChangePagination = async (params: any) => {
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
    <InfiniteScroll isLoading={isLoading} pagination={pagination} onChangePagination={onChangePagination}>
      <CollectionList
        isLoading={isLoading}
        collectionItems={collectionItems}
        initParams={initParams}
        filterItems={filter}
        options={{ ...options, ...profileOptions }}
        onChangeFilter={onChangeFilter}
      />
    </InfiniteScroll>
  );
};

export default Collection;
