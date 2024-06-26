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
  const [currentFilter, setCurrentFilter] = useState<any>([]);

  const filters = collectionService.getActivityFilters();

  const getActivityItems = async (params: any) => {
    const response = await collectionService.getActivity({
      userId: userInfo.id,
      pageSize: 10,
      ...params,
    });
    const data = (response.data ?? []).map((item: any) => {
      const filter = filters?.[item.activityType as ActivityFilters] as any;

      return {
        ...item,
        name: item.token.name,
        description: "",
        image: item.token.image,
        type: filter?.name,
        subText: filter?.subText,
        typeIcon: filter?.icon,
      };
    });

    setPagination({
      continuation: response.continuation,
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
    if (params.page > 1 || !!params.continuation) {
      setIsLoading(true);
      try {
        const response = await getActivityItems({
          page: params.page,
          continuation: params.continuation,
          ...currentFilter,
        });

        setActivities((prevState: any[]) => [...prevState, ...(response.data as any)]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const onChangeFilterValue = (params: any) => {
    console.log("sjadjasjdajs", params);
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
