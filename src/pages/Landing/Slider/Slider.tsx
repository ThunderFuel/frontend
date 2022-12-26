import React from "react";
import "./Slider.css";
import { IconArrowRight, IconDiscord, IconLightning } from "../../../icons";
import Button from "../../../components/Button";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 600 });

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const onClickUrl =
  (url: string): (() => void) =>
  () =>
    openInNewTab(url);

const Slider = () => {
  return (
    <div className="slider-container">
      <div data-aos="fade-up" className="container relative z-10 flex flex-col">
        <div className="mt-[]">
          <div className="text-headline-02 flex gap-1">
            EXPLORE, CREATE AND TRADE
            <span className="slider-catchword">ON FUEL</span>
            <IconLightning className="text-green-light" />
          </div>
          <h1 className="text-h1 mt-7">The Superior NFT Experience</h1>
          <div className="font-spaceGrotesk text-bodyLg mt-7 lg:w-[400px]">
            No more multi step signings. Thunder enables bulk executions in a single transaction.
          </div>
          <div className="mt-10 flex flex-col lg:flex-row gap-2.5">
            <Button className="" onClick={() => openInNewTab("https://forms.gle/d9sYqvXaF2PoHNvc7")}>
              START CREATING WITH THUNDER
              <IconArrowRight />
            </Button>
            <Button className="btn-secondary" onClick={() => openInNewTab("https://discord.gg/thundernftmarket")}>
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
