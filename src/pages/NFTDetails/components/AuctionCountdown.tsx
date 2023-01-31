import React, { useState, useEffect, useRef } from "react";

export function remainingTime(expireTime: any): { days: string; hours: string; minutes: string } {
  if (expireTime === null) return { days: "0", hours: "0", minutes: "0" };
  const expireDate = new Date(expireTime);
  const currentDate = new Date();
  const diff = expireDate.getTime() - currentDate.getTime();
  const remainingTime = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0"),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0"),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0"),
  };

  return remainingTime;
}

const AuctionCountdown = ({ expireTime }: { expireTime: any }) => {
  const [remaining, setRemaining] = useState(remainingTime(expireTime));
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const previousMinutes = useRef(remaining.minutes);

  //being called every second but only rerenders when remaning minutes is changed
  useEffect(() => {
    function scheduleNext() {
      const newRemaining = remainingTime(new Date(expireTime));
      if (previousMinutes.current !== newRemaining.minutes) {
        setRemaining(newRemaining);
        previousMinutes.current = newRemaining.minutes;
      }
      timeoutId.current = setTimeout(scheduleNext, 1000);
    }
    if (expireTime === null) return;
    else scheduleNext();

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [expireTime]);

  //being called every 60 seconds and rerenders every call
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setRemaining(remainingTime(new Date(expireTime)));
  //     }, 60000);

  //     return () => clearInterval(intervalId);
  //   }, [expireTime]);

  const CountdownItem = ({ value, text }: { text: string; value: string }) => (
    <div className="flex flex-col justify-center items-center w-[45px] py-[5px] gap-y-[6px] text-head4 font-spaceGrotesk text-white bg-gray rounded">
      {value}
      <h4 className="text-headlineSm font-bigShoulderDisplay text-gray-light">{text}</h4>
    </div>
  );

  return (
    <div className="flex gap-x-[5px]">
      <CountdownItem text="DAYS" value={remaining.days} />
      <div className="text-head3 text-white font-spaceGrotesk">:</div>
      <CountdownItem text="HOURS" value={remaining.hours} />
      <div className="text-head3 text-white font-spaceGrotesk">:</div>
      <CountdownItem text="MINS" value={remaining.minutes} />
    </div>
  );
};

export default AuctionCountdown;
