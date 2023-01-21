import React, { useState, useEffect, useRef } from "react";

const AuctionCountdown = () => {
  const futureDate = new Date("2023-01-31");
  const [remaining, setRemaining] = useState(remainingTime(new Date(futureDate)));
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const previousMinutes = useRef(remaining.minutes);

  //being called every second but only rerenders when remaning minutes is changed
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

  //being called every 60 seconds and rerenders every call
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setRemaining(remainingTime(new Date(futureDate)));
  //     }, 60000);

  //     return () => clearInterval(intervalId);
  //   }, [futureDate]);

  function remainingTime(futureDate: Date): { days: string; hours: string; minutes: string } {
    const currentDate = new Date();
    const diff = futureDate.getTime() - currentDate.getTime();
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
