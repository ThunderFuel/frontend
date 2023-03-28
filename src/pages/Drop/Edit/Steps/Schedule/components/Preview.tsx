import React from "react";
import Table, { ITableHeader } from "components/Table/Table";

const Preview = () => {
  const headers: ITableHeader[] = [
    {
      key: "phase",
      text: "Phase",
    },
    {
      key: "supply",
      text: "Supply",
      width: "25%",
      align: "flex-end",
    },
    {
      key: "estval",
      text: "est val",
      width: "25%",
      align: "flex-end",
    },
  ];

  return (
    <div className="pt-4">
      <div className="border border-gray rounded-md">
        <div className="border-b border-b-gray p-5">
          <h6 className="text-h6">Preview</h6>
        </div>
        <Table headers={headers} items={[]} />
      </div>
    </div>
  );
};

export default Preview;
