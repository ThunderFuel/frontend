import React from "react";

import Img from "components/Img";
import Marquee from "react-fast-marquee";

const InfiniteGallery = ({ images }: any) => {
  if (!images.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 w-full overflow-hidden">
      {images.map((items: any, i: number) => {
        return (
          <Marquee direction={i % 2 === 1 ? "right" : "left"} key={i} className="flex gap-5">
            <div className="flex gap-5">
              {items.map((item: any, k: number) => (
                <Img key={`${i}_${k}`} src={item} />
              ))}
            </div>
          </Marquee>
        );
      })}
    </div>
  );
};

export default InfiniteGallery;
