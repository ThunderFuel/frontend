import React, { useRef } from "react";
import AutoComplete from "components/AutoComplete";
import { useSearch } from "./useSearch";
import { useClickOutside } from "hooks/useClickOutside";

const Search = () => {
  const { show, setShow, results, onChange, onClickItem } = useSearch();
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setShow(false);
  });

  const onFocus = () => {
    setShow(true);
  };

  return (
    <AutoComplete placeholder="Search items, collections and creators." ref={ref} onChange={onChange} onFocus={onFocus} show={show} className={"hidden lg:block w-[440px]"}>
      {Object.keys(results).length > 0 &&
        Object.keys(results).map((resultKey) => {
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
