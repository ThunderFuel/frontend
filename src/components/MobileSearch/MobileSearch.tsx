import SearchDropDown from "components/SearchDropDown";
import SearchInput from "components/SearchInput";
import { IconClose } from "icons";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  data: any;
  showResults: (value: boolean) => void;
  showMobileSearchMenu: (value: boolean) => void;
}

const MobileSearch = ({ onChange, showResults, data, showMobileSearchMenu }: InputProps) => {
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
          <SearchInput
            onChange={onChange}
            showResults={showResults}
            data={data}
            className="flex items-center"
          ></SearchInput>
        </div>
        <SearchDropDown data={data} className="bg-bg"></SearchDropDown>
      </div>
    </div>
  );
};

export default MobileSearch;
