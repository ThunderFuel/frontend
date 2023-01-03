import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import search from "api/search";

import AutoComplete from "components/AutoComplete";

const Search = () => {
  const [show, setShow] = useState(false);
  const [results, setResults] = useState<any>({});

  const ref = useRef(null);

  useEffect(() => {
    search.getSearchResult().then((response) => setResults(response));
  }, []);

  useEffect(() => {
    const closeModal = (e: any) => {
      if (!e.path.includes(ref.current)) {
        setShow(false);
      }
    };
    document.body.addEventListener("mousedown", closeModal);

    return () => document.body.removeEventListener("mousedown", closeModal);
  }, [ref.current]);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const response = await search.getSearchResult();

    const text = e.target.value.trim().toLowerCase();
    const collections = response.collections.filter((item: any) => item.name.toLowerCase().search(text) > -1);
    const accounts = response.accounts.filter((item: any) => item.name.toLowerCase().search(text) > -1);

    setResults({
      collections,
      accounts,
    });
  };
  const onFocus = () => {
    setShow(true);
  };

  return (
    <AutoComplete ref={ref} onChange={onChange} onFocus={onFocus} show={show} className={"hidden lg:flex w-[440px]"}>
      {Object.keys(results).map((resultKey) => {
        return (
          <AutoComplete.Group key={resultKey} title={resultKey}>
            {results[resultKey].map((item: any) => (
              <AutoComplete.Item key={item.id} name={item.name} id={item.id} image={item.image} />
            ))}
          </AutoComplete.Group>
        );
      })}
    </AutoComplete>
  );
};

export default Search;
