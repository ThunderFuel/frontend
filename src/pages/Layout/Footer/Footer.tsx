import React from "react";
import SocialMediaIcons from "pages/Layout/Header/SocialMediaIcons";
import { AssetLogo } from "assets";

const Footer = () => {
  return (
    <div className="flex flex-col bg-gray-dark lg:justify-center bg-bg-light w-full py-5 mt-10">
      {/* <div className="border-b border-b-gray pb-10 mb-5">
        <div className="container">
          <div className="lg:flex lg:items-start lg:justify-between">
            <div className="flex flex-col items-start lg:justify-center justify-start text-white">
              <h4 className="text-head4 font-spaceGrotesk">Subscribe to our newsletter</h4>
              <span className="text-bodyMd font-spaceGrotesk flex max-w-[335px] lg:max-w-[440px] mt-2 mb-7">
                Newsworthy headlines from across the metaverse, delivered straight to your inbox every week.
              </span>
              <div className="flex bg-bg items-center justify-between max-w-[335px] lg:max-w-[400px] w-full rounded-lg pl-5 pr-2.5 py-2.5">
                <input
                  className="text-gray-light h-[19px] text-bodyMd max-w-[192px] lg:max-w-[257px]"
                  type={"email"}
                  placeholder="E-mail Address"
                  style={{ background: "none", outline: "none" }}
                />
                <Button className="text-headlineMd py-3 px-4">SUBSCRIBE</Button>
              </div>
            </div>
            <div className="h-[1px] bg-gray my-[40px] lg:hidden" />
            <div className="flex flex-wrap gap-x-[55px] lg:gap-x-[160px] gap-y-[28px] lg:pt-3 lg:flex-nowrap ">
              <div className="flex flex-col max-w-[140px] gap-3">
                <h5 className="text-headline-01 text-gray-light mb-2">MARKETPLACE</h5>
                <a className="text-headline-01 text-white">EXPLORE</a>
                <a className="text-headline-01 text-white">SELL</a>
                <a className="text-headline-01 text-white">CREATE</a>
              </div>
              <div className="flex flex-col max-w-[140px] gap-3">
                <h5 className="text-headline-01 text-gray-light mb-2">MY ACCOUNT</h5>
                <a className="text-headline-01 text-white">PROFILE</a>
                <a className="text-headline-01 text-white">FAVORITES</a>
                <a className="text-headline-01 text-white">MY COLLECTIONS</a>
                <a className="text-headline-01 text-white">SETTINGS</a>
              </div>
              <div className="flex flex-col w-[140px] gap-3">
                <h5 className="text-headline-01 text-gray-light mb-2">COMPANY</h5>
                <a className="text-headline-01 text-white">ABOUT</a>
                <a className="text-headline-01 text-white">CAREERS</a>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container flex flex-col gap-y-10 lg:gap-y-0 lg:flex-row justify-between">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center justify-center">
          <img src={AssetLogo} />
          {/* <div className="flex flex-col items-center lg:flex-row gap-6">
            <h5 className="text-headline-01 text-gray-light">EXPLORE</h5>
            <h5 className="text-headline-01 text-gray-light">SELL</h5>
            <h5 className="text-headline-01 text-gray-light">CREATE</h5>
            <h5 className="text-headline-01 text-gray-light">SETTINGS</h5>
            <h5 className="text-headline-01 text-gray-light">PRROFILE</h5>
            <h5 className="text-headline-01 text-gray-light">TERMS</h5>
            <h5 className="text-headline-01 text-gray-light">SERVICES</h5>
          </div> */}
        </div>
        <div className="flex justify-center">
          <SocialMediaIcons />
        </div>
      </div>
    </div>
  );
};

export default Footer;
