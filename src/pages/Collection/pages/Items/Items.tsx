import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import collectionService from "api/collections/collections.service";

import CollectionList from "components/CollectionList";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";
import { CollectionItemsRequest } from "api/collections/collections.type";
import { useAppDispatch } from "store";
import { removeAll } from "store/bulkListingSlice";

const getInitParams = () => {
  const initParams = {
    Status: { type: 3, value: "3" },
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
const Items = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { collectionId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({});

  const initParams = getInitParams();

  const getCollectionItems = async (filterParam: any = {}) => {
    const data: CollectionItemsRequest = {
      id: collectionId,
      page: pagination.pageNumber,
      pageSize: 20,
      ...filterParam,
    };

    const { data: collectionData, ...paginationData } = await collectionService.getCollectionItems(data);
    setPagination(paginationData);

    return collectionData;
  };
  const fetchCollections = async (filter: any = {}) => {
    if (isLoading) {
      return false;
    }

    setIsLoading(true);

    try {
      const collectionData = await getCollectionItems(filter);
      setCollections(collectionData);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchFilters = async () => {
    const response = await collectionService.getFilters({
      id: collectionId,
    });
    setFilters(response.data.filters as any);
  };

  const filterHistoryPush = (params: any) => {
    const stringParam = JSON.stringify(params);
    const stringInitParam = JSON.stringify(initParams);
    if (stringParam === stringInitParam) {
      return false;
    }

    navigate({
      pathname: location.pathname,
      search: `filter=${encodeURIComponent(JSON.stringify(params))}`,
    });
  };
  const onChangeFilter = async (params: any) => {
    const { sortingType, search, ...etcParams } = params;

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

    filterHistoryPush(params);
    window.requestParams = {
      selectedFilter,
      sortingType,
    };
  };

  const onChangePagination = async (params: any) => {
    if (params.page > 1) {
      setIsLoading(true);
      try {
        const { selectedFilter, sortingType } = window.requestParams;
        const collectionData = await getCollectionItems({ items: selectedFilter, page: params.page, sortingType });

        setCollections((prevState) => [...prevState, ...(collectionData as any)]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  React.useEffect(() => {
    dispatch(removeAll());

    fetchFilters();

    window.addEventListener("CompleteCheckout", fetchFilters);

    return () => {
      window.addEventListener("CompleteCheckout", fetchFilters);
    };
  }, [collectionId]);

  return (
    <InfiniteScroll isLoading={isLoading} pagination={pagination} onChangePagination={onChangePagination}>
      <CollectionList collectionItems={collections} filterItems={filters} initParams={initParams} onChangeFilter={onChangeFilter} pagination={pagination} isLoading={isLoading} />
    </InfiniteScroll>
  );
};

export default Items;
