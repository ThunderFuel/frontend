import React from "react";
import Button from "components/Button";

import "./AllowListPhase.css";
import { IconCalendar } from "icons";

const Countdown = () => {
  return (
    <ul className="countdown">
      <li>
        09
        <span>DAYS</span>
      </li>
      <li>
        02
        <span>HOURS</span>
      </li>
      <li>
        09
        <span>MINS</span>
      </li>
      <li>
        09
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
          <Countdown />
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
        <Button className="w-full btn-primary">
          add to calendar <IconCalendar />
        </Button>
      </div>
    </div>
  );
};

export default AllowListPhase;
