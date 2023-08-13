import { IconInfo } from "icons";
import React from "react";

const InfoBox = ({ title, description }: { title?: string; description: string }) => {
  return (
    <div className="flex bg-gray gap-2 p-2.5 text-bodySm font-spaceGrotesk text-white rounded-[5px]">
      <IconInfo className="w-6 h-6" />
      <div className="flex w-full flex-col gap-y-[5px]">
        {title ? <h6 className="text-head6">{title}</h6> : <></>}
        <p className="w-full text-bodyMd text-white">{description}</p>
      </div>
    </div>
  );
};

export default InfoBox;
