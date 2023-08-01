import React from "react";
import Gallery from "./Gallery";
import SingleVideo from "../../Blocks/SingleVideo";

const DroppedItem = ({ images, className }: any) => {
  const _image = images[0];
  const isVideo = _image.includes(".mp4");

  return <div className={className}>{!isVideo ? <Gallery images={images} /> : <SingleVideo image={""} video={_image} />}</div>;
};

export default DroppedItem;
