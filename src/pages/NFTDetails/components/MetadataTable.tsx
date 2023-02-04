import Button from "components/Button";
import EthereumPrice from "components/EthereumPrice";
import { IconListed } from "icons";
import React from "react";
import "./MetadataTable.css";

const MetadataTable = ({ metadata, traitfloors }: { metadata: any; traitfloors: any }) => {
  return (
    <div className="flex flex-col border border-gray rounded-[5px]">
      <h6 className="pl-5 py-4 border-b border-gray">Metadata</h6>
      <div className="table-head grid-cols-3">
        <div className="text-headline-01">TRAIT</div>
        <div className="text-headline-01">NAME</div>
        <div className="text-headline-01">TRAIT FLOOR</div>
      </div>

      {metadata.map((item: any, i: number) => {
        return (
          <div className="group" key={i}>
            <div className="table-body grid-cols-3 cursor-pointer">
              <div>{item.traitType} </div>
              <div className="text-white">{item.value}</div>
              <div>
                <div className="flex-center">
                  <EthereumPrice priceClassName="text-head6 text-white" price={traitfloors.find((trait: any) => trait.traitType === item.traitType)?.price ?? "-"} />
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex justify-center delay-300 transition-all duration-1000 ease-in-out opacity-0 h-0 group-hover:opacity-100 group-hover:h-10">
              <Button className="btn-secondary text-headline-02 border-none rounded-none py-3">
                LIST AT TRAIT FLOOR <IconListed className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetadataTable;
