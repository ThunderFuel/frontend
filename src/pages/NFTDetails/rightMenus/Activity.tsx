import React from "react";
import { IconClock, IconOffer } from "icons";
import Filter from "../components/Filter";
import RightMenu from "../components/RightMenu";

const Box = () => {
  return (
    <div className="flex flex-col border border-gray rounded-lg text-head6 font-spaceGrotesk text-white">
      <div className="flex p-[15px] gap-x-[15px]">
        <div className="h-fit rounded-full bg-gray p-[6px]">
          <IconOffer width="20px" height="20px" />
        </div>
        <div className="flex flex-col gap-y-[10px]">
          <span>0.99 ETH Bid placed by 09x910 to 129x188</span>
          <div className="flex items-center p-[6px] gap-x-1 border text-bodyMd border-gray rounded-[5px]">
            <IconClock width="15px" />
            16 Oct 2022, 12:00 PM GMT+2
          </div>
        </div>
      </div>
    </div>
  );
};

const Activity = () => {
  return (
    <RightMenu title="Activity">
      <Filter />
      <div className="flex flex-col mt-[10px] gap-y-[10px]">
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </div>
    </RightMenu>
  );
};

export default Activity;
