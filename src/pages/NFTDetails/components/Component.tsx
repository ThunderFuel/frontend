/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "components/Button";
import EthereumPrice from "components/EthereumPrice";
import { IconAddCart, IconCart, IconListed, IconOffer, IconThunder } from "icons";
import React, { useState } from "react";
import { useAppSelector } from "store";

const Component = () => {
  const { isOwner } = useAppSelector((state) => state.nftdetails);
  const [isListed, setisListed] = useState(true);
  const [hasOffer, sethasOffer] = useState(false);
  const [onAuction, setonAuction] = useState(false);

  return (
    <div className="flex flex-col border border-gray rounded-md bg-gray">
      <div className="flex justify-center items-center text-bodyMd text-white gap-x-2 py-[10px]">
        <IconListed className="w-[19px]" />
        Sale ends in 09d 02h 12m 22s
      </div>
      <div className="flex justify-between bg-bg-light mb-[1px] p-5">
        {isListed && (
          <>
            <div className="flex flex-col ">
              <span className="text-headlineMd font-bigShoulderDisplay text-gray-light">PRICE</span>
              <EthereumPrice priceClassName="text-h3 text-white" price={1} />
            </div>
            <div className="flex h-fit items-center gap-x-[5px]">
              <IconCart width="18px" color="#838383" />
              <span className="text-bodySm font-spaceGrotesk text-gray-light">Last sale price {0.99} ETH</span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-y-[10px] bg-bg-light rounded-b p-5">
        {!isOwner && isListed && (
          <>
            <div className="flex gap-x-[10px] ">
              <Button className="w-full text-button font-bigShoulderDisplay ">
                Buy Now <IconThunder width="24px" height="11.58px" />
              </Button>
              <Button>
                <IconAddCart fill="black" />
              </Button>
            </div>
            <Button className="btn-secondary no-bg ">
              MAKE OFFER <IconOffer />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Component;
