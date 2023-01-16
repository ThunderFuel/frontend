import React, { useState } from "react";
import { IconCart, IconListed, IconOffer, IconToken, IconTransfer } from "icons";

const filterItemData = [
  { icon: IconCart, text: "Sales" },
  { icon: IconListed, text: "Listings" },
  { icon: IconOffer, text: "Offers" },
  { icon: IconToken, text: "Minted" },
  { icon: IconTransfer, text: "Transfers" },
];

function FilterItem() {
  return filterItemData.map((i) => {
    const [active, setActive] = useState(true);

    return (
      <div
        key={i.text}
        className={`flex items-center cursor-pointer p-[10px] gap-x-1 border border-gray rounded-[5px] ${!active ? "bg-opacity-0 text-gray-light hover:text-white" : "bg-gray text-white"}`}
        onClick={() => setActive(!active)}
      >
        <i.icon />
        {i.text}
      </div>
    );
  });
}

const Filter = () => {
  return <div className="flex flex-wrap gap-[10px]">{FilterItem()}</div>;
};

export default Filter;
