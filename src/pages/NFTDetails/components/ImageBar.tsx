import React, { useState } from "react";
import { IconFullscreen, IconLike, IconRefresh, IconShare, IconTransfer } from "icons";
import { useAppSelector } from "store";

const icons = [IconTransfer, IconFullscreen, IconRefresh, IconShare];

const ImageBar = () => {
  const [liked, setLiked] = useState(false);

  const { isOwner } = useAppSelector((state) => state.nftdetails);

  return (
    <div className="flex w-fit flex-col gap-5 ">
      <div className="border border-gray rounded-md p-2 text-gray-light group cursor-pointer" onClick={() => setLiked(!liked)}>
        <IconLike className={`group-hover:stroke-white ${liked ? "stroke-white fill-white" : ""}`} stroke="#838383" />
      </div>
      <div className="flex flex-col border border-gray rounded-md [&>*:nth-child(2)]:border-y [&>*:nth-child(2)]:border-gray ">
        {icons.map((icon, key) => {
          const IconItem = icon;
          if (!isOwner && icon === IconTransfer) return null;

          return (
            <a className="p-2 group cursor-pointer" key={key}>
              <IconItem className="group-hover:text-white text-[#838383]" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ImageBar;
