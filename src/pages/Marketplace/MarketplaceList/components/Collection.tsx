import React from "react";

const Collection = ({ image, title }: { image: any; title: string }) => {
  return (
    <div className="p-4 flex items-center gap-5">
      <img src={image} loading="lazy" alt={""} />
      <h6 className="text-h6 text-overflow">{title}</h6>
    </div>
  );
};

export default Collection;
