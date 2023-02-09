import { ChangeEvent, useEffect, useState } from "react";
import search from "api/search";
import { useLocalStorage } from "hooks/useLocalStorage";
import { PATHS } from "../../../../../router/config/paths";
import UseNavigate from "../../../../../hooks/useNavigate";

const LocalStorageRecentSearchKey = "RecentSearchKey";

export const useSearch = () => {
  const navigate = UseNavigate();
  const { setItem, getItem } = useLocalStorage();

  const [show, setShow] = useState(false);
  const [results, setResults] = useState<any>({});

  const getRecentItems = () => {
    let recent = getItem(LocalStorageRecentSearchKey);
    if (!recent) {
      recent = [];
    }
    setResults({
      recent,
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
    navigate(PATHS.COLLECTION, { collectionId: item.id });
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
