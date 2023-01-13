import React from "react";
import { IconFullscreen, IconLike, IconRefresh, IconShare } from "icons";

const icons = [IconFullscreen, IconRefresh, IconShare];

const ImageBar = () => {
  return (
    <div className="flex w-fit flex-col gap-5 ">
      <a className="border border-gray rounded-md p-2 text-gray-light group cursor-pointer">
        <IconLike className="group-hover:stroke-white" stroke="#838383" />
      </a>
      <div className="flex flex-col border border-gray rounded-md [&>*:nth-child(2)]:border-y [&>*:nth-child(2)]:border-gray ">
        {icons.map((icon, key) => {
          const IconItem = icon;

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
