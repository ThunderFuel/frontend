import React from "react";
import { useDropDetailContext } from "../../DropContext";

const Blocks = () => {
  const { dropDetail } = useDropDetailContext();
  console.log(dropDetail.blocks);

  return <div></div>;
};

export default Blocks;
