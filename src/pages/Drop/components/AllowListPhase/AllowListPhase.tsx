import React from "react";
import { createEvent, DateArray } from "ics";

import "./AllowListPhase.css";
import dayjs from "dayjs";
import { countDownTimer, dateFormat, downloadFile, formatPrice, numberFormat, randomIntFromInterval } from "utils";
import { IconCalendar } from "../../../../icons";
import Button from "../../../../components/Button";
import { useDropDetailContext } from "../../Detail/DetailContext";

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

const Process = ({ available, taken }: any) => {
  const processWidth = React.useMemo(() => {
    return Math.floor((taken * 100) / available);
  }, [available, taken]);

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-headline-02 text-opacity-50">AVAILABLE</span>
        <h6 className="text-h6 text-white">
          {taken ? `${numberFormat(taken)} / ` : null}
          {numberFormat(available)}
        </h6>
      </div>
      <div className="process">
        <span className="transition-all min-w-[0.625rem]" style={{ width: `${processWidth}%` }} />
      </div>
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

const AllowListPhase = () => {
  const { dropDetail } = useDropDetailContext();
  if (!dropDetail?.allowListPhase.length) {
    return null;
  }
  const allowListPhase = dropDetail.allowListPhase?.[0];
  const isAvailable = dayjs().valueOf() > allowListPhase.startDate;

  return (
    <div className="allowlist-phase">
      <div className="header">
        <h5 className="text-h5">Allowlist Phase</h5>
        <ul className="properties">
          <li>{dateFormat(allowListPhase.startDate, "DD MMM YYYY hh:ss A")}</li>
          <li>{formatPrice(allowListPhase.price)} ETH</li>
          <li>{allowListPhase.walletCount} Per Wallet</li>
        </ul>
      </div>
      <div className="body">
        {isAvailable ? null : <RemainingTime startDate={allowListPhase.startDate} />}
        <Process available={allowListPhase.available} taken={allowListPhase.taken} />
      </div>
      <div className="footer">
        <ButtonCalendar />
      </div>
    </div>
  );
};

export default AllowListPhase;
