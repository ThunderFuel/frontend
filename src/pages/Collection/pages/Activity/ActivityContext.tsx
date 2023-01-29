import React, { createContext, ReactNode, useContext, useState } from "react";
import collectionService from "api/collections/collections.service";
import { useParams } from "react-router-dom";
import { IconHand, IconMarketBasket, IconQuarry, IconTag, IconTelegram } from "../../../../icons";

interface IActivityContext {
  fetchActivity: any;
  getActivities: any;
  setSelectedFilter: any;
  selectedFilter: any;
  filters: any;
  pagination: any;
}

export const ActivityContext = createContext<IActivityContext>({} as any);
const filters = [
  {
    icon: IconHand,
    name: "Offers",
  },
  {
    icon: IconQuarry,
    name: "Mints",
  },
  {
    icon: IconMarketBasket,
    name: "Sales",
  },
  {
    icon: IconTelegram,
    name: "Transfers",
  },
  {
    icon: IconTag,
    name: "Listings",
  },
];
const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const { collectionId } = useParams();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [activities, setActivities] = useState([]);
  const [pagination, setPagination] = useState({});
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

  const getActivities = React.useMemo(() => activities.filter((item: any) => (selectedFilter ? item.type === selectedFilter : true)), [selectedFilter, activities]);

  const value = {
    fetchActivity,
    getActivities,
    setSelectedFilter,
    selectedFilter,
    filters,
    pagination,
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};

export default ActivityProvider;

export const useActivityContext = () => useContext(ActivityContext);
