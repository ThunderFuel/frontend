import React from "react";
import Table, { ITableHeader } from "components/Table";
import { IconEthereum } from "icons";
import Checkbox from "components/CheckBox";
import { add, remove } from "store/cartSlice";
import { useAppDispatch, useAppSelector } from "store";
import { dateFormat } from "utils";
import { useCollectionListContext } from "../../CollectionListContext";
import Img from "components/Img";

const Collection = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center gap-5 p-3.5 pl-0">
      <div className="min-w-[56px] max-w-[56px] rounded-sm overflow-hidden">
        <Img className="w-full" alt={item.image} src={item.image} loading="lazy" />
      </div>
      <h6 className="text-h6 text-white">{item.name}</h6>
    </div>
  );
};

const Price = ({ price }: { price: any }) => {
  return (
    <div className="flex items-center">
      <h4 className="text-h5 text-white">{price}</h4>
      <IconEthereum className="text-gray-light" />
    </div>
  );
};

const CollectionTable = () => {
  const dispatch = useAppDispatch();
  const { collectionItems } = useCollectionListContext();
  const { items } = useAppSelector((state) => state.cart);

  const onSelect = (collection: any) => {
    if (!collection.isSelected) {
      if (items.find((item) => (item.uid = collection.uid)) === undefined) dispatch(add(collection));
    } else {
      dispatch(remove(collection.uid));
    }
  };

  const headers: ITableHeader[] = [
    {
      key: "selection",
      text: "",
      render: (collection) =>
        collection.salable && (
          <div className="p-6">
            <Checkbox checked={collection.isSelected} onClick={() => onSelect(collection)} />
          </div>
        ),
      width: "64px",
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
      render: (item) => <Price price={item.price ?? 0} />,
    },
    {
      key: "lastSale",
      text: "Last Sale",
      width: "15%",
      align: "flex-end",
      render: (item) => <Price price={item.lastSalePrice ?? 0} />,
    },
    {
      key: "owner",
      text: "Owner",
      width: "20%",
      align: "flex-end",
      render: (item) => <div className="cell text-h6 text-gray-light hover:text-white hover:underline">{item.owner ?? "-"}</div>,
    },
    {
      key: "listedTime",
      text: "Time Listed",
      width: "20%",
      align: "flex-end",
      render: (item) => {
        const listedTime = dateFormat(item.listedTime);

        return <Table.Cell>{listedTime}</Table.Cell>;
      },
    },
  ];

  return (
    <Table
      className="border-t border-t-gray"
      theadClassName={"sticky"}
      theadStyle={{ top: "calc(var(--headerHeight) + 68px)" }}
      rowClassName={"cursor-pointer"}
      headers={headers}
      items={collectionItems}
      onClick={onSelect}
      isSelectedRow={(item) => item.isSelected}
    />
  );
};

export default CollectionTable;
