import React from "react";
import Img from "components/Img";

const Collection = ({ image, title }: { image: any; title: string }) => {
  return (
    <div className="p-4 flex items-center gap-5">
      <div className="overflow-hidden rounded-full">
        <Img src={image} className="w-12 h-12" />
      </div>
      <h6 className="text-h6 text-overflow">{title}</h6>
    </div>
  );
};

export default Collection;
