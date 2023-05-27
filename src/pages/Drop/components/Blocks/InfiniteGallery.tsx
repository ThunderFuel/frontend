import React from "react";

import Img from "components/Img";
import Marquee from "react-fast-marquee";
import { chunk } from "utils";

const InfiniteGallery = ({ images }: any) => {
  if (!images.length) {
    return null;
  }
  const imageList = chunk(images, 6);

  return (
    <div className="flex flex-col gap-5 w-full overflow-hidden">
      {imageList.map((image: any, i: number) => {
        return (
          <Marquee direction={i % 2 === 1 ? "right" : "left"} key={i} className="flex gap-5" pauseOnHover={true}>
            <div className="flex gap-5">
              {image.map((item: any, k: number) => (
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
