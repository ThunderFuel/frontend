import { IconSearch } from "icons";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  data: any;
  showResults: (value: boolean) => void;
}

const SearchInput = ({ children, onChange, showResults, ...props }: InputProps) => {
  return (
    <div className="flex items-center w-screen lg:w-[440px]" {...props}>
      {children}
      <div
        className="flex flex-row-reverse lg:items-center lg:justify-end w-full lg:border lg:h-[52px] lg:rounded lg:border-gray"
        onClick={() => {
          showResults(true);
          document.getElementById("searchInput")?.focus();
        }}
      >
        <input
          id="searchInput"
          className="body-medium w-full lg:w-[281px] outline-none text-white placeholder-gray-light "
          placeholder="Search"
          onClick={() => {
            showResults(true);
          }}
          onChange={onChange}
          style={{ background: "none", fontSize: "16px" }}
        ></input>
        <IconSearch className="inputIcon cursor-pointer fill-gray-light mr-2 ml-4" />
      </div>
    </div>
  );
};

export default SearchInput;
