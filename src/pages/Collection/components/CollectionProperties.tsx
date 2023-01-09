import React from "react";
import { IconEthereum } from "icons";

const CollectionProperties = () => {
  const items = [
    {
      name: "total volume",
      value: "28.33",
      icon: <IconEthereum />,
    },
    {
      name: "floor",
      value: "0.423",
      icon: <IconEthereum />,
    },
    {
      name: "lısted",
      value: "10%",
    },
    {
      name: "owners",
      value: "2,123",
    },
  ];

  return (
    <div>
      <ul className="inline-flex border border-gray rounded-md">
        {items.map((item) => (
          <li key={item.name} className="flex flex-col gap-2 px-4 pt-3 pb-1 border-l border-l-gray first:border-none text-gray-light hover:text-white cursor-pointer">
            <div className="text-headline-01 uppercase whitespace-nowrap">{item.name}</div>
            <div className="flex items-center">
              <h4 className="text-h4 text-white">{item.value}</h4>
              {item.icon ?? <></>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionProperties;
