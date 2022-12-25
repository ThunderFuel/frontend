import React from "react";
import { openInNewTab } from "utils";

import Slider from "./Slider/Slider";
import Container from "./Container/Container";
import Header from "./Header";
import Footer from "../Layout/Footer";

const Landing = () => {
  return (
    <main className="bg-bg min-h-screen flex flex-col">
      <div className="py-2.5 w-full font-bigShoulderDisplay text-headlineSm uppercase bg-gray text-center text-white">
        Join us to be a creator -{" "}
        <span
          className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:border-b after:border after:w-full"
          onClick={() => openInNewTab("https://forms.gle/d9sYqvXaF2PoHNvc7")}
        >
          APPLY NOW
        </span>
      </div>
      <Header />
      <div className="pt-16">
        <div className="flex flex-col w-full gap-16">
          <Slider />
          <Container />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Landing;
