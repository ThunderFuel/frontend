import React from "react";
import Table, { ITableHeader } from "components/Table";
import { useCollectionContext } from "../../CollectionContext";

const CollectionTable = () => {
  const { collections } = useCollectionContext();
  const headers: ITableHeader[] = [
    {
      key: "collection",
      text: "Collection",
    },
    {
      key: "price",
      text: "Price",
    },
    {
      key: "lastSale",
      text: "Last Sale",
    },
    {
      key: "owner",
      text: "Owner",
    },
    {
      key: "timeListed",
      text: "Time Listed",
    },
  ];

  return (
    <div>
      <Table headers={headers} items={collections} />
    </div>
  );
};

export default CollectionTable;
