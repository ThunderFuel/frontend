import React from "react";
import { IconLayoutArrowDown } from "icons";
import {
  AssetLandingTimeline1Image,
  AssetLandingTimeline1Scroll,
  AssetLandingTimeline2Image,
  AssetLandingTimeline3Image,
  AssetLandingTimeline4Image,
} from "assets";

const Container = () => {
  return (
    <div className="border-t border-gray">
      <div className="container flex flex-col items-center py-[150px]">
        <IconLayoutArrowDown className="hidden lg:flex text-white" />
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20 lg:justify-center w-full mt-12">
          <div className="flex justify-between">
            <img alt="timeline-1-scroll" className="hidden lg:flex" src={AssetLandingTimeline1Scroll} loading="lazy" />
            <img alt="timeline-1-image" src={AssetLandingTimeline1Image} loading="lazy" />
          </div>
          <div className="text-white lg:pt-20">
            <div className="title-gradient">powered by fuel</div>
            <div className="px-5 py-7">
              <span className="text-bodyLg font-spaceGrotesk flex w-[320px]">
                Approve, list, buy as many NFTs with one single transaction thanks to parallel execution by Fuel.
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-col-reverse gap-12 lg:flex-row lg:gap-20 lg:justify-center w-full mt-72">
          <div className="flex justify-end lg:pt-20">
            <div className="text-white w-[440px]">
              <div className="title-gradient">REAL-TIME ANALYTICS</div>
              <div className="px-5 py-7">
                <span className="text-bodyLg font-spaceGrotesk flex w-[320px]">
                  Flip and trade like a pro. Maximize data utilization and get ahead of the curve.
                </span>
              </div>
            </div>
          </div>
          <img alt="timeline-2-image" src={AssetLandingTimeline2Image} loading="lazy" />
        </div>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20 lg:justify-center w-full mt-72">
          <div className="flex lg:justify-end">
            <img alt="timeline-3-image" src={AssetLandingTimeline3Image} loading="lazy" />
          </div>
          <div className="text-white lg:pt-20">
            <div className="title-gradient">SWEEP</div>
            <div className="px-5 py-7">
              <span className="text-bodyLg font-spaceGrotesk flex w-[320px]">
                Sweep across multiple collections with ease.
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-col-reverse gap-12 lg:flex-row lg:justify-center lg:gap-20 w-full mt-72">
          <div className="flex lg:justify-end lg:pt-20">
            <div className="text-white lg:w-[440px]">
              <div className="title-gradient">LOW FEEs</div>
              <div className="px-5 py-7">
                <span className="text-bodyLg font-spaceGrotesk flex w-[320px]">
                  Faster, cheaper, cooler. Collect NFTs instantly with the lowest fees.
                </span>
              </div>
            </div>
          </div>
          <img alt="timeline-2-image" src={AssetLandingTimeline4Image} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Container;
