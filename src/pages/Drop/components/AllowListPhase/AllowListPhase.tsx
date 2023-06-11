/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

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
  if (!dropDetail?.allowListPhase.length) {
    return null;
  }
  const infinityBlock = dropDetail.blocks.find((block: any) => block.type === BLOCK_TYPE.Infinity);

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
        <div className="footer">{isAvailable ? <ButtonMint /> : <ButtonCalendar title={dropDetail.title} startDate={phase.startDate} endDate={phase.endDate} />}</div>
      </div>
    );
  });
};

export default AllowListPhase;
