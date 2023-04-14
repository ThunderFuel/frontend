import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./InputCalendar.css";
import { IconCalendar } from "icons";

const InputCalendar = (props: any) => {
  return (
    <div className={"input-container flex flex-row items-center gap-2 px-4 w-full lg:border lg:h-12 lg:rounded lg:border-gray"}>
      <DatePicker className="input peer" showTimeSelect timeIntervals={5} {...props} />
      <IconCalendar className="w-7 h-7 text-gray-light peer-focus:text-white" />
    </div>
  );
};

export default InputCalendar;
