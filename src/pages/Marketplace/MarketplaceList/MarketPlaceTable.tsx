import React from "react";
import Table, { ITableHeader } from "components/Table";
import EthereumPrice from "components/EthereumPrice";
import Img from "components/Img";

import { IconUpRight } from "icons";
import clsx from "clsx";
import { useMarketplace } from "../MarketplaceContext";
import Favorite from "./components/Favorite";
import Footer from "./components/Footer";
import Collection from "./components/Collection";
import { AssetCollectionItem0 } from "assets";
import { useNavigate } from "react-router-dom";
import { PATHS } from "router/config/paths";
import { numberFormat } from "utils";

const NftImages = React.memo(({ images }: { images: any[] }) => {
  const tmpImages = images.slice(0, 5);

  return (
    <ul className="py-2.5 px-4 flex gap-2">
      {tmpImages.map((image, i) => (
        <li key={i} className="w-14 h-14">
          <Img src={image} alt={i.toString()} defaultImage={AssetCollectionItem0} />
        </li>
      ))}
    </ul>
  );
});
NftImages.displayName = "NftImages";

const Change = ({ change }: { change: any }) => {
  const isNull = change === 0 || change === null;
  const className = isNull ? "text-white" : change < 0 ? "text-red" : "text-green";

  return (
    <div className="flex items-center">
      <h5 className={clsx("text-h5", className)}>{change ?? "-"}</h5>
      {!isNull && <IconUpRight className={className} />}
    </div>
  );
};
Change.displayName = "Change";

const MarketPlaceTable = ({ items = [] }: { items: any[] }) => {
  const navigate = useNavigate();
  const { dayTabValue, addWatchList } = useMarketplace();

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
      render: (item) => <EthereumPrice price={numberFormat(item.volume)} />,
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
      render: (item) => <Favorite item={item} onChange={(value: boolean) => onAddWatchList(item, value)} />,
    },
  ];

  const onAddWatchList = async (item: any, value: any) => {
    console.log(value);
    await addWatchList({ collectionId: item.id, userId: 16 });
  };
  const onClick = (item: any) => {
    navigate(PATHS.COLLECTION.replace(":collectionId", item.id));
  };

  return <Table onClick={onClick} theadClassName={"sticky top-[110px]"} headers={headers} items={items} footer={<Footer />} />;
};

export default MarketPlaceTable;
