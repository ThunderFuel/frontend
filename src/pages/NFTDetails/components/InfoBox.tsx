import { IconInfo } from "icons";
import React from "react";

const InfoBox = ({ title, description }: { title?: string; description: string }) => {
  return (
    <div className="flex bg-bg-light gap-x-[15px] p-[15px] text-bodySm font-spaceGrotesk text-white border-b border-gray">
      <IconInfo className="w-6 h-6" />
      <div className="flex w-full flex-col gap-y-[5px]">
        {title ? <h6 className="text-head6 font-spaceGrotesk">{title}</h6> : <></>}
        <p className="w-full text-bodySm text-gray-light">{description}</p>
      </div>
    </div>
  );
};

export default InfoBox;
