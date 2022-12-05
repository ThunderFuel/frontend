import React from "react";

const NftImages = ({ images }: { images: any[] }) => {
  return (
    <ul className="flex gap-2">
      {images.map((image, i) => (
        <li key={i}>
          <img src={image} alt={i.toString()} />
        </li>
      ))}
    </ul>
  );
};

export default NftImages;
