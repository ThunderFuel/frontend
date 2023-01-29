import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CollectionItemsRequest } from "api/collections/collections.type";
import collectionService from "api/collections/collections.service";

import CollectionList from "components/CollectionList";

const Items = () => {
  const { collectionId } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [collections, setCollections] = useState([]);
  const [filters, setFilters] = useState<any>([]);
  const [pagination, setPagination] = useState({});

  const fetchCollections = async (filter: any = null) => {
    setIsLoading(true);
    let data: CollectionItemsRequest = {
      id: collectionId,
      page: 1,
      pageSize: 16,
      sortingType: 1,
    };
    if (filter) {
      data = { ...data, ...filter };
    }
    try {
      const response = await collectionService.getCollectionItems(data);
      setCollections(response.data as any);
      setPagination({
        itemsCount: response.itemsCount,
        pageSize: response.pageSize,
        pageCount: response.pageCount,
        pageNumber: response.pageNumber,
      });
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
    const { sortingType, pageSize = 16, search, ...etcParams } = params;

    const selectedFilter = Object.keys(etcParams).map((paramKey) => {
      const name = paramKey;
      const type = params[paramKey].type;
      let value = params[paramKey].value;
      const selecteds = Array.isArray(params[paramKey].value) ? params[paramKey].value : [];
      if (params[paramKey].value.min || params[paramKey].value.max) {
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
      pageSize,
      items: selectedFilter,
    });
  };

  React.useEffect(() => {
    fetchCollections();
    fetchFilters();
  }, []);

  return <CollectionList collectionItems={collections} filterItems={filters} onChangeFilter={onChangeFilter} pagination={pagination} isLoading={isLoading} />;
};

export default Items;
