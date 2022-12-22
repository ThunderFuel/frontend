import { IconSearch } from "icons";
import React from "react";

const SearchInput = (props: any) => {
  return (
    <div className="flex flex-row-reverse lg:items-center lg:justify-end w-full lg:border lg:h-12 lg:rounded lg:border-gray">
      <input className="body-medium w-full lg:w-[281px] outline-none text-white placeholder-gray-light" {...props} />
      <IconSearch className="inputIcon cursor-pointer fill-gray-light mr-2 ml-4" />
    </div>
  );
};

export default SearchInput;
