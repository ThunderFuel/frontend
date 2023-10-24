import React from "react";
import Table, { ITableHeader } from "components/Table/Table";
import EthereumPrice from "components/EthereumPrice";
import Checkbox from "components/CheckBox/Checkbox";
import InputEthereum from "components/InputEthereum";
import Img from "components/Img";
import { useAppDispatch } from "store";
import { toggleSelectedUID } from "store/bulkListingSlice";
import clsx from "clsx";

const Collection = ({ item }: any) => {
  return (
    <div className="p-4 flex items-center gap-5">
      <div className="w-14 h-14 overflow-hidden rounded-md">
        <Img src={item?.image} className="w-full" />
      </div>
      <div className="flex-1 w-full">
        <div className="body-medium text-gray-light">{item?.collectionName}</div>
        <h6 className="text-h6 text-white">{item?.name}</h6>
      </div>
    </div>
  );
};

const BulkListTable = ({ items, prices, onUpdatePrice }: any) => {
  const dispatch = useAppDispatch();
  const onSelect = (selectedItem: any) => {
    dispatch(toggleSelectedUID(selectedItem));
  };

  const headers: ITableHeader[] = [
    {
      key: "selection",
      text: "",
      render: (collection) => {
        return (
          <div className="p-6">
            <Checkbox
              checked={collection.isChecked}
              onClick={() => {
                onSelect(collection);
              }}
            />
          </div>
        );
      },
      width: "64px",
    },
    {
      key: "item",
      text: "ITEM",
      width: "250px",
      render: (item) => <Collection item={item} />,
    },
    {
      key: "floor",
      text: "floor prıce",
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice isNull={true} price={item.floor} />,
    },
    {
      key: "topTrait",
      text: "top traıt",
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice isNull={true} price={item.topTrait} />,
    },
    {
      key: "listedAt",
      text: "lısted at",
      width: "10%",
      align: "flex-end",
      render: (item) => <EthereumPrice isNull={true} price={item.price} />,
    },
    {
      key: "proceed",
      text: "proceed",
      align: "flex-end",
      render: (item) => <EthereumPrice className={clsx(item?.proceedPrice && "text-green")} price={item?.proceedPrice} />,
    },
    {
      key: "price",
      text: "your prıce",
      align: "flex-end",
      width: "250px",
      render: (item) => {
        return (
          <div className="px-3">
            <InputEthereum
              placeholder="0"
              value={prices?.[item.uid]}
              onChange={(value: any) => {
                onUpdatePrice(item.uid, value);
              }}
            />
          </div>
        );
      },
    },
  ];

  return <Table containerFluidClassName={"-mx-5 !w-auto"} headers={headers} items={items} />;
};

export default BulkListTable;
