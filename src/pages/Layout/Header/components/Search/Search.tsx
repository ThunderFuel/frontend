import React, { useRef } from "react";
import AutoComplete from "components/AutoComplete";
import { useSearch } from "./useSearch";
import { useClickOutside } from "hooks/useClickOutside";

const Search = () => {
  const { show, setShow, results, onChange, onClickItem } = useSearch();
  const ref = useRef(null);
  const hasValue = Object.values(results).reduce((total, items: any) => total + items.length, 0) as number;

  useClickOutside(ref, () => {
    setShow(false);
  });

  const onFocus = () => {
    setShow(true);
  };

  const isShow = show && hasValue > 0;

  return (
    <AutoComplete placeholder="Search items, collections and creators." ref={ref} onChange={onChange} onFocus={onFocus} show={isShow} className={"flex flex-1 lg:w-[440px] header-search p-2.5"}>
      {Object.keys(results).map((resultKey) => {
        return (
          <AutoComplete.Group key={resultKey} title={resultKey}>
            {results[resultKey].map((item: any, i: number) => (
              <AutoComplete.Item key={i} item={item} onClick={onClickItem} />
            ))}
          </AutoComplete.Group>
        );
      })}
    </AutoComplete>
  );
};

export default Search;
