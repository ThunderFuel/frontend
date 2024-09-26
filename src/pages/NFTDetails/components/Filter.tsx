import React, { useState } from "react";
import { IconAccept, IconBid, IconCart, IconListed, IconListingCancel, IconOffer, IconOfferCancel, IconToken, IconTransfer } from "icons";
import Tooltip from "components/Tooltip";

const filterItemsData = [
  { icon: IconOffer, text: "Offers", type: 0 },
  { icon: IconToken, text: "Minted", type: 1 },
  { icon: IconCart, text: "Sales", type: 2 },
  { icon: IconTransfer, text: "Transfers", type: 3 },
  { icon: IconListed, text: "Listings", type: 4 },
  { icon: IconBid, text: "Bids", type: 5 },
  { icon: IconAccept, text: "Accept Offer", type: 6 },
  { icon: IconListingCancel, text: "Cancel Listing", type: 7 },
  { icon: IconOfferCancel, text: "Cancel Offer", type: 8 },
];

interface OtherProps {
  setnotActiveFilters: React.Dispatch<React.SetStateAction<number[]>>;
}

function renderFilterItems(onChange: any) {
  return filterItemsData.map((i) => {
    const [active, setActive] = useState(true);

    return (
      <Tooltip key={i.text} content={i.text} hiddenArrow={true} contentClass="!mt-3 !py-1.5 !px-2 !bg-bg">
        <div
          className={`flex items-center cursor-pointer px-2 h-10 border border-gray rounded-full ${!active ? "bg-opacity-0 text-gray-light hover:text-white" : "bg-gray text-white"}`}
          onClick={() => {
            setActive(!active);
            onChange((prevArray: number[]) => (prevArray.includes(i.type) ? prevArray.filter((item) => item !== i.type) : [...prevArray, i.type]));
          }}
        >
          <i.icon className="w-5 h-5" />
        </div>
      </Tooltip>
    );
  });
}

const Filter: React.FC<OtherProps> = ({ setnotActiveFilters }) => {
  return <div className="flex px-5 py-[15px] gap-[5px] border-b border-gray">{renderFilterItems(setnotActiveFilters)}</div>;
};

export default Filter;
