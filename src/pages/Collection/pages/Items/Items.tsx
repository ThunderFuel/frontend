import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CollectionItemsRequest } from "api/collections/collections.type";
import collectionService from "api/collections/collections.service";

import CollectionList from "components/CollectionList";

const Items = () => {
  const { collectionId } = useParams();
  const [collections, setCollections] = useState([]);
  const [filters, setFilters] = useState<any>([]);

  const fetchCollections = async () => {
    const data: CollectionItemsRequest = {
      id: collectionId,
      page: 1,
      pageSize: 16,
      sortingType: 1,
    };
    const response = await collectionService.getCollectionItems(data);
    setCollections(response.data as any);
  };
  const fetchFilters = async () => {
    const response = await collectionService.getFilters({
      id: collectionId,
    });
    setFilters(response.data.filters as any);
  };

  React.useEffect(() => {
    fetchCollections();
    fetchFilters();
  }, []);

  return <CollectionList collectionItems={collections} filterItems={filters} />;
};

export default Items;
