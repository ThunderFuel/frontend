import React, { useState } from "react";
import CollectionList from "../components/CollectionList";
import userService from "api/user/user.service";
import { useProfile } from "../ProfileContext";

const options = {
  hiddeSidebarFilter: true,
  hiddenSweep: true,
};
const Collection = () => {
  const { userInfo, options: profileOptions } = useProfile();
  const [filter, setFilter] = React.useState([] as any);
  const [collectionItems, setCollectionItems] = useState(userInfo?.tokens);
  const initParams = {
    Status: { type: 3, value: "1" },
    sortingType: 1,
  };
  const onChangeFilter = (params: any) => {
    let tmpCollectionItems: any = userInfo.tokens;
    Object.entries(params).forEach(([key, item]: any) => {
      if (key === "search") {
        tmpCollectionItems = tmpCollectionItems.filter((collectionItem: any) => String(collectionItem.name).toLowerCase().search(item) > -1);
      }
      if (key === "Status" && item?.type === 3) {
        console.log(item.value);
        tmpCollectionItems = tmpCollectionItems.filter((collectionItem: any) => {
          if (item.value === "1") {
            return collectionItem.salable;
          } else if (item.value === "2") {
            return collectionItem.onAuction;
          } else if (item.value === "3") {
            return !collectionItem.salable;
          }
        });
      }
      if (key === "Collections" && item?.type === 6) {
        tmpCollectionItems = tmpCollectionItems.filter((collectionItem: any) => item.value.includes(collectionItem.collectionId.toString()));
      }
    });
    setCollectionItems(tmpCollectionItems);
  };

  const fetchFilters = async () => {
    const response = await userService.getFilters({ userId: userInfo.id });
    setFilter(response.data.filters ?? []);
  };

  React.useEffect(() => {
    fetchFilters();
    setCollectionItems(userInfo?.tokens);
  }, [userInfo]);

  return <CollectionList collectionItems={collectionItems} initParams={initParams} filterItems={filter} options={{ ...options, ...profileOptions }} onChangeFilter={onChangeFilter} />;
};

export default Collection;
