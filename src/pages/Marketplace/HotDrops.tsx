import React from "react";
import { AssetHotdrop1Image } from "assets";
import { IconEthereum } from "icons";
import { useIsMobile } from "hooks/useIsMobile";

const HotDrops = () => {
  const images = useIsMobile() ? [1] : [1, 2, 3, 4];

  return (
    <div className="container-fluid flex flex-col gap-5">
      <h3 className="text-white text-h3">Hot Drops</h3>
      <div className="flex flex-col lg:flex-row gap-3">
        {images.map((item, k) => {
          return (
            <div key={k} className="overflow-hidden border border-gray bg-bg-light text-white">
              <div className="overflow-hidden">
                <img src={AssetHotdrop1Image} className="w-full transition-all ease-in duration-300 hover:scale-[120%]" alt={"hot-drop-1"} />
              </div>
              <div className="flex flex-col gap-3 px-4 py-3">
                <h5 className="text-head5 font-spaceGrotesk">Presence by Tompop</h5>
                <div className="flex items-center gap-2.5">
                  <span className="text-headline-01 uppercase text-gray-light">floor:</span>
                  <h5 className="text-h5 flex items-center">
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
