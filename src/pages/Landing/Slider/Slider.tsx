import React from "react";
import { openInNewTab } from "utils";

import "./Slider.css";
import { IconArrowRight, IconDiscord, IconLightning } from "icons";
import Button from "components/Button";

import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../router/config/paths";
import { DISCORD_URL } from "global-constants";

AOS.init({ duration: 600 });

const Slider = () => {
  const navigate = useNavigate();

  return (
    <div className="slider-container">
      <div data-aos="fade-up" className="container-fluid relative z-10 flex flex-col">
        <div className="">
          <div className="text-headline-02 flex gap-1">
            EXPLORE, CREATE AND TRADE
            <span className="slider-catchword">ON FUEL</span>
            <IconLightning className="text-green-light" />
          </div>
          <h1 className="text-h1 mt-7">The Superior NFT Experience</h1>
          <div className="body-large mt-7 lg:w-[400px]">No more multi step signings. Thunder enables bulk executions in a single transaction.</div>
          <div className="mt-10 flex flex-col lg:flex-row gap-2.5">
            <Button className="" onClick={() => navigate(PATHS.MARKETPLACE)}>
              GO TO MARKETPLACE
              <IconArrowRight />
            </Button>
            <Button className="btn-secondary" onClick={() => openInNewTab(DISCORD_URL)}>
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
