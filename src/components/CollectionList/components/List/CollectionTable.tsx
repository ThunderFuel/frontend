import React from "react";
import Table, { ITableHeader } from "components/Table";
import Checkbox from "components/CheckBox";
import { add as cartAdd, remove as cartRemove } from "store/cartSlice";
import { useAppDispatch } from "store";
import { dateFormat } from "utils";
import { useCollectionListContext } from "../../CollectionListContext";
import Img from "components/Img";
import EthereumPrice from "components/EthereumPrice";
import clsx from "clsx";
import { add as bulkListingAdd, remove as bulkListingRemove } from "store/bulkListingSlice";

const Collection = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center gap-5 p-3.5 pl-0">
      <div className={clsx("min-w-[56px] max-w-[56px] aspect-square rounded-sm overflow-hidden flex-center bg-gray", item.isSelected ? "border border-white" : "")}>
        <Img className="h-full" alt={item.image} src={item.image} loading="lazy" />
      </div>
      <h6 className="text-h6 text-white">{item.name}</h6>
    </div>
  );
};

const UnSalableLabel = ({ children }: any) => {
  return <span className="text-headline-01 uppercase text-gray-light">{children}</span>;
};

const CollectionTable = () => {
  const dispatch = useAppDispatch();
  const { collectionItems, setSweep, options } = useCollectionListContext();

  const onToggleCart = (collection: any) => {
    if (!collection.isSelected) {
      dispatch(cartAdd(collection));
    } else {
      dispatch(cartRemove(collection.uid));
    }
  };
  const onToggleBulkListing = (collection: any) => {
    if (!collection.isSelected) {
      dispatch(bulkListingAdd(collection));
    } else {
      dispatch(bulkListingRemove(collection.uid));
    }
  };
  const onSelect = (collection: any) => {
    setSweep(0);

    if (options?.isProfile) {
      onToggleBulkListing(collection);
    } else {
      onToggleCart(collection);
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
      render: (item) => (item.price === null ? <UnSalableLabel>No Listing</UnSalableLabel> : <EthereumPrice price={item.price} />),
    },
    {
      key: "lastSale",
      text: "Last Sale",
      width: "15%",
      align: "flex-end",
      render: (item) => (item.lastSalePrice === null ? <UnSalableLabel>NO sale</UnSalableLabel> : <EthereumPrice price={item.lastSalePrice} />),
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
