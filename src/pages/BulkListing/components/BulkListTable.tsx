import React, { useState } from "react";
import Table, { ITableHeader } from "components/Table/Table";
import EthereumPrice from "components/EthereumPrice";
import Checkbox from "components/CheckBox/Checkbox";
import InputEthereum from "components/InputEthereum";
import Img from "components/Img";
import { AssetCollectionProfileImage } from "assets";

const Collection = ({ image }: { image?: any; title: string }) => {
  return (
    <div className="p-4 flex items-center gap-5">
      <div className="w-14 h-14 overflow-hidden rounded-md">
        <Img src={image ?? AssetCollectionProfileImage} className="w-full" />
      </div>
      <div className="flex-1 w-full">
        <div className="body-medium text-gray-light">CLONE X - X TAKASHI MCLONE X - X TAKASHI M</div>
        <h6 className="text-h6 text-white">CloneX #2725</h6>
      </div>
    </div>
  );
};

const BulkListTable = () => {
  const [items, setItems] = useState<any[]>([]);
  const onSelect = (a: any) => {
    console.log(a);
  };

  const headers: ITableHeader[] = [
    {
      key: "selection",
      text: "",
      render: (collection) => (
        <div className="p-6">
          <Checkbox checked={collection.isSelected} onChange={() => onSelect(collection)} />
        </div>
      ),
      width: "64px",
    },
    {
      key: "item",
      text: "ITEM",
      width: "25%",
      render: (item) => <Collection image={item.image} title={item.collection} />,
    },
    {
      key: "floor",
      text: "floor prıce",
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.floor} />,
    },
    {
      key: "topTrait",
      text: "top traıt",
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.topTrait} />,
    },
    {
      key: "listedAt",
      text: "lısted at",
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.listedAt} />,
    },
    {
      key: "proceed",
      text: "proceed",
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice price={item.proceed} />,
    },
    {
      key: "price",
      text: "your prıce",
      align: "flex-end",
      render: () => (
        <div className="px-3">
          <InputEthereum placeholder="0" />
        </div>
      ),
    },
  ];

  const fetchItems = async () => {
    const items = [1, 2, 3].map((item) => {
      return {
        id: item,
        listedAt: 5,
        proceed: 13,
        floor: 123.5,
        topTrait: 4,
      };
    });

    return setItems(items);
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  return <Table containerFluidClassName={"-mx-5 !w-auto"} headers={headers} items={items} />;
};

export default BulkListTable;
