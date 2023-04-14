import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ActivityList from "components/ActivityList";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";
import collectionService, { ActivityFilters } from "api/collections/collections.service";

const Activity = () => {
  const { collectionId } = useParams();
  const [activities, setActivities] = useState<any>([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const filters = collectionService.getActivityFilters();

  const getActivityItems = async (params = {}) => {
    const response = await collectionService.getActivity({
      collectionId,
      pageSize: 10,
      ...params,
    });
    const data = response.data.map((item: any) => ({
      ...item,
      name: item.token.name,
      description: "",
      image: item.token.image,
      type: filters?.[item.activityType as ActivityFilters].name,
    }));

    setPagination({
      itemsCount: response.itemsCount,
      pageCount: response.pageCount,
      pageSize: response.pageSize,
      pageNumber: response.pageNumber,
    });

    return {
      data,
    };
  };
  const fetchActivity = async (params: any = {}) => {
    const response = await getActivityItems({ page: 1, ...params });
    setActivities(response.data);
  };

  const onChangePagination = async (params: any) => {
    if (params.page > 1) {
      setIsLoading(true);
      try {
        const response = await getActivityItems({ page: params.page });

        setActivities((prevState: any[]) => [...prevState, ...(response.data as any)]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onChangeFilterValue = (params: any) => {
    fetchActivity(params);
  };

  React.useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <InfiniteScroll isLoading={isLoading} pagination={pagination} onChangePagination={onChangePagination}>
      <ActivityList activities={activities} pagination={pagination} filters={filters} onChangeFilterValue={onChangeFilterValue} />;
    </InfiniteScroll>
  );
};

export default Activity;
