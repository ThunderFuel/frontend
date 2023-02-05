import React, { useState } from "react";
import { useParams } from "react-router-dom";
import collectionService from "api/collections/collections.service";

import CollectionList from "components/CollectionList";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";
import { CollectionItemsRequest } from "api/collections/collections.type";

const Items = () => {
  const { collectionId } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({});
  const initParams = {
    Status: { type: 3, value: "1" },
  };

  const getCollectionItems = async (filterParam: any = {}) => {
    const data: CollectionItemsRequest = {
      id: collectionId,
      page: pagination.pageNumber,
      pageSize: 20,
      sortingType: 1,
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
  const onChangeFilter = async (params: any) => {
    const { sortingType, search, ...etcParams } = params;

    const selectedFilter = Object.keys(etcParams).map((paramKey) => {
      const name = paramKey;
      const type = params[paramKey].type;
      let value = params[paramKey].value;
      const selecteds = Array.isArray(params[paramKey].value) ? params[paramKey].value : [];
      if (params[paramKey]?.value?.min || params[paramKey]?.value?.max) {
        value = `${params[paramKey].value.min ?? 0}-${params[paramKey].value.max ?? 0}`;
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
  };

  const onChangePagination = (params: any) => {
    if (params.page) {
      setIsLoading(true);
      try {
        getCollectionItems({ page: params.page }).then((collectionData) => {
          setCollections((prevState) => [...prevState, ...(collectionData as any)]);
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  React.useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <InfiniteScroll isLoading={isLoading} pagination={pagination} onChangePagination={onChangePagination}>
      <CollectionList collectionItems={collections} filterItems={filters} initParams={initParams} onChangeFilter={onChangeFilter} pagination={pagination} isLoading={isLoading} />
    </InfiniteScroll>
  );
};

export default Items;
