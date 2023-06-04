import React from "react";
import { countDownTimer } from "utils";

import "./Countdown.css";

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

export default Countdown;
