import React from "react";
import { AssetPartnersCuriosityCapital, AssetPartnersFuel, AssetPartnersP2Ventures } from "assets";

const Partners = () => {
  return (
    <div className="flex flex-col gap-12 items-center mt-10 lg:mt-40">
      <div className="text-headline-01 uppercase text-white">backed by ındustry leaders</div>
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-32">
        <a href={"#"}>
          <img alt="fuel" src={AssetPartnersFuel} />
        </a>
        <a href={"#"}>
          <img alt="p2 ventures" src={AssetPartnersP2Ventures} />
        </a>
        <a href={"#"}>
          <img alt="curiosity capital" src={AssetPartnersCuriosityCapital} />
        </a>
      </div>
    </div>
  );
};

export default Partners;
