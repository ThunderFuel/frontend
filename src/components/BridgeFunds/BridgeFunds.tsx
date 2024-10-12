import React from "react";
import { FUEL_BRIDGE_URL } from "../../global-constants";
import { IconSwap } from "../../icons";
import clsx from "clsx";

const BridgeFunds = ({ className }: any) => {
  return (
    <a target="_blank" rel="noreferrer" href={FUEL_BRIDGE_URL} className={clsx("btn btn-primary w-full", className)}>
      <span className="text-nowrap">brıdge funds</span>
      <IconSwap />
    </a>
  );
};

export default BridgeFunds;
