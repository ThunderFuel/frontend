import React from "react";
import Label from "components/Label";
import InputCalendar from "components/InputCalendar";
import InputEthereum from "components/InputEthereum";
import ToggleButton from "components/ToggleButton";
import Preview from "./components/Preview";

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
          <div className="p-5 flex flex-col gap-6 border border-gray rounded-md">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <Label>Mint Start Time*</Label>
                <InputCalendar />
              </div>
              <div>
                <Label>Mint End Time</Label>
                <InputCalendar />
              </div>
            </div>
            <div>
              <Label>Price*</Label>
              <InputEthereum />
            </div>
            <div className="flex justify-between items-start">
              <Label helperText="Set a max limit per wallet can mint during this phase.">Add Max Limits Per Wallet</Label>
              <ToggleButton onToggle={console.log} />
            </div>
          </div>
        </div>
      </div>
      <Preview />
    </div>
  );
};

export default Schedule;
