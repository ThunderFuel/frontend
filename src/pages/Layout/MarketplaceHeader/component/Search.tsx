import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchInput from "components/SearchInput";
import SearchDropDown from "components/SearchDropDown";
import search from "api/search";

const Search = () => {
  const [show, setShow] = useState(false);
  const [results, setResults] = useState<any>({
    collections: [],
    accounts: [],
  });

  const ref = useRef(null);

  useEffect(() => {
    const closeModal = (e: any) => {
      if (!e.path.includes(ref.current)) {
        setShow(false);
      }
    };
    document.body.addEventListener("mousedown", closeModal);

    return () => document.body.removeEventListener("mousedown", closeModal);
  }, [ref.current]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = search.getSearchResult();

    const text = e.target.value.trim().toLowerCase();
    const collections = result.collections.filter((item) => item.name.toLowerCase().search(text) > -1);
    const accounts = result.accounts.filter((item) => item.name.toLowerCase().search(text) > -1);

    setResults({
      collections,
      accounts,
    });
  };

  return (
    <div className="hidden lg:flex flex-col" ref={ref}>
      <SearchInput onChange={onChange} onFocus={() => setShow(true)} />
      {show && (
        <div className="relative">
          <SearchDropDown data={results} />
        </div>
      )}
    </div>
  );
};

export default Search;
