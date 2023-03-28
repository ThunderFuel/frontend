import React from "react";
import Label from "components/Label";
import InputCalendar from "components/InputCalendar";

const Schedule = () => {
  return (
    <div className="grid grid-cols-2 gap-10 text-white">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-h3">Drop Details</h3>
          <div className="body-medium text-gray-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        </div>
        <div className="flex flex-col gap-6">
          <Label helperText="Set pricing and options for your Public Sale.">Public Mint</Label>
          <div className="p-5 border border-gray rounded-md">
            <div className="">
              <Label>Mint Start Time*</Label>
              <InputCalendar />
            </div>
          </div>
        </div>
      </div>
      <div>2</div>
    </div>
  );
};

export default Schedule;
