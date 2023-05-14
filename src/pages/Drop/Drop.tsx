import React from "react";
import Banner from "./components/Banner/Banner";
import DropDetailProvider from "./DropContext";
import About from "./components/About/About";
import Blocks from "./components/Blocks";

import "./Drop.css";
import Team from "./components/Team";

const Drop = () => {
  return (
    <DropDetailProvider>
      <div className="flex flex-col gap-5 py-5">
        <div className="px-10 flex flex-col gap-5">
          <h1 className="text-drop-title text-white">The Poser Party</h1>
          <Banner />
          <About />
        </div>
        <Blocks />
        <div className="mt-20 px-10">
          <Team />
        </div>
      </div>
    </DropDetailProvider>
  );
};

export default Drop;
