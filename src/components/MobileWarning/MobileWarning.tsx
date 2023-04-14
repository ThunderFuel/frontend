import { IconWarning } from "icons";
import React from "react";

const MobileWarning = () => {
  return (
    <div className="p-10 flex-center flex-1">
      <div className="flex bg-gray gap-x-[15px] p-[15px] text-bodySm font-spaceGrotesk text-white rounded-md">
        <IconWarning className="w-6 h-6" />
        <div className="flex w-full flex-col gap-y-[5px]">
          <h6 className="text-head6 font-spaceGrotesk">Mobile devices are not supported yet.</h6>
          <p className="w-full text-bodyMd text-gray-light">Please use a desktop device for the best experience of Thunder Marketplace.</p>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;
