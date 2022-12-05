import React from "react";
import SocialMediaIcons from "./Header/SocialMediaIcons";
import Header from "./MarketplaceHeader";

const ethPrice = 1322.6;
const gasPrice = 39;

const LayoutLanding = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-bg min-h-screen flex flex-col">
      <div className="container flex py-2.5 items-center">
        <div className="w-full font-bigShoulderDisplay text-headlineSm uppercase text-gray-light">
          ETH: <span className="text-white before:content-['$'] mr-[18px]">{ethPrice}</span>
          GAS: <span className="text-white after:content-['\00a0GWEI']">{gasPrice}</span>
        </div>
        <SocialMediaIcons />
      </div>
      <Header />
      <div className="pt-16">{children}</div>
    </main>
  );
};

export default LayoutLanding;
