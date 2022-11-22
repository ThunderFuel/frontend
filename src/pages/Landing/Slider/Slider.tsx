import React from "react";
import "./Slider.css";
import { IconArrowRight, IconDiscord, IconLightning } from "../../../icons";
import Button from "../../../components/Button";

const Slider = () => {
  return (
    <div className="slider-container">
      <div className="container relative z-10 flex flex-col">
        <div className="mt-[]">
          <div className="text-headlineMd font-bigShoulderDisplay flex gap-1">
            EXPLORE, CREATE AND TRADE
            <span className="slider-catchword">ON FUEL</span>
            <IconLightning className="text-green-light" />
          </div>
          <h1 className="text-head1 mt-7">The Superior NFT Experience</h1>
          <div className="font-spaceGrotesk text-bodyLg mt-7 lg:w-[400px]">
            No more multi step signings. Thunder enables bulk executions in a single transaction.
          </div>
          <div className="mt-10 flex flex-col lg:flex-row gap-2.5">
            <Button className="">
              START CREATING WITH THUNDER
              <IconArrowRight />
            </Button>
            <Button className="btn-secondary">
              joın communıty
              <IconDiscord />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
