import { ChangeEvent, useEffect, useState } from "react";
import search from "api/search";
import { useLocalStorage } from "hooks/useLocalStorage";
import UseNavigate from "hooks/useNavigate";
import { uniqueArr } from "utils";

const LocalStorageRecentSearchKey = "thunder_recent_searches";

export const useSearch = () => {
  const navigate = UseNavigate();
  const { setItem, getItem } = useLocalStorage();

  const [show, setShow] = useState(false);
  const [results, setResults] = useState<any>({});

  const getRecentItems = () => {
    let recentItems = getItem(LocalStorageRecentSearchKey);
    if (!recentItems) {
      recentItems = [];
    }
    setResults({
      recent: recentItems,
    });
  };

  useEffect(() => {
    getRecentItems();
  }, []);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim().toLowerCase();
    if (text) {
      const response = await search.getSearchResult(text);
      setResults({
        collections: response.data,
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
    recentItems.unshift(item);
    setItem(LocalStorageRecentSearchKey, uniqueArr(recentItems).slice(0, 5));
    navigate.collectionNavigate(item.id, item.slug);
    setShow(false);
  };

  return {
    show,
    setShow,
    results,
    onChange,
    onClickItem,
  };
};
