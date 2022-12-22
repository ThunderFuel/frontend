import React from "react";
import HeaderButton from "components/HeaderButton";

const CollectionItems = ({ data }: { data: any }) => {
  return data.map((item: any) => (
    <HeaderButton
      className="flex items-center justify-between text-h6 tracking-normal text-left border border-gray rounded-md p-3"
      key={item.id}
    >
      <div className="flex gap-2.5 items-center">
        <img className="rounded-full h-8 w-8" src={item.image} alt={item.name} />
        <span>{item.name}</span>
      </div>
      <span className="text-headline-01 text-gray-light">{item.itemCount}</span>
    </HeaderButton>
  ));
};

const AccountItems = ({ data }: { data: any }) => {
  return data.map((item: any) => (
    <HeaderButton
      className="flex gap-2.5 items-center text-h6 tracking-normal text-left border border-gray rounded-md p-3"
      key={item.id}
    >
      <img className="rounded-full h-8 w-8" src={item.image} alt={item.name} />
      <span>{item.name}</span>
    </HeaderButton>
  ));
};

const SearchDropDown = ({ data }: { data: any }) => {
  return (
    <div className="absolute overflow-hidden z-10 lg:no-scrollbar lg:overflow-y-auto lg:w-full lg:h-[430px] bg-bg-light lg:border border-gray lg:rounded-md lg:mt-2">
      <div className="border-b border-gray ">
        <span className="flex text-headline-01 uppercase text-gray-light pl-2 py-2">COLLECTIONS</span>
      </div>
      <div className="flex gap-2 flex-col p-4">
        <CollectionItems data={data.collections} />
      </div>
      <div className="border-b border-gray ">
        <span className="flex text-headline-01 uppercase text-gray-light pl-2 py-2">ACCOUNTS</span>
      </div>
      <div className="flex gap-2 flex-col p-4">
        <AccountItems data={data.accounts} />
      </div>
    </div>
  );
};

export default SearchDropDown;
