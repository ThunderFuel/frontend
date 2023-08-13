import React, { useState } from "react";
import { IconBid, IconCart, IconListed, IconOffer, IconToken, IconTransfer } from "icons";

const filterItemsData = [
  { icon: IconOffer, text: "Offers", type: 0 },
  { icon: IconToken, text: "Minted", type: 1 },
  { icon: IconCart, text: "Sales", type: 2 },
  { icon: IconTransfer, text: "Transfers", type: 3 },
  { icon: IconListed, text: "Listings", type: 4 },
  { icon: IconBid, text: "Bids", type: 5 },
];

interface OtherProps {
  setnotActiveFilters: React.Dispatch<React.SetStateAction<number[]>>;
}

function renderFilterItems(onChange: any) {
  return filterItemsData.map((i) => {
    const [active, setActive] = useState(true);

    return (
      <div
        key={i.text}
        className={`flex items-center cursor-pointer px-2 h-10 border border-gray rounded-full ${!active ? "bg-opacity-0 text-gray-light hover:text-white" : "bg-gray text-white"}`}
        onClick={() => {
          setActive(!active);
          onChange((prevArray: number[]) => (prevArray.includes(i.type) ? prevArray.filter((item) => item !== i.type) : [...prevArray, i.type]));
        }}
      >
        <i.icon className="w-5 h-5" />
      </div>
    );
  });
}

const Filter: React.FC<OtherProps> = ({ setnotActiveFilters }) => {
  return <div className="flex px-5 py-[15px] gap-[5px] border-b border-gray">{renderFilterItems(setnotActiveFilters)}</div>;
};

export default Filter;
