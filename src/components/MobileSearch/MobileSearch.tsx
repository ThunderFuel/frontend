import SearchDropDown from "components/SearchDropDown";
import InputSearch from "components/InputSearch";
import { IconClose } from "icons";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  data: any;
  showResults: (value: boolean) => void;
  showMobileSearchMenu: (value: boolean) => void;
}

const MobileSearch = ({ onChange, data, showMobileSearchMenu }: InputProps) => {
  return (
    <div className="fixed no-scrollbar overflow-x-hidden inset-0 w-screen h-screen bg-bg z-20 ">
      <div className="flex flex-col">
        <div className="flex border-b border-gray w-full ">
          <div
            className="flex justify-center items-center border-r border-gray p-[28px]"
            onClick={() => {
              showMobileSearchMenu(false);
            }}
          >
            <div className="absolute flex justify-center items-center w-[26px] h-[26px] bg-bg-light rounded-full b">
              <IconClose />
            </div>
          </div>
          <InputSearch onChange={onChange} className="flex items-center"></InputSearch>
        </div>
        <SearchDropDown data={data}></SearchDropDown>
      </div>
    </div>
  );
};

export default MobileSearch;
