import React from "react";
import Table, { ITableHeader } from "components/Table";
import { useCollectionContext } from "../../CollectionContext";
import { IconEthereum } from "../../../../icons";

const Collection = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center gap-5 p-3.5">
      <img className="w-14 rounded-sm overflow-hidden" alt={item.image} src={item.image} loading="lazy" />
      <h6 className="text-h6 text-white">{item.collection}</h6>
    </div>
  );
};

const Price = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center">
      <h4 className="text-h4 text-white">{item.price}</h4>
      <IconEthereum className="text-gray-light" />
    </div>
  );
};

const CollectionTable = () => {
  const { collections } = useCollectionContext();
  const headers: ITableHeader[] = [
    {
      key: "selection",
      text: "",
      render: () => 1,
      width: "5%",
    },
    {
      key: "collection",
      text: "Collection",
      render: (item) => <Collection item={item} />,
    },
    {
      key: "price",
      text: "Price",
      width: "15%",
      align: "flex-end",
      render: (item) => <Price item={item} />,
    },
    {
      key: "lastSale",
      text: "Last Sale",
      width: "15%",
      align: "flex-end",
    },
    {
      key: "owner",
      text: "Owner",
      width: "20%",
      align: "flex-end",
    },
    {
      key: "timeListed",
      text: "Time Listed",
      width: "20%",
      align: "flex-end",
    },
  ];

  return <Table headers={headers} items={collections} />;
};

export default CollectionTable;
