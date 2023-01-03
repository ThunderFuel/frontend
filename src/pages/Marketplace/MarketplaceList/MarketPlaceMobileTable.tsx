import React from "react";

import Favorite from "./components/Favorite";
import Footer from "./components/Footer";
import { useMarketplace } from "../MarketplaceContext";
import Price from "./components/Price";
import Collection from "./components/Collection";

const Cell = ({ title, value }: { title: string; value: any }) => {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className={"text-headline-01 text-gray-light uppercase"}>{title}</div>
      <Price price={value} />
    </div>
  );
};

const MarketPlaceMobileTable = ({ items = [] }: { items: any[] }) => {
  const { dayTabValue } = useMarketplace();

  return (
    <div className="container-fluid">
      <div className="flex flex-col gap-2 py-5 text-white">
        {items.map((item, k) => {
          return (
            <div className="border border-gray rounded-md" key={`row_${k.toString()}`}>
              <div className="flex items-center justify-between border-b border-b-gray">
                <Collection image={item.image} title={item.collection} />
                <Favorite className="p-5" item={item} />
              </div>
              <div className="grid grid-cols-2">
                <Cell title={`VOLUME (${dayTabValue?.text})`} value={item.volume} />
                <Cell title={`floor`} value={item.floor} />
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default MarketPlaceMobileTable;
