import React, { useState } from "react";
import collectionService, { ActivityFilters } from "api/collections/collections.service";
import ActivityList from "./components/ActivityList";
import { useProfile } from "../../ProfileContext";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";

const Activity = () => {
  const { userInfo } = useProfile();

  const [activities, setActivities] = useState<any>([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<any>(null);

  const filters = collectionService.getActivityFilters();

  const getActivityItems = async (params: any) => {
    const response = await collectionService.getActivity({
      userId: userInfo.id,
      pageSize: 10,
      ...params,
    });
    const data = response.data.map((item: any) => ({
      ...item,
      name: item.token.name,
      description: "",
      image: item.token.image,
      type: filters?.[item.activityType as ActivityFilters].name,
      typeIcon: filters?.[item.activityType as ActivityFilters].icon,
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
  const fetchActivity = async (params = {}) => {
    setActivities([]);
    const response = await getActivityItems({ page: 1, ...params });
    setActivities(response.data);
  };

  const onChangePagination = async (params: any) => {
    if (params.page > 1) {
      setIsLoading(true);
      try {
        const response = await getActivityItems({ page: params.page, ...currentFilter });

        setActivities((prevState: any[]) => [...prevState, ...(response.data as any)]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const onChangeFilterValue = (params: any) => {
    setCurrentFilter(params);
    fetchActivity(params);
  };

  React.useEffect(() => {
    if (userInfo?.id) {
      fetchActivity();
    }
  }, [userInfo.id]);

  return (
    <InfiniteScroll pagination={pagination} onChangePagination={onChangePagination} isLoading={isLoading}>
      <ActivityList activities={activities} pagination={pagination} filters={filters} onChangeFilterValue={onChangeFilterValue} />
    </InfiniteScroll>
  );
};

export default Activity;
