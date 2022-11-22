import React from "react";
import Slider from "./Slider/Slider";
import Container from "./Container/Container";

const Landing = () => {
  return (
    <div className="flex flex-col w-full gap-16">
      <Slider />
      <Container />
    </div>
  );
};

export default Landing;
