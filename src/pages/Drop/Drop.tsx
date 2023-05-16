import React from "react";
import Banner from "./components/Banner/Banner";
import DropDetailProvider from "./DropContext";
import About from "./components/About/About";
import Blocks from "./components/Blocks";

import "./Drop.css";
import Team from "./components/Team";
import Roadmap from "./components/Roadmap";
import Title from "./components/Title";
import Tab from "./components/Tab";
import FAQ from "./components/FAQ";

const Drop = () => {
  return (
    <DropDetailProvider>
      <div className="flex flex-col gap-5 py-5">
        <div className="px-10 flex flex-col gap-5">
          <Title />
          <Banner />
          <About />
        </div>
        <Blocks />
        <div className="mt-10 px-10">
          <Tab className="text-white">
            <Tab.Item title="Meet the Team">
              <Team />
            </Tab.Item>
            <Tab.Item title="Road Map">
              <Roadmap />
            </Tab.Item>
            <Tab.Item title="FAQ">
              <FAQ />
            </Tab.Item>
          </Tab>
        </div>
      </div>
    </DropDetailProvider>
  );
};

export default Drop;
