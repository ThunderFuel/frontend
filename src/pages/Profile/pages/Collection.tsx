import React, { useState } from "react";
import CollectionList from "../components/CollectionList";
import userService from "api/user/user.service";
import { useProfile } from "../ProfileContext";

const options = {
  hiddenSweep: true,
};
const Collection = () => {
  const { userInfo, options: profileOptions } = useProfile();
  const [filter, setFilter] = React.useState([] as any);
  const [isLoading, setIsLoading] = React.useState(true);
  const [collectionItems, setCollectionItems] = useState(userInfo?.tokens);
  const initParams = {
    Status: { type: 3, value: "6" },
    sortingType: 1,
  };
  const onChangeFilter = (params: any) => {
    setIsLoading(true);
    try {
      setCollectionItems([]);

      let tmpCollectionItems: any = userInfo.tokens;
      Object.entries(params).forEach(([key, item]: any) => {
        if (key === "search") {
          tmpCollectionItems = tmpCollectionItems.filter((collectionItem: any) => String(collectionItem.name).toLowerCase().search(item) > -1);
        }
        if (key === "Status" && item?.type === 3) {
          tmpCollectionItems = tmpCollectionItems.filter((collectionItem: any) => {
            if (item.value === "1") {
              return collectionItem.salable;
            } else if (item.value === "2") {
              return collectionItem.onAuction;
            } else if (item.value === "3") {
              return !collectionItem.salable;
            } else if (item.value === "4") {
              return collectionItem.hasOffer;
            } else if (item.value === "6") {
              return true;
            }
          });
        }
        if (key === "Collections" && item?.type === 6) {
          tmpCollectionItems = tmpCollectionItems.filter((collectionItem: any) => item.value.includes(collectionItem.collectionId.toString()));
        }
      });
      tmpCollectionItems = tmpCollectionItems.sort((a: any, b: any) => {
        if (params.sortingType === 1) {
          const aPrice = a.price ?? 99;
          const bPrice = b.price ?? 99;

          return aPrice - bPrice;
        } else if (params.sortingType === 2) {
          const aPrice = a.price ?? 0;
          const bPrice = b.price ?? 0;

          return bPrice - aPrice;
        } else if (params.sortingType === 3) {
          return a.listedTimeUnix - b.listedTimeUnix;
        } else if (params.sortingType === 4) {
          return a.higeshtSalePrice - b.higeshtSalePrice;
        }

        return a.lowestSalePrice - b.lowestSalePrice;
      });
      setCollectionItems(tmpCollectionItems);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const fetchFilters = async () => {
    setIsLoading(true);
    try {
      const response = await userService.getFilters({ userId: userInfo.id });
      setFilter(response.data.filters ?? []);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (userInfo.id) {
      fetchFilters();
    }
  }, [userInfo]);

  return (
    <CollectionList isLoading={isLoading} collectionItems={collectionItems} initParams={initParams} filterItems={filter} options={{ ...options, ...profileOptions }} onChangeFilter={onChangeFilter} />
  );
};

export default Collection;
