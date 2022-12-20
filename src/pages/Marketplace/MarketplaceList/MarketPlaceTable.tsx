import React, { useState } from "react";
import Table, { ITableHeader } from "components/Table";
import Button from "components/Button";
import { IconArrowRight, IconEthereum, IconStar, IconUpRight } from "icons";
import clsx from "clsx";
import { useMarketplace } from "../MarketplaceContext";

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

const Footer = React.memo(() => {
  return (
    <Button className="btn-secondary btn-sm w-full">
      view all <IconArrowRight />
    </Button>
  );
});
Footer.displayName = "Footer";

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

const Favorite = ({ item }: { item: any }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(item.favorite ?? false);

  return (
    <div className="cursor-pointer" onClick={() => setIsFavorite((value: boolean) => !value)}>
      <IconStar className={clsx("hover:fill-gray", isFavorite ? "fill-white hover:fill-white" : "text-gray")} />
    </div>
  );
};
Favorite.displayName = "Favorite";

const MarketPlaceTable = ({ items = [] }: { items: any[] }) => {
  const { dayTabValue } = useMarketplace();

  const headers: ITableHeader[] = [
    {
      key: "collection",
      text: "COLLECTION",
      render: (item) => (
        <div className="p-4 flex items-center gap-5">
          <img src={item.image} loading="lazy" alt={""} />
          <h6 className="text-h6">{item.collection}</h6>
        </div>
      ),
    },
    {
      key: "volume",
      text: `VOLUME (${dayTabValue}H)`,
      width: "10%",
      align: "flex-end",
      render: (item) => (
        <div className="p-4 flex items-center">
          <h6 className="text-h5">{item.volume}</h6>
          <IconEthereum className="text-gray-light" />
        </div>
      ),
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
      render: (item) => (
        <div className="p-4 flex items-center">
          <h6 className="text-h5">{item.floor}</h6>
          <IconEthereum className="text-gray-light" />
        </div>
      ),
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

  return <Table containerClassName={"container"} headers={headers} items={items} footer={<Footer />} />;
};

export default MarketPlaceTable;
