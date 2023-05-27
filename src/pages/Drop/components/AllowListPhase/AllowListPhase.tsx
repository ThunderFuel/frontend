/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { createEvent, DateArray } from "ics";

import "./AllowListPhase.css";
import dayjs from "dayjs";
import { countDownTimer, dateFormat, downloadFile, formatPrice, randomIntFromInterval } from "utils";
import { IconCalendar, IconMinus, IconPlus, IconToken } from "icons";
import Button from "components/Button";
import { useDropDetailContext } from "../../Detail/DetailContext";
import Img from "components/Img/Img";
import Marquee from "react-fast-marquee";
import { BLOCK_TYPE } from "api/drop/drop.service";
import clsx from "clsx";
import { mint } from "thunder-sdk/src/contracts/erc721";
import { useAppSelector } from "store";
import { ERC721ContractId, provider } from "global-constants";
import collectionsService from "api/collections/collections.service";
import Process from "../Process";

const Countdown = ({ startDate }: any) => {
  const [timer, setTimer] = React.useReducer(
    (prevState: any, nextState: any) => {
      return { ...prevState, ...nextState };
    },
    { days: 0, hours: 0, minutes: 0, seconds: 0 }
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = countDownTimer(startDate);
      setTimer(remainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ul className="countdown">
      <li>
        {timer.days}
        <span>DAYS</span>
      </li>
      <li>
        {timer.hours}
        <span>HOURS</span>
      </li>
      <li>
        {timer.minutes}
        <span>MINS</span>
      </li>
      <li>
        {timer.seconds}
        <span>SECS</span>
      </li>
    </ul>
  );
};
const RemainingTime = ({ startDate }: any) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-headline-02">MINTING STARTS IN</span>
      <Countdown startDate={startDate} />
    </div>
  );
};

const ButtonCalendar = ({ title, startDate, endDate }: any) => {
  const calendarTimeFormat = (date: number) => {
    return dayjs(date)
      .format("YYYY-M-D-H-m")
      .split("-")
      .map((t) => Number(t)) as DateArray;
  };
  const onCreateCalendar = async () => {
    const filename = "ExampleEvent.ics";
    const file = await new Promise((resolve, reject) => {
      const calendarStart = calendarTimeFormat(startDate);
      const calendarEnd = calendarTimeFormat(endDate);

      const event = {
        productId: randomIntFromInterval().toString(),
        uid: randomIntFromInterval().toString(),
        title: title,
        start: calendarStart,
        end: calendarEnd,
      };

      createEvent(event, (error, value) => {
        if (error) {
          reject(error);
        }
        resolve(new File([value], filename, { type: "plain/text" }));
      });
    });
    downloadFile(file as File);
  };

  return (
    <Button className="w-full btn-primary" onClick={onCreateCalendar}>
      add to calendar <IconCalendar />
    </Button>
  );
};

const Gallery = ({ images }: any) => {
  return (
    <Marquee className="flex gap-5">
      <div className="flex gap-5">
        {images.map((item: any, k: number) => (
          <Img key={`${k}`} src={item} />
        ))}
      </div>
    </Marquee>
  );
};

const InputMint = ({ onChange }: any) => {
  const [value, setValue] = useState(1);
  const onUpdateValue = (number: number) => {
    const val = value + number;
    if (val < 1 || val > 5) {
      return false;
    }

    setValue(val);
    onChange(val);
  };

  return (
    <div className="flex items-center border border-white border-opacity-10 rounded-md">
      <h3 className="w-16 text-center text-h3 border-r border-r-white border-opacity-10 py-1">{value}</h3>
      <div className="flex flex-col items-center">
        <span className="cursor-pointer px-5 py-1 border-b border-b-white border-opacity-10" onClick={() => onUpdateValue(1)}>
          <IconPlus className={value === 5 ? "opacity-50" : ""} />
        </span>
        <span className="cursor-pointer px-5 py-1" onClick={() => onUpdateValue(-1)}>
          <IconMinus className={value === 1 ? "opacity-50" : ""} />
        </span>
      </div>
    </div>
  );
};

const ButtonMint = () => {
  const { user, wallet } = useAppSelector((state) => state.wallet);
  const [amount, setAmount] = useState(1);

  const tempContract = "0xbd82b3b28d1ac90e499ae9a22f0e2f9c5cb15167d4d24f167dfeab6bb84019cf";
  const tempWallet = "0x2dca5e3e7a1affb20d3001f758a1e3eb6e21dfd29ab3d328d4f5fbd2c7af69f1";
  const onClick = () => {
    // collectionsService.mint({ contractWalletAddress: "9191", count: amount, walletAddress: tempWallet }).then((res) => console.log(res));
    mint(ERC721ContractId, provider, wallet, amount, tempWallet)
      .then((res) => {
        console.log(res);
        if (res?.transactionResult.status.type === "success") {
          console.log("MINTED");
          /*TODO HANDLE SUCCESS*/
        }
      })
      .catch((e) => {
        console.log(e);
        /*TODO HANDLE ERROR*/
      });
  };

  const onChange = (e: any) => setAmount(e);

  return (
    <div className="flex gap-2">
      <InputMint onChange={onChange} />
      <Button className="w-full btn-primary" onClick={onClick}>
        Mint now <IconToken />
      </Button>
    </div>
  );
};

const AllowListPhase = () => {
  const { dropDetail } = useDropDetailContext();
  if (!dropDetail?.allowListPhase.length) {
    return null;
  }
  const allowListPhase = dropDetail.allowListPhase?.[0];
  const infinityBlock = dropDetail.blocks.find((block: any) => block.type === BLOCK_TYPE.Infinity);
  const isAvailable = dayjs().valueOf() > allowListPhase.startDate;

  return (
    <div className="allowlist-phase">
      <div className="header">
        <h5 className="text-h5">Allowlist Phase</h5>
        <ul className={clsx("properties", !isAvailable && "text-opacity-50")}>
          <li className={clsx(isAvailable && "text-green")}>{isAvailable ? "Minting Now" : dateFormat(allowListPhase.startDate, "DD MMM YYYY hh:ss A")}</li>
          <li>{formatPrice(allowListPhase.price)} ETH</li>
          <li>{allowListPhase.walletCount} Per Wallet</li>
        </ul>
      </div>
      <div className="body">
        {isAvailable ? <Gallery images={infinityBlock.images} /> : <RemainingTime startDate={allowListPhase.startDate} />}
        <Process available={allowListPhase.available} taken={allowListPhase.taken} />
      </div>
      <div className="footer">{isAvailable ? <ButtonMint /> : <ButtonCalendar />}</div>
    </div>
  );
};

export default AllowListPhase;
