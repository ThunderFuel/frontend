import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivityList from "components/ActivityList";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";
import collectionService, { ActivityFilters } from "api/collections/collections.service";

const Activity = () => {
  const { collectionId } = useParams();
  const [activities, setActivities] = useState<any>([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = React.useReducer(
    (prevState: any, nextState: any) => {
      return { ...prevState, ...nextState };
    },
    {
      collectionId,
      pageSize: 10,
      page: 1,
      type: null,
    }
  );

  const filters = collectionService.getActivityFilters();

  const getActivityItems = async () => {
    const response = await collectionService.getActivity(params);
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
  const fetchActivity = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setActivities([]);
      try {
        const response = await getActivityItems();
        setActivities(response.data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onChangePagination = async () => {
    if (params.page > 1) {
      setIsLoading(true);
      try {
        const response = await getActivityItems();

        setActivities((prevState: any[]) => [...prevState, ...(response.data as any)]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onChangeFilterValue = ({ types }: any) => {
    setParams({ types });
  };

  React.useEffect(() => {
    fetchActivity();
  }, [params.types]);

  useEffect(() => {
    onChangePagination();
  }, [params.page]);

  return (
    <InfiniteScroll
      isLoading={isLoading}
      pagination={pagination}
      onChangePagination={({ page }: any) => {
        setParams({ page: page });
      }}
      bottomOffset={200}
    >
      <ActivityList containerClassName={"pl-10"} activities={activities} pagination={pagination} filters={filters} onChangeFilterValue={onChangeFilterValue} />;
    </InfiniteScroll>
  );
};

export default Activity;
