import React from "react";
import Button from "components/Button";
import { IconThunder, IconDiscord, IconSocial3Dots, IconTwitter } from "../../../icons";

const Footer = () => {
  return (
    <div className=" flex flex-col bg-gray-dark lg:justify-center  bg-[#1a1a1a] w-full pt-10 pb-5">
      \
      <div className="border-b border-gray pb-10 mb-5">
        <div className="lg:container">
          <div className="lg:flex lg:items-start lg:justify-between">
            <div className="flex flex-col items-start lg:justify-center justify-start  text-white pl-5 lg:pl-10 ">
              <h4 className="text-head4 font-spaceGrotesk">Subscribe to our newsletter</h4>
              <span className="text-bodyMd font-spaceGrotesk flex max-w-[335px] lg:max-w-[440px] mt-2 mb-7">
                Newsworthy headlines from across the metaverse, delivered straight to your inbox every week.
              </span>
              <div className="flex bg-bg items-center lg:justify-between max-w-[335px] lg:max-w-[400px] w-full rounded-lg pl-5 pr-2.5 py-2.5">
                <input
                  className="text-gray-light h-[19px] text-bodyMd max-w-[192px] lg:max-w-[257px]"
                  type={"email"}
                  placeholder="E-mail Address"
                  style={{ background: "none", outline: "none" }}
                ></input>
                <Button className="text-headlineMd py-3 px-4">SUBSCRIBE</Button>
              </div>
            </div>
            <div className=" h-[1px] bg-gray my-[40px] lg:hidden"></div>
            <div className="flex flex-wrap  gap-x-[55px] lg:gap-x-[160px] gap-y-[28px] lg:pt-3 lg:flex-nowrap pl-5 lg:pl-10">
              <div className="flex flex-col w-[140px] gap-3">
                <h5 className="text-headlineSm text-gray-light font-bigShoulderDisplay mb-2">MARKETPLACE</h5>
                <a className="text-headlineSm text-white font-bigShoulderDisplay"> EXPLORE</a>
                <a className="text-headlineSm text-white font-bigShoulderDisplay"> SELL</a>
                <a className="text-headlineSm text-white font-bigShoulderDisplay"> CREATE</a>
              </div>
              <div className="flex flex-col w-[140px]  gap-3">
                <h5 className="text-headlineSm text-gray-light font-bigShoulderDisplay mb-2">MY ACCOUNT</h5>
                <a className="text-headlineSm text-white font-bigShoulderDisplay"> PROFILE</a>
                <a className="text-headlineSm text-white font-bigShoulderDisplay"> FAVORITES</a>
                <a className="text-headlineSm text-white font-bigShoulderDisplay"> MY COLLECTIONS</a>
                <a className="text-headlineSm text-white font-bigShoulderDisplay"> SETTINGS</a>
              </div>
              <div className="flex flex-col w-[140px]  gap-3">
                <h5 className="text-headlineSm text-gray-light font-bigShoulderDisplay mb-2">COMPANY</h5>
                <a className="text-headlineSm text-white font-bigShoulderDisplay"> ABOUT</a>
                <a className="text-headlineSm text-white font-bigShoulderDisplay"> CAREERS</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex justify-between ">
        <IconThunder />
        <div className="flex gap-2 mr-5 lg:mr-0">
          <IconDiscord className="text-gray-light" />
          <IconTwitter className="text-gray-light" />
          <IconSocial3Dots className="text-gray-light" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
