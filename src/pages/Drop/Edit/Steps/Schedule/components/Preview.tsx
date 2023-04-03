import React from "react";
import Table, { ITableHeader } from "components/Table/Table";
import EthereumPrice from "../../../../../../components/EthereumPrice";
import { IconWallet } from "../../../../../../icons";

const Phase = () => {
  return (
    <div className="flex flex-col gap-2.5 p-4">
      <div className="flex items-center gap-4 text-white">
        <h6 className="text-h6">Public Mint</h6>
        <div className="flex gap-1">
          <EthereumPrice priceClassName="text-h6" price={0.08} />
          <h6 className="flex-center text-h6">
            2
            <IconWallet />
          </h6>
        </div>
      </div>
      <div className="body-medium text-gray-light">12.01.2022 - 06:00</div>
    </div>
  );
};

const Preview = () => {
  const headers: ITableHeader[] = [
    {
      key: "phase",
      text: "Phase",
      render: () => <Phase />,
    },
    {
      key: "supply",
      text: "Supply",
      width: "25%",
      align: "flex-end",
      render: (row) => <h5 className="text-h5">{row.supply}</h5>,
    },
    {
      key: "estVal",
      text: "est val",
      width: "25%",
      align: "flex-end",
      render: () => <EthereumPrice price={16} />,
    },
  ];

  return (
    <div className="pt-4">
      <div className="border border-gray rounded-md">
        <div className="border-b border-b-gray p-5">
          <h6 className="text-h6">Preview</h6>
        </div>
        <Table headers={headers} items={[{ phase: "", supply: 2000, estVal: 1 }]} containerFluidClassName="!px-5" />
      </div>
    </div>
  );
};

export default Preview;
