import Marquee from "react-fast-marquee";
import Img from "../../../../../components/Img/Img";
import React from "react";

const Gallery = ({ images }: any) => {
  return (
    <Marquee className="flex gap-5" pauseOnHover={true}>
      <div className="flex gap-5">
        {images.map((item: any, k: number) => (
          <Img className="w-72 h-72" key={`${k}`} src={item} />
        ))}
      </div>
    </Marquee>
  );
};

export default Gallery;
