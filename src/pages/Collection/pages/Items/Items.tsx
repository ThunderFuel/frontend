import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CollectionItemsRequest } from "api/collections/collections.type";
import collectionService from "api/collections/collections.service";

import CollectionList from "components/CollectionList";

const Items = () => {
  const { collectionId } = useParams();
  const [collections, setCollections] = useState([]);
  const [filters, setFilters] = useState<any>([]);

  const fetchCollections = async (filter: any = null) => {
    const data: CollectionItemsRequest = {
      id: collectionId,
      page: 1,
      pageSize: 16,
      sortingType: 1,
    };
    if (filter) {
      data.items = filter;
    }
    const response = await collectionService.getCollectionItems(data);
    setCollections(response.data as any);
  };
  const fetchFilters = async () => {
    const response = await collectionService.getFilters({
      id: collectionId,
    });
    setFilters(response.data.filters as any);
  };

  const onChangeFilter = async (params: any) => {
    const selectedFilter = Object.keys(params).map((paramKey) => {
      const name = paramKey;
      const selecteds = Array.isArray(params[paramKey]) ? params[paramKey] : [];
      const value = params[paramKey].min || params[paramKey].max ? `${params[paramKey].min ?? 0}-${params[paramKey].max ?? 0}` : !selecteds.length ? params[paramKey] : "";

      return {
        name,
        type: 0,
        selecteds,
        value,
      };
    });
    await fetchCollections(selectedFilter);
  };

  React.useEffect(() => {
    fetchCollections();
    fetchFilters();
  }, []);

  return <CollectionList collectionItems={collections} filterItems={filters} onChangeFilter={onChangeFilter} />;
};

export default Items;
