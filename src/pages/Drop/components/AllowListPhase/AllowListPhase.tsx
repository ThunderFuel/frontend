/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import "./AllowListPhase.css";
import dayjs from "dayjs";
import { dateFormat, formatPrice } from "utils";
import { useDropDetailContext } from "../../Detail/DetailContext";
import { BLOCK_TYPE, FLUID_DROP_IDS, FLUID_WALLET_COUNT } from "api/drop/drop.service";
import clsx from "clsx";
import Process from "../Process";
import Countdown from "./components/Countdown";
import ButtonMint from "./components/ButtonMint";
import ButtonCalendar from "./components/ButtonCalendar";
import collectionsService, { ChecklistStatus } from "api/collections/collections.service";
import { useAppSelector } from "store";
import { getSerializeAddress, toggleWalletModal } from "store/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import DroppedItem from "./components/DroppedItem";

const RemainingTime = ({ startDate }: any) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-headline-02">MINTING STARTS IN</span>
      <Countdown startDate={startDate} />
    </div>
  );
};

const AllowListPhase = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector(getSerializeAddress);
  const { dropDetail } = useDropDetailContext();
  const { isConnected } = useAppSelector((state) => state.wallet);
  const [isMintingCompleted, setIsMintingCompleted] = useState(false);
  const [isMintable, setIsMintable] = useState(false);
  const [remainingDrops, setRemainingDrops] = useState(0);
  React.useEffect(() => {
    if (isConnected && dropDetail.contractAddress && walletAddress) {
      collectionsService
        .checkMintable({
          contractAddress: dropDetail.contractAddress,
          walletAddress: walletAddress,
        })
        .then(({ data }) => {
          setIsMintable(data.status === ChecklistStatus.Eligible);
          setRemainingDrops(data.remaining);
          setIsMintingCompleted(false);
        });
    }
  }, [isMintingCompleted, dropDetail.contractAddress, walletAddress]);

  const onToggleWallet = () => {
    dispatch(toggleWalletModal());
  };

  if (!dropDetail?.allowListPhase.length) {
    return null;
  }

  const infinityBlock = dropDetail.blocks.find((block: any) => block.type === BLOCK_TYPE.Infinity);
  const _image = infinityBlock.images[0];

  return dropDetail?.allowListPhase.map((phase: any, i: number) => {
    const startDate = phase.startDate * 1000;
    const endDate = phase.endDate * 1000;
    const phaseWalletCount = phase.walletCount;

    const isAvailable = dayjs().valueOf() > startDate;

    return (
      <div className="allowlist-phase" key={i}>
        <div className="header">
          <h5 className="text-h5">{phase.title ?? "Allowlist Phase"}</h5>
          <ul className={clsx("properties", !isAvailable && "text-opacity-50")}>
            <li className={clsx(isAvailable && "text-green")}>{isAvailable ? "Minting Live" : dateFormat(startDate, "DD MMM YYYY hh:ss A")}</li>
            <li>{phase.price > 0 ? `${formatPrice(phase.price)} ETH` : "Free"}</li>
            <li>{phaseWalletCount} Per Wallet</li>
          </ul>
        </div>
        <div className="body">
          {isAvailable && infinityBlock ? <DroppedItem images={infinityBlock.images} /> : <RemainingTime startDate={startDate} />}
          <Process available={phase.available} taken={phase.taken} />
        </div>
        <div className="footer">
          {isAvailable ? (
            isConnected ? (
              !isMintable ? (
                <div className="uppercase flex-center cursor-default text-button text-white text-opacity-25 w-full font-bigShoulderDisplay bg-white bg-opacity-25 rounded-[4px] py-[14px] px-[16px]">
                  you are not eligible!
                </div>
              ) : remainingDrops <= 0 ? (
                <div className="uppercase flex-center cursor-default text-button text-white text-opacity-25 w-full font-bigShoulderDisplay bg-white bg-opacity-25 rounded-[4px] py-[14px] px-[16px]">
                  MAX PER WALLET MINTED!
                </div>
              ) : (
                <ButtonMint remainingDrops={remainingDrops} mintImage={_image} mintContractAddress={dropDetail.contractAddress} onMintComplete={() => setIsMintingCompleted(true)} />
              )
            ) : (
              <Button onClick={onToggleWallet} className="w-full btn-primary">
                CONNECT WALLET <IconArrowRight className="w-[18px] h-[18px]" />
              </Button>
            )
          ) : (
            <ButtonCalendar title={dropDetail.title} startDate={startDate} endDate={endDate} />
          )}
        </div>
      </div>
    );
  });
};

export default AllowListPhase;
