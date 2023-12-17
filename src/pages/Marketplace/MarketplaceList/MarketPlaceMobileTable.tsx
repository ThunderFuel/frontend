import React from "react";

import Favorite from "./components/Favorite";
import Footer from "./components/Footer";
import { useMarketplace } from "../MarketplaceContext";
import EthereumPrice from "components/EthereumPrice";
import Collection from "./components/Collection";
import Change from "./components/Change";
import NftImages from "./components/NftImages";

const Cell = ({ title, value, children }: { title: string; value?: any; children?: any }) => {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className={"text-headline-01 text-gray-light uppercase"}>{title}</div>
      {children ?? <EthereumPrice price={value} />}
    </div>
  );
};

const MarketPlaceMobileTable = ({ items = [] }: { items: any[] }) => {
  const { dayTabValue, addWatchList } = useMarketplace();
  const onAddWatchList = async (item: any, value: any) => {
    await addWatchList({ collectionId: item.id, value });
  };

  return (
    <div className="container-fluid">
      <div className="flex flex-col gap-2.5 py-5 text-white">
        {items.map((item, k) => {
          return (
            <div className="border border-gray rounded-md" key={`row_${k.toString()}`}>
              <div className="flex items-center justify-between border-b border-b-gray p-5">
                <Collection image={item.image} title={item.collection} />
                <Favorite item={item} onChange={(value: boolean) => onAddWatchList(item, value)} />
              </div>
              <div className="flex flex-col">
                <div className="grid grid-cols-3">
                  <Cell title={`VOLUME (${dayTabValue?.text})`} value={item.volume} />
                  <Cell title={`floor  (${dayTabValue?.text})`} value={item.floor} />
                  <Cell title={`change (${dayTabValue?.text})`}>
                    <Change change={item.change} />
                  </Cell>
                </div>
                <div className="py-5">
                  <NftImages collectionItems={item.collectionItems} />
                </div>
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
