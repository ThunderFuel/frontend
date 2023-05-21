import React from "react";
import Button from "components/Button";
import { IconCalendar } from "icons";
import { createEvent, DateArray } from "ics";

import "./AllowListPhase.css";
import dayjs from "dayjs";
import { countDownTimer } from "utils";

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

const AllowListPhase = () => {
  const startDate = 1687117656000;
  const onCreateCalendar = async () => {
    const filename = "ExampleEvent.ics";
    const file = await new Promise((resolve, reject) => {
      const startDate = dayjs()
        .format("YYYY-M-D-H-m")
        .split("-")
        .map((t) => Number(t)) as DateArray;

      const endDate = dayjs()
        .add(1, "days")
        .format("YYYY-M-D-H-m")
        .split("-")
        .map((t) => Number(t)) as DateArray;

      const event = {
        productId: "myCalendarId",
        uid: "123" + "@ics.com",
        title: "test here",
        start: startDate,
        end: endDate,
      };

      createEvent(event, (error, value) => {
        if (error) {
          reject(error);
        }

        resolve(new File([value], filename, { type: "plain/text" }));
      });
    });
    const url = URL.createObjectURL(file as File);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

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
          <Countdown startDate={startDate} />
        </div>
        <div>
          <div className="flex justify-between">
            <span className="text-headline-02">AVAILABLE</span>
            <span className="text-white">8.888</span>
          </div>
          <Process />
        </div>
      </div>
      <div className="footer">
        <Button className="w-full btn-primary" onClick={onCreateCalendar}>
          add to calendar <IconCalendar />
        </Button>
      </div>
    </div>
  );
};

export default AllowListPhase;
