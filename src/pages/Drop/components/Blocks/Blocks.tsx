import React from "react";
import { useDropDetailContext } from "../../DropContext";
import { BLOCK_TYPE } from "api/drop/drop.service";
import TextImage from "../TextImage";
import SingleImage from "../SingleImage";

const Blocks = () => {
  const { dropDetail } = useDropDetailContext();
  if (!dropDetail?.blocks) {
    return null;
  }
  const getComponent = (block: any) => {
    console.log(block);
    switch (block.type) {
      case BLOCK_TYPE.ImageText:
        return <TextImage image={block.image} title={block.title} text={block.text} reverse={block.reverse} />;
      case BLOCK_TYPE.SingleImage:
        return <SingleImage image={block.image} />;
      default:
        return <React.Fragment />;
    }
  };

  return <>{dropDetail?.blocks.map((block: any) => getComponent(block))}</>;
};

export default Blocks;
