import HeaderButton from "components/HeaderButton";
import { IconSearch } from "icons";
import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  data: any;
}

const Search = ({ children, onChange, data, ...props }: InputProps) => {
  const [showResults, setShowResults] = useState(false);

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

  const modalRef = useRef(null);

  useEffect(() => {
    const closeModal = (e: any) => {
      if (!e.path.includes(modalRef.current)) {
        setShowResults(false);
      }
    };

    document.body.addEventListener("mousedown", closeModal);

    return () => document.body.removeEventListener("mousedown", closeModal);
  }, [modalRef.current]);

  return (
    <div className="flex-col ml-8" ref={modalRef}>
      {children}
      <div className="hidden lg:flex items-center ">
        <input
          {...props}
          className="text-bodyMd font-spaceGrotesk w-[440px] py-6 pr-5 pl-[52px] h-[52px] text-white placeholder-gray-light outline outline-1 outline-gray rounded-[6px]"
          type={"text"}
          placeholder="Search items, collections and creators"
          style={{ background: "none" }}
          onClick={() => setShowResults(true)}
          onChange={onChange}
        ></input>
        <IconSearch className="inputIcon absolute cursor-pointer fill-[#838383] ml-[16px] " />
      </div>
      <div className="hidden lg:block">
        <div
          hidden={!showResults}
          className="absolute no-scrollbar overflow-y-auto z-[11] w-[440px] h-[430px] bg-bg-light border border-gray rounded-[6px] mt-[2px] "
        >
          <div className="border-b border-gray ">
            <span className="flex text-headlineSm w-full text-gray-light font-bigShoulderDisplay pl-2 py-2">
              COLLECTIONS
            </span>
          </div>
          <div className="flex flex-col gap-y-2 p-[15px]">{renderFoundCollections()}</div>
          <div className="border-b border-gray ">
            <span className="flex text-headlineSm w-full text-gray-light font-bigShoulderDisplay pl-2 py-2">
              ACCOUNTS
            </span>
          </div>
          <div className="flex flex-col gap-y-2 p-[15px]">{renderFoundAccounts()}</div>
        </div>
      </div>
      <div className="absolute"></div>
    </div>
  );
};

export default Search;
