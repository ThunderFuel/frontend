import React from "react";
import { createEvent, DateArray } from "ics";

import "./AllowListPhase.css";
import dayjs from "dayjs";
import { countDownTimer, downloadFile, randomIntFromInterval } from "utils";
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

const Process = () => {
  return (
    <div className="process">
      <span className="" />
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
  console.log(dropDetail);
  if (!dropDetail?.allowListPhase.length) {
    return null;
  }
  const allowListPhase = dropDetail.allowListPhase?.[0];

  return (
    <div className="allowlist-phase">
      <div className="header">
        <h5 className="text-h5">Allowlist Phase</h5>
        <ul className="properties">
          <li>12 May 06:00 PM UTC</li>
          <li>0.08 ETH</li>
          <li>2 Per Wallet</li>
        </ul>
      </div>
      <div className="body">
        <div className="flex items-center justify-between">
          <span className="text-headline-02">MINTING STARTS IN</span>
          <Countdown startDate={allowListPhase.startDate} />
        </div>
        <div>
          <div className="flex justify-between">
            <span className="text-headline-02">AVAILABLE</span>
            <span className="text-white">{allowListPhase.available}</span>
          </div>
          <Process />
        </div>
      </div>
      <div className="footer">
        <ButtonCalendar />
      </div>
    </div>
  );
};

export default AllowListPhase;
