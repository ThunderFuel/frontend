import HeaderButton from "components/HeaderButton";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  data: any;
}

const SearchDropDown = ({ data, ...props }: InputProps) => {
  function renderFoundCollections() {
    return data.foundCollections.map((item: any) => (
      <HeaderButton
        className="flex items-center justify-between text-h6 tracking-normal text-left border border-gray rounded-[6px] p-3"
        key={item.id}
      >
        <div className="flex items-center">
          <img className="rounded-[50%] h-[32px] w-[32px]" src={item.image}></img>
          <span className="ml-2.5">{item.name}</span>
        </div>
        <span className="text-headlineSm font-bigShoulderDisplay text-gray-light">{item.itemCount}</span>
      </HeaderButton>
    ));
  }

  function renderFoundAccounts() {
    return data.foundAccounts.map((item: any) => (
      <HeaderButton
        className="flex items-center text-h6 tracking-normal text-left border border-gray rounded-[6px] p-3"
        key={item.id}
      >
        <img className="rounded-[50%] h-[32px] w-[32px]" src={item.image}></img>
        <span className="ml-2.5">{item.name}</span>
      </HeaderButton>
    ));
  }

  return (
    <div {...props}>
      <div className="border-b border-gray ">
        <span className="flex text-headlineSm w-full text-gray-light font-bigShoulderDisplay pl-2 py-2">
          COLLECTIONS
        </span>
      </div>
      <div className="flex flex-col gap-y-2 p-[15px]">{renderFoundCollections()}</div>
      <div className="border-b border-gray ">
        <span className="flex text-headlineSm w-full text-gray-light font-bigShoulderDisplay pl-2 py-2">ACCOUNTS</span>
      </div>
      <div className="flex flex-col gap-y-2 p-[15px]">{renderFoundAccounts()}</div>
    </div>
  );
};

export default SearchDropDown;
