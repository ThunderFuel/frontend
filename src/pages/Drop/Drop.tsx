import React from "react";
import TextImage, { TextImageAlign } from "./components/TextImage";
import Banner from "./components/Banner/Banner";

const Drop = () => {
  return (
    <div className="flex flex-col gap-5 px-10 py-5">
      <h1 className="text-drop-title text-white">The Poser Party</h1>
      <Banner />
      <TextImage />
      <TextImage align={TextImageAlign.Right} />
    </div>
  );
};

export default Drop;
