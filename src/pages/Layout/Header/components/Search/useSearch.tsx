import { ChangeEvent, useEffect, useState } from "react";
import search from "api/search";
import { useLocalStorage } from "hooks/useLocalStorage";

const LocalStorageRecentSearchKey = "RecentSearchKey";

export const useSearch = () => {
  const { setItem, getItem } = useLocalStorage();

  const [show, setShow] = useState(false);
  const [results, setResults] = useState<any>({});

  const getRecentItems = () => {
    let recentItems = getItem(LocalStorageRecentSearchKey);
    if (!recentItems) {
      recentItems = [];
    }
    setResults({
      recentItems,
    });
  };

  useEffect(() => {
    getRecentItems();
  }, []);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim().toLowerCase();
    if (text) {
      const response = await search.getSearchResult();
      const collections = response.collections.filter((item: any) => item.name.toLowerCase().search(text) > -1);
      const accounts = response.accounts.filter((item: any) => item.name.toLowerCase().search(text) > -1);

      setResults({
        collections,
        accounts,
      });
    } else {
      getRecentItems();
    }
  };

  const onClickItem = (item: any) => {
    let recentItems = getItem(LocalStorageRecentSearchKey);
    if (!recentItems) {
      recentItems = [];
    }
    recentItems.prepend(item);
    setItem(LocalStorageRecentSearchKey, recentItems);
  };

  return {
    show,
    setShow,
    results,
    onChange,
    onClickItem,
  };
};
