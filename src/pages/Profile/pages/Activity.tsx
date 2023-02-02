import React, { useState } from "react";
import { useParams } from "react-router-dom";
import collectionService from "api/collections/collections.service";
import ActivityList from "components/ActivityList";

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

  return (
    <div className="-mx-5">
      <ActivityList activities={activities} pagination={pagination} filters={filters} />
    </div>
  );
};

export default Activity;
