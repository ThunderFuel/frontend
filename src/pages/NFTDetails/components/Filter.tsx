import React, { useState } from "react";
import { IconCart, IconListed, IconOffer, IconToken, IconTransfer } from "icons";

const filterItemsData = [
  { icon: IconCart, text: "Sales", type: "Sale" },
  { icon: IconListed, text: "Listings", type: "List" },
  { icon: IconOffer, text: "Offers", type: "Offer" },
  { icon: IconToken, text: "Minted", type: "Mint" },
  { icon: IconTransfer, text: "Transfers", type: "Transfer" },
];

interface OtherProps {
  setnotActiveFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

function renderFilterItems(onChange: any) {
  return filterItemsData.map((i) => {
    const [active, setActive] = useState(true);

    return (
      <div
        key={i.text}
        className={`flex items-center cursor-pointer p-[10px] gap-x-1 border border-gray rounded-[5px] ${!active ? "bg-opacity-0 text-gray-light hover:text-white" : "bg-gray text-white"}`}
        onClick={() => {
          setActive(!active);
          onChange((prevArray: string[]) => (prevArray.includes(i.type) ? prevArray.filter((item) => item !== i.type) : [...prevArray, i.type]));
        }}
      >
        <i.icon className="w-5 h-5" />
        {i.text}
      </div>
    );
  });
}

const Filter: React.FC<OtherProps> = ({ setnotActiveFilters }) => {
  return <div className="flex flex-wrap gap-[10px]">{renderFilterItems(setnotActiveFilters)}</div>;
};

export default Filter;
