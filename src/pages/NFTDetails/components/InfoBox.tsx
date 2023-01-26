import { IconInfo } from "icons";
import React from "react";

const InfoBox = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex bg-gray gap-x-[15px] p-[15px] text-head6 font-spaceGrotesk text-white rounded-md">
      <IconInfo />
      <div className="flex w-full flex-col gap-y-[5px]">
        {title}
        <span className="text-bodyMd text-gray-light">{description}</span>
      </div>
    </div>
  );
};

export default InfoBox;
