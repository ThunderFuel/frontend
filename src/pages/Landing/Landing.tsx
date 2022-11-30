import React from "react";
import Slider from "./Slider/Slider";
import Container from "./Container/Container";
import Footer from "./Footer/Footer";

const Landing = () => {
  return (
    <div className="flex flex-col w-full gap-16">
      <Slider />
      <Container />
      <Footer />
    </div>
  );
};

export default Landing;
