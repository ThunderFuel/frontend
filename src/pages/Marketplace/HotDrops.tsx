import React from "react";
import { AssetHotdrop1Image } from "../../assets";
import { IconEthereum } from "../../icons";

const HotDrops = () => {
  return (
    <div className="container flex flex-col gap-5">
      <h3 className="font-spaceGrotesk text-white text-head3">Hot Drops</h3>
      <div className="flex gap-7">
        {[1, 2, 3, 4].map((item, k) => {
          return (
            <div key={k} className="border border-gray bg-bg-light text-white">
              <img src={AssetHotdrop1Image} alt={"hot-drop-1"} />
              <div className="flex flex-col gap-3 px-4 py-3">
                <h5 className="text-head5 font-spaceGrotesk">Presence by Tompop</h5>
                <div className="flex items-center gap-2.5">
                  <span className="text-headline-01 uppercase text-gray-light">floor:</span>
                  <h5 className="text-head5 font-spaceGrotesk flex items-center">
                    1.31
                    <IconEthereum className={"text-gray-light"} />
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotDrops;
