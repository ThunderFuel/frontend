import Button from "components/Button";
import { IconEthereum, IconListed } from "icons";
import React from "react";
import "./MetadataTable.css";

const MetadataTable = ({ metadata }: { metadata: any }) => {
  return (
    <div className="flex flex-col border border-gray rounded-[5px]">
      <h6 className="pl-5 pt-[15px] pb-[17px] border-b border-gray">Metadata</h6>
      <table className="table table-auto">
        <thead>
          <tr>
            <th>TRAIT</th>
            <th>NAME</th>
            <th>TRAIT FLOOR</th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((item: any) => (
            // eslint-disable-next-line react/jsx-key
            <div className="group overflow-hidden relative transition-[height] h-[58px] duration-1000 ease-in-out hover:bg-bg-light hover:h-[99px]">
              <tr>
                <td>{item.trait} </td>
                <td>{item.name} </td>
                <td className="flex items-center">
                  {item.floor} <IconEthereum width="20px" color="#838383" />
                </td>
              </tr>
              <Button className="btn-secondary  no-bg text-headlineMd text-white w-full delay-300 transition-opacity duration-1000  ease-in-out opacity-0 group-hover:opacity-100  border-none rounded-none py-[11.5px]">
                LIST AT TRAIT FLOOR <IconListed height="18px" width="18px" />
              </Button>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetadataTable;
