import React from "react";
import { AssetHotdrop1Image } from "assets";
import { useIsMobile } from "hooks/useIsMobile";
import EthereumPrice from "components/EthereumPrice";
import { chunk } from "../../utils";
import Carousel from "components/Carousel";

const HotDrops = () => {
  const chunkSize = useIsMobile() ? 1 : 4;
  const imagesList = chunk([1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4], chunkSize);

  return (
    <div className="container-fluid flex flex-col gap-5">
      <h3 className="text-white text-h3">Hot Drops</h3>
      <Carousel>
        {imagesList.map((images, k) => {
          return (
            <Carousel.Item key={k}>
              <div className="grid lg:grid-cols-4 gap-3">
                {images.map((image: any) => {
                  return (
                    <div key={`${k}_${image}`} className="border border-gray bg-bg-light text-white cursor-pointer">
                      <div className="overflow-hidden">
                        <img src={AssetHotdrop1Image} className="w-full transition-all ease-in duration-300 hover:scale-[120%]" alt={"hot-drop-1"} />
                      </div>
                      <div className="flex flex-col gap-3 px-4 py-3">
                        <h5 className="text-head5 font-spaceGrotesk">Presence by Tompop</h5>
                        <div className="flex items-center gap-2.5">
                          <span className="text-headline-01 uppercase text-gray-light">floor:</span>
                          <EthereumPrice price={1.31} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HotDrops;
