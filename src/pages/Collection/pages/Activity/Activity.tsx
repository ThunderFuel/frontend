import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ActivityList from "components/ActivityList";
import collectionService from "api/collections/collections.service";

const Activity = () => {
  const { collectionId } = useParams();
  const [activities, setActivities] = useState([]);
  const [pagination, setPagination] = useState({});
  const filters = collectionService.getActivityFilters();
  const fetchActivity = async () => {
    const response = await collectionService.getActivity({
      collectionId,
    });
    const data = response.data.map((item: any) => ({
      name: item.token.name,
      description: "",
      image: item.token.image,
      price: item.price,
      type: filters[item.activityType].name,
    })) as any;
    setActivities(data);
    setPagination({
      itemsCount: response.itemsCount,
      pageCount: response.pageCount,
      pageSize: response.pageSize,
      pageNumber: response.pageNumber,
    });
  };

  React.useEffect(() => {
    fetchActivity();
  }, []);

  return <ActivityList activities={activities} pagination={pagination} filters={filters} />;
};

export default Activity;
