import React from "react";
import TextImage, { TextImageAlign } from "./components/TextImage";

const Drop = () => {
  return (
    <div>
      <TextImage />
      <TextImage align={TextImageAlign.Right} />
    </div>
  );
};

export default Drop;
