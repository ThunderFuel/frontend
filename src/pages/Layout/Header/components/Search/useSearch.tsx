import { ChangeEvent, useEffect, useState } from "react";
import search from "api/search";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../../router/config/paths";

const LocalStorageRecentSearchKey = "RecentSearchKey";

export const useSearch = () => {
  const navigate = useNavigate();
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
      const response = await search.getSearchResult(text);
      setResults({
        collections: response.data,
        // accounts: [],
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
    setItem(LocalStorageRecentSearchKey, recentItems);
    navigate(PATHS.COLLECTION.replace(":collectionId", item.id));
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
