/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import "./AllowListPhase.css";
import dayjs from "dayjs";
import { dateFormat, formatPrice } from "utils";
import { useDropDetailContext } from "../../Detail/DetailContext";
import { BLOCK_TYPE } from "api/drop/drop.service";
import clsx from "clsx";
import Process from "../Process";
import Gallery from "./components/Gallery";
import Countdown from "./components/Countdown";
import ButtonMint from "./components/ButtonMint";
import ButtonCalendar from "./components/ButtonCalendar";
import { useAppSelector } from "store";
import collectionsService from "api/collections/collections.service";
import Button from "components/Button/Button";

const RemainingTime = ({ startDate }: any) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-headline-02">MINTING STARTS IN</span>
      <Countdown startDate={startDate} />
    </div>
  );
};

const AllowListPhase = () => {
  const { dropDetail } = useDropDetailContext();
  const { isConnected, user } = useAppSelector((state) => state.wallet);
  const [isMintingCompleted, setIsMintingCompleted] = useState(false);
  const [isMintable, setIsMintable] = useState(false);
  React.useEffect(() => {
    if (isConnected)
      collectionsService.checkMintable({ contractAddress: "0x2a5b42c6e92ac8aad4ac0b9fbc582b3f291d66dbe983fc27f228bf2298ff9baa", walletAddress: user.walletAddress }).then((res: any) => {
        setIsMintable(res.data);
        setIsMintingCompleted(false);
      });
  }, [user, isMintingCompleted]);
  if (!dropDetail?.allowListPhase.length) {
    return null;
  }
  const infinityBlock = dropDetail.blocks.find((block: any) => block.type === BLOCK_TYPE.Infinity);
  const _image = infinityBlock.images[0];

  return dropDetail?.allowListPhase.map((phase: any, i: number) => {
    const isAvailable = dayjs().valueOf() > phase.startDate;

    return (
      <div className="allowlist-phase" key={i}>
        <div className="header">
          <h5 className="text-h5">{phase.title ?? "Allowlist Phase"}</h5>
          <ul className={clsx("properties", !isAvailable && "text-opacity-50")}>
            <li className={clsx(isAvailable && "text-green")}>{isAvailable ? "Minting Live" : dateFormat(phase.startDate, "DD MMM YYYY hh:ss A")}</li>
            <li>{phase.price > 0 ? `${formatPrice(phase.price)} ETH` : "Free"}</li>
            <li>{phase.walletCount} Per Wallet</li>
          </ul>
        </div>
        <div className="body">
          {isAvailable && infinityBlock ? <Gallery images={infinityBlock.images} /> : <RemainingTime startDate={phase.startDate} />}
          <Process available={phase.available} taken={phase.taken} />
        </div>
        <div className="footer">
          {isAvailable ? (
            !isMintable && isConnected ? (
              <div className="flex-center cursor-default text-button text-white text-opacity-25 w-full font-bigShoulderDisplay bg-white bg-opacity-25 rounded-[4px] py-[14px] px-[16px]">
                MAX PER WALLET MINTED!
              </div>
            ) : (
              <ButtonMint walletCount={phase.walletCount} mintImage={_image} onMintComplete={() => setIsMintingCompleted(true)} />
            )
          ) : (
            <ButtonCalendar title={dropDetail.title} startDate={phase.startDate} endDate={phase.endDate} />
          )}
        </div>
      </div>
    );
  });
};

export default AllowListPhase;
