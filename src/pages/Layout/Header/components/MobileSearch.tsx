import React, { useEffect, useState } from "react";
import search from "api/search";
import InputSearch from "components/InputSearch";
import AutoComplete from "components/AutoComplete/AutoComplete";
import { IconClose } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { onToggle } from "store/mobileSearchSlice";
import clsx from "clsx";

const MobileSearch = () => {
  const { show } = useAppSelector((state) => state.mobileSearch);
  const dispatch = useAppDispatch();

  const [results, setResults] = useState<any>({});

  useEffect(() => {
    search.getSearchResult().then((response) => setResults(response));
  }, []);

  return (
    <div className={clsx("fixed top-0 left-0 w-full h-full z-10 bg-bg ease-in-out duration-300", show ? "translate-x-0 " : "translate-x-full")}>
      <div className="flex border-b border-b-gray items-center">
        <div className="p-4 border-r border-r-gray" onClick={() => dispatch(onToggle())}>
          <div className="w-8 h-8 bg-gray rounded-full flex items-center justify-center">
            <IconClose />
          </div>
        </div>
        <InputSearch />
      </div>

      <div className="flex flex-col h-full overflow-hidden overflow-y-scroll">
        {Object.keys(results).map((resultKey) => {
          return (
            <AutoComplete.Group key={resultKey} title={resultKey}>
              {results[resultKey].map((item: any) => (
                <AutoComplete.Item key={item.id} name={item.name} id={item.id} image={item.image} />
              ))}
            </AutoComplete.Group>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSearch;
