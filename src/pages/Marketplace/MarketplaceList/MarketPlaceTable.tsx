import React from "react";
import Table, { ITableHeader } from "components/Table";
import EthereumPrice from "components/EthereumPrice";

import { IconUpRight } from "icons";
import clsx from "clsx";
import { useMarketplace } from "../MarketplaceContext";
import Favorite from "./components/Favorite";
import Footer from "./components/Footer";
import Collection from "./components/Collection";

const NftImages = React.memo(({ images }: { images: any[] }) => {
  return (
    <ul className="py-2.5 px-4 flex gap-2">
      {images.map((image, i) => (
        <li key={i}>
          <img src={image} alt={i.toString()} />
        </li>
      ))}
    </ul>
  );
});
NftImages.displayName = "NftImages";

const Change = ({ change }: { change: any }) => {
  const className = change < 0 ? "text-red" : "text-green";

  return (
    <div className="flex items-center">
      <h5 className={clsx("text-h5", className)}>{change}</h5>
      <IconUpRight className={className} />
    </div>
  );
};
Change.displayName = "Change";

const MarketPlaceTable = ({ items = [] }: { items: any[] }) => {
  const { dayTabValue } = useMarketplace();

  const headers: ITableHeader[] = [
    {
      key: "collection",
      text: "COLLECTION",
      render: (item) => <Collection image={item.image} title={item.collection} />,
    },
    {
      key: "volume",
      text: `VOLUME (${dayTabValue?.text})`,
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.volume} />,
    },
    {
      key: "change",
      text: "CHANGE",
      width: "10%",
      align: "flex-end",
      render: (item) => <Change change={item.change} />,
    },
    {
      key: "floor",
      text: "FLOOR",
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.floor} />,
    },
    {
      key: "sales",
      text: "SALES",
      width: "10%",
      align: "flex-end",
    },
    {
      key: "lastSold",
      text: "LAST SOLD",
      render: (item) => <NftImages images={item.images} />,
    },
    {
      key: "favorite",
      text: "",
      width: "5%",
      align: "center",
      render: (item) => <Favorite item={item} />,
    },
  ];

  return <Table theadClassName={"sticky top-[110px]"} headers={headers} items={items} footer={<Footer />} />;
};

export default MarketPlaceTable;
