import React from "react";
import { IconEthereum } from "icons";

const CollectionProperties = () => {
  return (
    <div>
      <ul className="inline-flex border border-gray rounded-md">
        <li className="flex flex-col gap-2 px-4 py-3 border-l border-l-gray first:border-none text-gray-light hover:text-white cursor-pointer">
          <div className="text-headline-01 uppercase whitespace-nowrap">total volume</div>
          <div className="flex items-center">
            <h4 className="text-h4 text-white">28.33</h4>
            <IconEthereum />
          </div>
        </li>
        <li className="flex flex-col gap-2 px-4 py-3 border-l border-l-gray first:border-none text-gray-light hover:text-white cursor-pointer">
          <div className="text-headline-01 uppercase whitespace-nowrap">floor</div>
          <div className="flex items-center">
            <h4 className="text-h4 text-white">0.423</h4>
            <IconEthereum />
          </div>
        </li>
        <li className="flex flex-col gap-2 px-4 py-3 border-l border-l-gray first:border-none text-gray-light hover:text-white cursor-pointer">
          <div className="text-headline-01 uppercase whitespace-nowrap">lısted</div>
          <h4 className="text-h4 text-white">10%</h4>
        </li>
        <li className="flex flex-col gap-2 px-4 py-3 border-l border-l-gray first:border-none text-gray-light hover:text-white cursor-pointer">
          <div className="text-headline-01 uppercase whitespace-nowrap">owners</div>
          <h4 className="text-h4 text-white">2,123</h4>
        </li>
      </ul>
    </div>
  );
};

export default CollectionProperties;
