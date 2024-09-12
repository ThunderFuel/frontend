import React, { useState } from "react";
import CollectionList from "../components/CollectionList";
import userService from "api/user/user.service";
import { useProfile } from "../ProfileContext";
import { CollectionItemsRequest } from "api/collections/collections.type";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";

const options = {
  hiddenSweep: true,
};

const getInitParams = () => {
  const initParams = {
    Status: { type: 3, value: "6" },
    sortingType: 1,
  };
  try {
    const queryString = new URLSearchParams(window.location.search);
    const queryFilterArr = JSON.parse(decodeURIComponent(queryString.get("filter") as string));

    return {
      ...initParams,
      ...queryFilterArr,
    };
  } catch (e) {
    return initParams;
  }
};
const PAGE_SIZE = 20;
let tmpCollectionItems: any = [];
const Collection = () => {
  const { userInfo, options: profileOptions, tokens } = useProfile();
  const [filter, setFilter] = React.useState([] as any);
  const [isLoading, setIsLoading] = React.useState(true);
  const [collectionItems, setCollectionItems] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({});
  const initParams = getInitParams();
  const onChangeFilter = (params: any) => {
    if (!tokens.length) {
      return false;
    }

    setIsLoading(true);
    try {
      setCollectionItems([]);

      tmpCollectionItems = tokens ?? userInfo.tokens;
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
              return !collectionItem.salable && !collectionItem.onAuction;
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

      setPagination({
        pageNumber: 0,
        page: 0,
        pageCount: Math.round(tmpCollectionItems.length / PAGE_SIZE),
        itemsCount: tmpCollectionItems.length,
      });
      setCollectionItems([...tmpCollectionItems].splice(0, PAGE_SIZE));
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
    }
  };
  const onChangePagination = (params: any) => {
    if (isLoading) {
      return false;
    }
    setIsLoading(true);
    const nextCollectionItems = [...tmpCollectionItems].splice(params.page * PAGE_SIZE, PAGE_SIZE);

    setCollectionItems((prevState: any) => [...prevState, ...nextCollectionItems]);
    setPagination((prevState: any) => ({ ...prevState, pageNumber: params.page }));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    if (userInfo.id) {
      fetchFilters();
    }
  }, [userInfo]);
  React.useEffect(() => {
    onChangeFilter(initParams);
  }, [tokens]);

  return (
    <InfiniteScroll isLoading={isLoading} pagination={pagination} onChangePagination={onChangePagination}>
      <CollectionList
        isLoading={isLoading}
        collectionItems={collectionItems}
        initParams={initParams}
        filterItems={filter}
        options={{ ...options, ...profileOptions }}
        onChangeFilter={onChangeFilter}
        pagination={pagination}
      />
    </InfiniteScroll>
  );
};

export default Collection;
