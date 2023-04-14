import React from "react";
import EthereumPrice from "../../../components/EthereumPrice";

interface ICollectionProperties {
  volume: number;
  floor: number;
  listedCount: number;
  ownerCount: number;
}

const CollectionProperties = ({ volume, floor, listedCount, ownerCount }: ICollectionProperties) => {
  const items = [
    {
      name: "total volume",
      component: <EthereumPrice priceClassName={"text-h4 text-white"} price={volume} />,
    },
    {
      name: "floor",
      component: <EthereumPrice priceClassName={"text-h4 text-white"} price={floor} />,
    },
    {
      name: "lısted",
      component: <h4 className="text-h4 text-white">{listedCount}</h4>,
    },
    {
      name: "owners",
      component: <h4 className="text-h4 text-white">{ownerCount}</h4>,
    },
  ];

  return (
    <div>
      <ul className="inline-flex border border-gray rounded-md">
        {items.map((item) => (
          <li key={item.name} className="flex flex-col gap-2 px-4 pt-3 pb-1 border-l border-l-gray first:border-none text-gray-light hover:text-white cursor-pointer">
            <div className="text-headline-01 uppercase whitespace-nowrap">{item.name}</div>
            {item.component}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionProperties;
