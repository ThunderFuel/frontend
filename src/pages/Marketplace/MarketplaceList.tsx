import React, { useMemo } from "react";
import { useIsMobile } from "hooks/useIsMobile";
import CollectionTable, { ICollectionTableHeader } from "./components/CollectionTable/CollectionTable";
import Filter from "./components/Filter";
import Button from "components/Button";
import { AssetTable1Image, AssetTableImageNft1 } from "assets";
import { IconArrowRight, IconEthereum, IconStar } from "icons";
import NftImages from "./components/CollectionTable/NftImages";
import CollectionTableMobile from "./components/CollectionTable/CollectionTableMobile";

export interface MarketplaceListProps {
  itemCount: number;
}

const MarketplaceList = ({ itemCount }: MarketplaceListProps) => {
  const headers: ICollectionTableHeader[] = [
    {
      key: "collection",
      text: "COLLECTION",
      colspan: 2,
      render: (item) => (
        <div className="flex items-center gap-5">
          <img src={item.image} loading="lazy" />
          <h6 className="text-h6">{item.collection}</h6>
        </div>
      ),
    },
    {
      key: "volume",
      text: "VOLUME (24H)",
      render: (item) => (
        <div className="flex items-center">
          <h6 className="text-h5">{item.volume}</h6>
          <IconEthereum className="text-gray-light" />
        </div>
      ),
    },
    {
      key: "change",
      text: "CHANGE",
    },
    {
      key: "floor",
      text: "FLOOR",
      render: (item) => (
        <div className="flex items-center">
          <h6 className="text-h5">{item.floor}</h6>
          <IconEthereum className="text-gray-light" />
        </div>
      ),
    },
    {
      key: "sales",
      text: "SALES",
      render: (item) => <h5 className="text-h5">{item.sales}</h5>,
    },
    {
      key: "lastSold",
      text: "LAST SOLD",
      colspan: 2,
      render: (item) => <NftImages images={item.images} />,
    },
    {
      key: "favorite",
      text: "",
      render: () => <IconStar className="text-gray" />,
    },
  ];
  const items: any[] = [
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
    {
      collection: "CryptoPunks",
      volume: 123.21,
      floor: 123.21,
      image: AssetTable1Image,
      lastSold: "",
      images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
      sales: 1,
    },
  ];

  const pathname = window.location.pathname;

  const footer = useMemo(
    () => (
      <div>
        {pathname === "/marketplace" ? (
          <Button className="btn-secondary btn-sm w-full">
            view all <IconArrowRight />
          </Button>
        ) : (
          <Button className="btn-secondary btn-sm w-full">
            load more <IconArrowRight />
          </Button>
        )}
      </div>
    ),
    []
  );

  const slicedItems = items.slice(0, itemCount);

  return (
    <div>
      <Filter />

      {useIsMobile() ? (
        <CollectionTableMobile headers={headers} items={slicedItems} footerSlot={footer} />
      ) : (
        <CollectionTable headers={headers} items={slicedItems} footerSlot={footer} />
      )}
    </div>
  );
};

export default MarketplaceList;
