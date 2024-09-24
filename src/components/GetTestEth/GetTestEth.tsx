import React from "react";
import { FUEL_FAUCET_URL } from "../../global-constants";
import { IconFaucet } from "../../icons";
import clsx from "clsx";

const GetTestEth = ({ className, user, address }: any) => {
  const href = `${FUEL_FAUCET_URL}/?address=${user?.walletAddress ?? user?.contractAddress ?? address}&redirectUrl=https%3A%2F%2Fthundernft.market%2F`;

  return (
    <a target="_blank" rel="noreferrer" href={href} className={clsx("btn btn-primary w-full", className)}>
      <span className="text-nowrap">GET TEST ETH</span>
      <IconFaucet />
    </a>
  );
};

export default GetTestEth;
