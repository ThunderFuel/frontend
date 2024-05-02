import React from "react";
import Img from "components/Img";
import clsx from "clsx";

const Collection = ({ image, title, onClick, children }: { image: any; title: string; onClick?: () => void; children?: any }) => {
  return (
    <div
      className={clsx("lg:px-4 flex items-center gap-2.5 lg:gap-5", onClick ? "cursor-pointer" : "")}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
      <div className="overflow-hidden rounded-lg lg:rounded-full">
        <Img src={image} className="w-8 h-8 lg:w-12 lg:h-12" />
      </div>
      <h6 className="text-h7 lg:text-h6 text-overflow max-w-[100px] lg:max-w-[200px]">{title}</h6>
    </div>
  );
};

export default Collection;
