import React from "react";
import { IconHand, IconLink } from "icons";
import EthereumPrice from "../../../../../components/EthereumPrice";

const ActivityItemDescription = React.memo(({ children }: { children: any }) => {
  let text = children;
  text = text.replace(",", "<span class='text-gray-light'>,</span>");
  text = text.replace(/you/, "<span class='text-green'>you</span>");
  text = text.replace(/by/, "<span class='text-gray-light'>by</span>");
  text = text.replace(/to/, "<span class='text-gray-light'>to</span>");
  text = text.replace(/from/, "<span class='text-gray-light'>from</span>");

  return <div className="body-medium" dangerouslySetInnerHTML={{ __html: text }} />;
});
ActivityItemDescription.displayName = "ActivityItemDescription";

const ActivityItem = ({ item }: { item: any }) => {
  return (
    <div className="bg-bg hover:bg-bg-light border border-gray rounded-md flex p-5 text-white gap-5 cursor-pointer">
      <div className="flex items-center gap-2.5 w-32">
        <div className="flex-center h-8 w-8 rounded-full bg-gray">
          <IconHand />
        </div>
        <h6 className="text-h6 text-overflow">{item.type}</h6>
      </div>
      <div className="flex items-center flex-1 gap-4">
        <a className="w-16 h-16 rounded-md overflow-hidden relative group">
          <img className="w-full" src={item.image} alt={item.name} />
          <div className="opacity-0 ease-in-out transform duration-300 group-hover:opacity-100 absolute bg-gray bg-opacity-80 top-0 left-0 w-full h-full flex-center">
            <IconLink className="fill-white" />
          </div>
        </a>
        <div className="flex flex-col gap-2.5">
          <h5 className="text-h6">{item.name}</h5>
          <ActivityItemDescription>{item.description}</ActivityItemDescription>
        </div>
      </div>
      {item.price && <EthereumPrice price={item.price} />}
    </div>
  );
};

export default ActivityItem;
