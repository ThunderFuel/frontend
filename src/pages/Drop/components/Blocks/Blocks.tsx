import React from "react";
import { useDropDetailContext } from "../../Detail/DetailContext";
import { BLOCK_TYPE } from "api/drop/drop.service";
import ImageText from "./ImageText";
import SingleImage from "./SingleImage";
import VideoText from "./VideoText";
import InfiniteGallery from "./InfiniteGallery";
import SingleVideo from "./SingleVideo";

const Blocks = () => {
  const { dropDetail } = useDropDetailContext();
  if (!dropDetail?.blocks) {
    return null;
  }
  const getComponent = (block: any, k: number) => {
    switch (block.type) {
      case BLOCK_TYPE.ImageText:
        return <ImageText key={k} image={block.image} title={block.title} text={block.text} reverse={block.reverse} />;
      case BLOCK_TYPE.VideoText:
        return <VideoText key={k} image={block.image} video={block.video} title={block.title} text={block.text} reverse={block.reverse} />;
      case BLOCK_TYPE.SingleImage:
        return <SingleImage key={k} image={block.image} />;
      case BLOCK_TYPE.InfinityBlock:
        return <InfiniteGallery key={k} images={block.images} hidden={block.hidden} />;
      case BLOCK_TYPE.SingleVideo:
        return <SingleVideo key={k} image={block.image} video={block.video} />;
      default:
        return <div key={k} />;
    }
  };

  return <>{dropDetail?.blocks.map((block: any, k: number) => getComponent(block, k))}</>;
};

export default Blocks;
