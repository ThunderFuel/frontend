/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Button from "components/Button";
import EthereumPrice from "components/EthereumPrice";
import { IconAddCart, IconCart, IconListed, IconOffer, IconThunder } from "icons";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { add } from "store/cartSlice";
import { setRightMenu } from "store/NFTDetailsSlice";
import { remainingTime } from "./AuctionCountdown";

const FixedPrice = () => {
  const dispatch = useDispatch();
  const { isOwner, selectedNFT } = useAppSelector((state) => state.nftdetails);
  const [isListed, setisListed] = useState(true);

  const futureDate = new Date("2023-01-31");
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [remaining, setRemaining] = useState(remainingTime(new Date(futureDate)));
  const previousMinutes = useRef(remaining.minutes);
  const { days, hours, minutes } = remainingTime(futureDate);

  useEffect(() => {
    function scheduleNext() {
      const newRemaining = remainingTime(new Date(futureDate));
      if (previousMinutes.current !== newRemaining.minutes) {
        setRemaining(newRemaining);
        previousMinutes.current = newRemaining.minutes;
      }
      timeoutId.current = setTimeout(scheduleNext, 1000);
    }
    scheduleNext();

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [futureDate]);

  return (
    <div className="flex flex-col border border-gray rounded-md bg-gray">
      <div className="flex justify-center items-center text-bodyMd text-white gap-x-2 py-[10px]">
        <IconListed className="w-[19px]" />
        Sale ends in {days}d {hours}h {minutes}m
      </div>
      <div className="flex justify-between bg-bg-light mb-[1px] p-5 last:rounded-b last:mb-0">
        {isListed && (
          <>
            <div className="flex flex-col">
              <span className="text-headlineMd font-bigShoulderDisplay text-gray-light">PRICE</span>
              <EthereumPrice priceClassName="text-h3 text-white" price={selectedNFT.price} />
            </div>
            <div className="flex h-fit items-center gap-x-[5px]">
              <IconCart width="18px" height="18px" color="#838383" />
              <span className="text-bodySm font-spaceGrotesk text-gray-light">Last sale price {0.99} ETH</span>
            </div>
          </>
        )}
      </div>
      {!isOwner && (
        <div className="flex flex-col gap-y-[10px] bg-bg-light rounded-b p-5">
          <div className="flex gap-x-[10px] ">
            <Button className="w-full text-button font-bigShoulderDisplay">
              Buy Now <IconThunder width="24px" height="11.58px" />
            </Button>
            <Button>
              <IconAddCart
                fill="black"
                onClick={() => {
                  dispatch(add(selectedNFT));
                }}
              />
            </Button>
          </div>
          <Button
            className="btn-secondary no-bg"
            onClick={() => {
              dispatch(setRightMenu("makeoffer"));
            }}
          >
            MAKE OFFER <IconOffer />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FixedPrice;
