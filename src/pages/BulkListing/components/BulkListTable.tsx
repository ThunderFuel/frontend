import React from "react";
import Table, { ITableHeader } from "components/Table/Table";
import EthereumPrice from "components/EthereumPrice";
import Checkbox from "components/CheckBox/Checkbox";
import InputEthereum from "components/InputEthereum";
import Img from "components/Img";
import { useAppDispatch } from "store";
import { toggleSelectedUID } from "store/bulkListingSlice";
import clsx from "clsx";
import { useIsMobile } from "../../../hooks/useIsMobile";

const Collection = ({ item }: any) => {
  return (
    <div className="flex items-center gap-5">
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

const MobileCollection = ({ item, onSelect, prices, onUpdatePrice }: any) => {
  return (
    <div className="flex items-center justify-between gap-2.5 px-4 py-2.5">
      <div className="flex gap-4 flex-1">
        <div className="pt-5">
          <Checkbox
            checked={item.isChecked}
            onClick={() => {
              onSelect(item);
            }}
          />
        </div>
        <div className="flex flex-1 gap-2.5">
          <div className="w-[64px] h-[64px] overflow-hidden rounded-md">
            <Img src={item?.image} className="w-full" />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex-1 w-full">
              <div className="body-medium text-gray-light">{item?.collectionName}</div>
              <h6 className="text-h6 text-white">{item?.name}</h6>
            </div>
            <InputEthereum
              className="lg:w-auto h-10"
              placeholder="0"
              value={prices?.[item.uid]}
              onChange={(value: any) => {
                onUpdatePrice(item.uid, value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileTableRow = ({ item }: any) => {
  return (
    <>
      <div className="grid grid-cols-4 px-5 py-2.5 border-b border-gray text-gray-light">
        <div className="text-headline-01 uppercase">floor prıce</div>
        <div className="text-headline-01 uppercase text-right">top trait</div>
        <div className="text-headline-01 uppercase text-right">loyalty</div>
        <div className="text-headline-01 uppercase text-right">proceed</div>
      </div>
      <div className="grid grid-cols-4 px-5 py-2.5 text-white">
        <div className="text-headline-01 uppercase">
          <EthereumPrice price={item.floor} />
        </div>
        <div className="text-headline-01 uppercase">
          <EthereumPrice className="justify-end" price={item.topTrait} />
        </div>
        <div className="text-headline-01 uppercase">
          <h5 className="text-h6 text-right">{item?.royalty}%</h5>
        </div>
        <div className="text-headline-01 uppercase text-right">
          <EthereumPrice className={clsx("justify-end", item?.proceedPrice && "text-green")} price={item?.proceedPrice} />
        </div>
      </div>
    </>
  );
};
const MobileTable = ({ items, onSelect, onUpdatePrices, prices }: any) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item: any, index: number) => {
        return (
          <div key={index} className="flex flex-col border border-gray rounded-2xl">
            <div className="border-b border-gray">
              <MobileCollection item={item} onSelect={onSelect} prices={prices} onUpdatePrices={onUpdatePrices} />
            </div>
            <MobileTableRow item={item} />
          </div>
        );
      })}
    </div>
  );
};

const ColumnTitle = ({ title, children }: any) => {
  return (
    <div className={"flex flex-col items-end gap-1"}>
      <div className="text-headline-01 text-gray-light uppercase">{title}</div>
      {children}
    </div>
  );
};
const BulkListTable = ({ items, prices, onUpdatePrice, theadClassName }: any) => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const onSelect = (selectedItem: any) => {
    dispatch(toggleSelectedUID(selectedItem));
  };

  if (isMobile) {
    return <MobileTable items={items} onSelect={onSelect} onUpdatePrice={onUpdatePrice} prices={prices} />;
  }

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
      width: "13%",
      align: "flex-end",
      render: (item) => (
        <ColumnTitle title={"floor prıce"}>
          <EthereumPrice price={item.floor} />
        </ColumnTitle>
      ),
    },
    {
      key: "topTrait",
      text: "top traıt",
      width: "13%",
      align: "flex-end",
      render: (item) => (
        <ColumnTitle title={"top trait"}>
          <EthereumPrice price={item.topTrait} />
        </ColumnTitle>
      ),
    },
    {
      key: "royalty",
      text: "royalty",
      width: "14%",
      align: "flex-end",
      render: (item) => (
        <ColumnTitle title="ROYALTY">{item?.royalty ? <h5 className="text-h5 text-white"> {item?.royalty}%</h5> : <h5 className="text-h5 text-white text-opacity-0"> 0</h5>}</ColumnTitle>
      ),
    },
    {
      key: "proceed",
      text: "proceed",
      align: "flex-end",
      render: (item) => (
        <ColumnTitle title="pROCEED">
          <EthereumPrice className={clsx(item?.proceedPrice && "text-green")} price={item?.proceedPrice} />
        </ColumnTitle>
      ),
    },
    {
      key: "price",
      text: "your price",
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

  return <Table containerFluidClassName={"-mx-5 !w-auto"} headers={headers} items={items} theadClassName={theadClassName} />;
};

export default BulkListTable;
