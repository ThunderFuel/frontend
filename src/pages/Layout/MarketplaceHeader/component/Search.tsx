import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchInput from "components/SearchInput";
import SearchDropDown from "components/SearchDropDown";
// import search from "api/search";

const Search = () => {
  const [showResults, setShowResults] = useState(false);
  // const [data, setData] = useState<any>({});

  const ref = useRef(null);

  useEffect(() => {
    const closeModal = (e: any) => {
      if (!e.path.includes(ref.current)) {
        setShowResults(false);
      }
    };
    document.body.addEventListener("mousedown", closeModal);

    return () => document.body.removeEventListener("mousedown", closeModal);
  }, [ref.current]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <div className="flex-col ml-8" ref={ref}>
      <div className="hidden lg:flex bg-bg-light">
        <SearchInput onChange={onChange} showResults={setShowResults} data={{}}></SearchInput>
      </div>
      <div className="hidden lg:block">
        <div
          hidden={!showResults}
          className="absolute overflow-hidden lg:no-scrollbar lg:overflow-y-auto z-[11] lg:w-[440px] lg:h-[430px] bg-bg-light lg:border border-gray lg:rounded-[6px] lg:mt-[7px]"
        >
          <SearchDropDown data={{}} />
        </div>
      </div>
    </div>
  );
};

export default Search;
