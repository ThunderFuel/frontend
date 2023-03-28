import { IconToken } from "icons";
import React from "react";

interface ICollectionsItem {
  name: string;
  creatorImage: string;
}

const CollectorsItem = ({ name, creatorImage }: ICollectionsItem) => {
  return (
    <div className="flex flex-col border border-gray rounded-[10px]">
      <div className="flex py-2.5 px-[15px] gap-2.5  border-b border-gray">
        <img src={creatorImage} className="h-[72px] w-[72px] rounded-[3px]" />
        <div className="flex flex-col justify-between">
          <h6 className="text-head6 font-spaceGrotesk">{name}</h6>
          <div className="flex items-center gap-1 border border-gray rounded-[5px] p-[6px]">
            <IconToken />
            <div className="text-bodyMd font-spaceGrotesk">Have 5 items</div>
          </div>
        </div>
      </div>
      <div className="flex py-2.5 px-[15px] gap-2.5">
        <img src={creatorImage} className="h-20 w-20 rounded-[5px]" />
        <img src={creatorImage} className="h-20 w-20 rounded-[5px]" />
        <img src={creatorImage} className="h-20 w-20 rounded-[5px]" />
      </div>
    </div>
  );
};

export default CollectorsItem;
